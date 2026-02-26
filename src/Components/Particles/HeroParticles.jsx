/**
 * HeroParticles.jsx  — v3
 *
 * Changes from v2:
 *  - 30-second countdown drawn on canvas (top-centre)
 *  - Shooting is blocked once time hits 0
 *  - Game-over score screen fades in on canvas
 *  - Dispatches 'heroTimeUp' immediately at 0s
 *  - Keeps TIME'S UP card for 5s, then fades it out
 *  - Dispatches 'heroGameEnd' only after fade-out so identity text appears later
 */

import { useEffect, useRef, useCallback, useState } from "react";

// ──────────────────────────────────────────────────────────────
//  GUN CONFIG
// ──────────────────────────────────────────────────────────────
const GUNS = [
  { id:"pistol",  name:"GLOCK-17",  mode:"SEMI-AUTO",   key:"1",
    maxAmmo:15, cd:280,  pellets:1, spread:0,   spd:17,  pr:5,   exR:38,
    col:"#f59e0b", glow:"#fbbf24", barrelL:32, barrelW:7 },
  { id:"shotgun", name:"MOSSBERG",  mode:"PUMP-ACTION", key:"2",
    maxAmmo:6,  cd:880,  pellets:8, spread:.30, spd:13,  pr:4,   exR:75,
    col:"#ef4444", glow:"#f87171", barrelL:26, barrelW:15 },
  { id:"smg",     name:"MP5-K",     mode:"FULL-AUTO",   key:"3",
    maxAmmo:35, cd:72,   pellets:1, spread:.07, spd:19,  pr:3.5, exR:24,
    col:"#22d3ee", glow:"#67e8f9", barrelL:40, barrelW:8 },
  { id:"sniper",  name:"AWP-338",   mode:"BOLT-ACTION", key:"4",
    maxAmmo:5,  cd:1500, pellets:1, spread:0,   spd:999, pr:3,   exR:100,
    col:"#a855f7", glow:"#c084fc", barrelL:60, barrelW:6, hitscan:true },
  { id:"rocket",  name:"RPG-7",     mode:"ROCKET",      key:"5",
    maxAmmo:3,  cd:2000, pellets:1, spread:0,   spd:6.5, pr:11,  exR:160,
    col:"#f97316", glow:"#fb923c", barrelL:52, barrelW:18, isRocket:true },
];

const TECH = [
  {label:"HTML5",     abbr:"</>", col:"#E34F26",glow:"#ff6b35"},
  {label:"CSS3",      abbr:"{ }", col:"#1572B6",glow:"#38bdf8"},
  {label:"JS",        abbr:"JS",  col:"#F7DF1E",glow:"#fde047"},
  {label:"React",     abbr:"React",  col:"#61DAFB",glow:"#7dd3fc"},
  {label:"Unity",     abbr:"Unity",  col:"#ffffff", glow:"#e2e8f0"},
  {label:"C#",        abbr:"C#",  col:"#9B59B6",glow:"#c084fc"},
  {label:"Three.js",  abbr:"3JS", col:"#049EF4",glow:"#38bdf8"},
  {label:"Git",       abbr:"Git", col:"#F05032",glow:"#fb923c"},
  {label:"Node.js",   abbr:"Node",col:"#339933",glow:"#4ade80"},
  {label:"WebGL",     abbr:"GL",  col:"#cc0000",glow:"#f87171"},
  {label:"AR/VR",     abbr:"ARVR",col:"#00D4FF",glow:"#67e8f9"},
  {label:"TypeScript",abbr:"TS",  col:"#3178C6",glow:"#60a5fa"},
  {label:"Python",    abbr:"Py",  col:"#3776AB",glow:"#60a5fa"},
  {label:"Docker",    abbr:"Dock",col:"#2496ED",glow:"#38bdf8"},
  {label:"GraphQL",   abbr:"GQL", col:"#E10098",glow:"#f472b6"},
  {label:"Rust",      abbr:"Rust",col:"#CE422B",glow:"#fb923c"},
];

const GAME_DURATION = 30; // seconds
const GAME_OVER_HOLD_MS = 5000;
const GAME_OVER_FADE_MS = 1200;

// ──────────────────────────────────────────────────────────────
//  UTILS
// ──────────────────────────────────────────────────────────────
const rand  = (a, b) => Math.random() * (b - a) + a;
const lerp  = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const limit = (vx, vy, max) => {
  const m = Math.sqrt(vx*vx + vy*vy);
  return m > max ? [vx/m*max, vy/m*max] : [vx, vy];
};
const setMag = (vx, vy, m) => {
  const l = Math.sqrt(vx*vx + vy*vy) || 1;
  return [vx/l*m, vy/l*m];
};

// ──────────────────────────────────────────────────────────────
//  BOIDS
// ──────────────────────────────────────────────────────────────
const SEP_R=75, ALI_R=140, COH_R=190;
const SEP_W=1.9, ALI_W=1.0, COH_W=0.7, WAN_W=0.55, MAX_F=0.12;

function mkIcon(W, H, i) {
  const d=TECH[i%TECH.length], a=rand(0,Math.PI*2), spd=rand(1.0,2.2);
  return { ...d, x:rand(80,W-80), y:rand(80,H-140),
    vx:Math.cos(a)*spd, vy:Math.sin(a)*spd,
    rot:rand(0,Math.PI*2), size:rand(24,38),
    op:0, dead:false, deadTimer:0,
    wanderAngle:rand(0,Math.PI*2), maxSpd:rand(1.0,2.4),
    trail:[], bankAngle:0 };
}
function mkBullet(x, y, angle, gun) {
  const a=angle+rand(-gun.spread*.5,gun.spread*.5);
  return { x, y, vx:Math.cos(a)*gun.spd, vy:Math.sin(a)*gun.spd,
    r:gun.pr, alive:true, trail:[], gunId:gun.id,
    col:gun.col, glow:gun.glow, isRocket:!!gun.isRocket };
}
function mkExplosion(x, y, gun) {
  const count=gun.id==="rocket"?55:gun.id==="sniper"?40:gun.id==="shotgun"?35:22;
  const pts=Array.from({length:count},()=>{
    const a=rand(0,Math.PI*2),sp=rand(2,gun.id==="rocket"?13:8);
    return{x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,r:rand(2,gun.id==="rocket"?9:6),a:1,col:gun.glow,d:rand(.018,.04)};
  });
  const rings=[{r:0,maxR:gun.exR,a:.9,col:gun.glow}];
  if(gun.id==="rocket"||gun.id==="sniper")rings.push({r:0,maxR:gun.exR*.55,a:.7,col:"#ffffff55"});
  return{x,y,pts,rings,gunId:gun.id};
}

function boidsUpdate(ic, all, W, H) {
  if(ic.dead)return;
  let sx=0,sy=0,sc=0,ax=0,ay=0,ac=0,cohX=0,cohY=0,cc=0;
  for(const o of all){
    if(o===ic||o.dead)continue;
    const dx=ic.x-o.x,dy=ic.y-o.y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<SEP_R&&d>0){sx+=dx/d/d;sy+=dy/d/d;sc++;}
    if(d<ALI_R){ax+=o.vx;ay+=o.vy;ac++;}
    if(d<COH_R){cohX+=o.x;cohY+=o.y;cc++;}
  }
  let [fsx,fsy]=[0,0],[fax,fay]=[0,0],[fcx,fcy]=[0,0];
  if(sc>0)[fsx,fsy]=limit(sx/sc,sy/sc,MAX_F);
  if(ac>0){const[dx,dy]=setMag(ax/ac,ay/ac,ic.maxSpd);[fax,fay]=limit(dx-ic.vx,dy-ic.vy,MAX_F);}
  if(cc>0)[fcx,fcy]=limit(cohX/cc-ic.x,cohY/cc-ic.y,MAX_F);
  ic.wanderAngle+=rand(-0.12,0.12);
  const fwx=Math.cos(ic.wanderAngle)*WAN_W*MAX_F,fwy=Math.sin(ic.wanderAngle)*WAN_W*MAX_F;
  const EDGE=90;let fbx=0,fby=0;
  if(ic.x<EDGE)fbx=MAX_F*(EDGE-ic.x)/EDGE*2;
  if(ic.x>W-EDGE)fbx=-MAX_F*(ic.x-(W-EDGE))/EDGE*2;
  if(ic.y<EDGE)fby=MAX_F*(EDGE-ic.y)/EDGE*2;
  if(ic.y>H-EDGE)fby=-MAX_F*(ic.y-(H-EDGE))/EDGE*2;
  ic.vx+=fsx*SEP_W+fax*ALI_W+fcx*COH_W+fwx+fbx;
  ic.vy+=fsy*SEP_W+fay*ALI_W+fcy*COH_W+fwy+fby;
  [ic.vx,ic.vy]=limit(ic.vx,ic.vy,ic.maxSpd);
  const spd=Math.sqrt(ic.vx*ic.vx+ic.vy*ic.vy);
  if(spd<0.6){const[nx,ny]=setMag(ic.vx,ic.vy,0.8);ic.vx=nx;ic.vy=ny;}
  ic.bankAngle=lerp(ic.bankAngle,Math.atan2(ic.vy,ic.vx),0.08);
  ic.rot=ic.bankAngle;
  ic.trail.push({x:ic.x,y:ic.y});
  if(ic.trail.length>14)ic.trail.shift();
  ic.x+=ic.vx;ic.y+=ic.vy;
}

// ──────────────────────────────────────────────────────────────
//  DRAW HELPERS
// ──────────────────────────────────────────────────────────────
function drawIcon(ctx, ic) {
  if(ic.dead)return;
  for(let i=1;i<ic.trail.length;i++){
    const t=i/ic.trail.length;
    ctx.beginPath();ctx.moveTo(ic.trail[i-1].x,ic.trail[i-1].y);ctx.lineTo(ic.trail[i].x,ic.trail[i].y);
    ctx.strokeStyle=ic.glow;ctx.lineWidth=ic.size*0.18*t;ctx.globalAlpha=t*0.12*ic.op;ctx.stroke();
  }
  ctx.globalAlpha=1;
  ctx.save();ctx.translate(ic.x,ic.y);ctx.rotate(ic.rot);ctx.globalAlpha=ic.op;
  ctx.shadowColor=ic.glow;ctx.shadowBlur=14;
  const s=ic.size;
  ctx.beginPath();
  for(let i=0;i<6;i++){const a=(Math.PI/3)*i-Math.PI/6;i===0?ctx.moveTo(Math.cos(a)*s,Math.sin(a)*s):ctx.lineTo(Math.cos(a)*s,Math.sin(a)*s);}
  ctx.closePath();ctx.fillStyle="rgba(5,10,20,0.85)";ctx.fill();
  ctx.strokeStyle=ic.col;ctx.lineWidth=1.6;ctx.stroke();
  const spd=Math.sqrt(ic.vx*ic.vx+ic.vy*ic.vy);
  if(spd>1.5){ctx.strokeStyle=ic.col;ctx.lineWidth=1;ctx.globalAlpha=ic.op*0.35;for(const sign of[-1,1]){ctx.beginPath();ctx.moveTo(-s*.4,sign*s*.5);ctx.lineTo(-s*1.3,sign*s*.5);ctx.stroke();ctx.beginPath();ctx.moveTo(-s*.3,sign*s*.7);ctx.lineTo(-s*.9,sign*s*.7);ctx.stroke();}ctx.globalAlpha=ic.op;}
  ctx.shadowBlur=0;ctx.fillStyle=ic.col;
  ctx.font=`bold ${Math.round(s*.45)}px 'Share Tech Mono',monospace`;
  ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(ic.abbr,0,0);
  ctx.font=`${Math.round(s*.18)}px 'Share Tech Mono',monospace`;ctx.fillStyle=ic.col+"99";
  ctx.fillText(ic.label,0,s*0.72);
  ctx.restore();ctx.globalAlpha=1;
}

function drawCannon(ctx, cx, cy, angle, si) {
  const g=GUNS[si];
  ctx.save();ctx.translate(cx,cy);ctx.shadowColor=g.glow;ctx.shadowBlur=28;
  ctx.beginPath();ctx.arc(0,0,28,0,Math.PI*2);
  const bg=ctx.createRadialGradient(0,0,4,0,0,28);bg.addColorStop(0,g.col+"22");bg.addColorStop(1,"rgba(0,0,0,0)");
  ctx.fillStyle=bg;ctx.fill();ctx.strokeStyle=g.col+"66";ctx.lineWidth=1.5;ctx.stroke();
  ctx.beginPath();ctx.arc(0,0,32,0,Math.PI*2);ctx.strokeStyle=g.col+"22";ctx.lineWidth=1;ctx.stroke();
  ctx.rotate(angle);
  const bl=g.barrelL,bw=g.barrelW;
  if(g.id==="shotgun"){for(const oy of[-bw*.25,bw*.25]){const gr=ctx.createLinearGradient(0,oy-bw*.2,0,oy+bw*.2);gr.addColorStop(0,g.col+"cc");gr.addColorStop(1,g.col+"44");ctx.fillStyle=gr;ctx.beginPath();ctx.roundRect(0,oy-bw*.22,bl,bw*.44,3);ctx.fill();ctx.strokeStyle=g.col;ctx.lineWidth=.9;ctx.stroke();}}
  else if(g.isRocket){const gr=ctx.createLinearGradient(0,-bw/2,0,bw/2);gr.addColorStop(0,g.col+"bb");gr.addColorStop(1,g.col+"33");ctx.fillStyle=gr;ctx.beginPath();ctx.roundRect(0,-bw/2,bl,bw,5);ctx.fill();ctx.strokeStyle=g.col;ctx.lineWidth=1.2;ctx.stroke();ctx.fillStyle=g.col;ctx.beginPath();ctx.moveTo(bl,-bw*.4);ctx.lineTo(bl+bw*.7,0);ctx.lineTo(bl,bw*.4);ctx.closePath();ctx.fill();}
  else if(g.hitscan){const gr=ctx.createLinearGradient(0,-bw/2,0,bw/2);gr.addColorStop(0,g.col+"cc");gr.addColorStop(1,g.col+"44");ctx.fillStyle=gr;ctx.beginPath();ctx.roundRect(0,-bw/2,bl,bw,2);ctx.fill();ctx.strokeStyle=g.col;ctx.lineWidth=1;ctx.stroke();ctx.strokeStyle=g.col+"99";ctx.fillStyle="rgba(0,0,0,0.5)";ctx.beginPath();ctx.roundRect(bl*.35,-bw*1.1,bl*.25,bw*2.2,2);ctx.fill();ctx.stroke();}
  else{const gr=ctx.createLinearGradient(0,-bw/2,0,bw/2);gr.addColorStop(0,g.col+"cc");gr.addColorStop(1,g.col+"44");ctx.fillStyle=gr;ctx.beginPath();ctx.roundRect(0,-bw/2,bl,bw,4);ctx.fill();ctx.strokeStyle=g.col;ctx.lineWidth=1.2;ctx.stroke();if(g.id==="smg"){for(let i=1;i<4;i++){ctx.strokeStyle=g.col+"55";ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(bl*(.2+i*.15),-bw*.5);ctx.lineTo(bl*(.2+i*.15),bw*.5);ctx.stroke();}}}
  ctx.beginPath();ctx.arc(bl,0,bw*.6,0,Math.PI*2);ctx.strokeStyle=g.glow;ctx.lineWidth=1.5;ctx.stroke();
  ctx.restore();
}

function drawBullet(ctx, p) {
  for(let i=0;i<p.trail.length;i++){const t=i/p.trail.length;ctx.beginPath();ctx.arc(p.trail[i].x,p.trail[i].y,p.r*t*.6,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${t*.2})`;ctx.fill();}
  ctx.shadowColor=p.glow;ctx.shadowBlur=18;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
  const pg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);pg.addColorStop(0,"#fff");pg.addColorStop(.5,p.col);pg.addColorStop(1,"rgba(0,0,0,0)");ctx.fillStyle=pg;ctx.fill();ctx.shadowBlur=0;
}
function drawRocket(ctx, p) {
  ctx.save();ctx.translate(p.x,p.y);ctx.rotate(Math.atan2(p.vy,p.vx));ctx.shadowColor=p.glow;ctx.shadowBlur=20;
  ctx.fillStyle=p.col;ctx.beginPath();ctx.roundRect(-14,-4,22,8,3);ctx.fill();
  ctx.fillStyle="#fff";ctx.beginPath();ctx.moveTo(8,-4);ctx.lineTo(16,0);ctx.lineTo(8,4);ctx.closePath();ctx.fill();
  for(let i=0;i<8;i++){const t=i/8;ctx.globalAlpha=(1-t)*.6;ctx.fillStyle=p.col;ctx.beginPath();ctx.arc(-14-rand(0,20),rand(-5,5),3*(1-t),0,Math.PI*2);ctx.fill();}
  ctx.globalAlpha=1;
  for(let i=0;i<p.trail.length;i++){const t=i/p.trail.length;ctx.globalAlpha=t*.18;ctx.fillStyle="#888";ctx.beginPath();ctx.arc(p.trail[i].x,p.trail[i].y,p.r*.8*t,0,Math.PI*2);ctx.fill();}
  ctx.globalAlpha=1;ctx.restore();
}
function drawBeam(ctx, b) {
  const age=b.age/b.maxAge;ctx.save();ctx.globalAlpha=(1-age)*.75;ctx.shadowColor=b.col;ctx.shadowBlur=25;
  ctx.strokeStyle=b.col;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(b.x1,b.y1);ctx.lineTo(b.x2,b.y2);ctx.stroke();
  ctx.strokeStyle="#fff";ctx.lineWidth=.8;ctx.stroke();ctx.restore();
}
function drawExplosion(ctx, e) {
  for(const ring of e.rings){if(ring.a<=0)continue;ctx.beginPath();ctx.arc(e.x,e.y,ring.r,0,Math.PI*2);ctx.strokeStyle=ring.col;ctx.lineWidth=3*ring.a;ctx.globalAlpha=ring.a*.65;ctx.stroke();ctx.globalAlpha=1;}
  for(const p of e.pts){if(p.a<=0)continue;ctx.globalAlpha=p.a;ctx.shadowColor=p.col;ctx.shadowBlur=7;ctx.beginPath();ctx.arc(p.x,p.y,p.r*p.a,0,Math.PI*2);ctx.fillStyle=p.col;ctx.fill();}
  ctx.globalAlpha=1;ctx.shadowBlur=0;
}

// ──────────────────────────────────────────────────────────────
//  DRAW: COUNTDOWN TIMER
// ──────────────────────────────────────────────────────────────
function drawTimer(ctx, W, timeLeft, pulse) {
  const secs   = Math.ceil(timeLeft);
  const urgent = secs <= 8;
  const warn   = secs <= 15;
  const col    = urgent ? "#ef4444" : warn ? "#facc15" : "#00ffc8";
  const glow   = urgent ? "#ff000088" : warn ? "#facc1566" : "#00ffc844";
  const scale  = urgent ? 1 + Math.sin(pulse * 0.18) * 0.09 : 1;

  ctx.save();
  ctx.translate(W/2, 52);
  ctx.scale(scale, scale);

  // Pill background
  const pw=120, ph=44;
  ctx.fillStyle="rgba(4,8,16,0.75)";
  ctx.strokeStyle=col+"55"; ctx.lineWidth=1.5;
  ctx.shadowColor=glow; ctx.shadowBlur=urgent?30:14;
  ctx.beginPath(); ctx.roundRect(-pw/2,-ph/2,pw,ph,ph/2); ctx.fill(); ctx.stroke();

  // Circular arc progress
  const R=17, pct=timeLeft/GAME_DURATION;
  // Track
  ctx.beginPath(); ctx.arc(0,0,R,0,Math.PI*2);
  ctx.strokeStyle=col+"22"; ctx.lineWidth=3.5; ctx.shadowBlur=0; ctx.stroke();
  // Fill
  ctx.beginPath(); ctx.arc(0,0,R,-Math.PI/2,-Math.PI/2+pct*Math.PI*2);
  ctx.strokeStyle=col; ctx.lineWidth=3.5; ctx.shadowBlur=12; ctx.stroke();

  // Number
  ctx.shadowBlur=urgent?18:8; ctx.shadowColor=col;
  ctx.fillStyle=col; ctx.font=`bold 19px 'Share Tech Mono',monospace`;
  ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillText(secs,0,0);

  // "SEC" label to the right
  ctx.shadowBlur=0; ctx.font=`9px 'Share Tech Mono',monospace`;
  ctx.fillStyle=col+"77"; ctx.fillText("SEC",40,0);

  // Urgent blinking "!!!" text
  if(urgent && Math.floor(pulse/8)%2===0){
    ctx.fillStyle="#ef4444";ctx.font=`bold 9px 'Share Tech Mono',monospace`;
    ctx.fillText("!!!",- 40,0);
  }

  ctx.restore();
}

// ──────────────────────────────────────────────────────────────
//  DRAW: GAME OVER SCREEN
// ──────────────────────────────────────────────────────────────
function drawGameOver(ctx, W, H, kills, shots, hits, alpha) {
  ctx.save();
  ctx.globalAlpha=alpha;

  // Dark vignette
  const vg=ctx.createRadialGradient(W/2,H/2,H*.08,W/2,H/2,H*.72);
  vg.addColorStop(0,"rgba(0,0,0,0)");vg.addColorStop(1,"rgba(0,0,0,0.75)");
  ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);

  // Centre card
  const cw=330,ch=200,cx=W/2,cy=H/2;
  ctx.shadowColor="#ef4444";ctx.shadowBlur=30;
  ctx.fillStyle="rgba(4,8,16,0.92)";ctx.strokeStyle="rgba(239,68,68,0.55)";ctx.lineWidth=1.5;
  ctx.beginPath();ctx.roundRect(cx-cw/2,cy-ch/2,cw,ch,10);ctx.fill();ctx.stroke();

  // Title
  ctx.shadowColor="#ef4444";ctx.shadowBlur=22;ctx.fillStyle="#ef4444";
  ctx.font="bold 30px 'Share Tech Mono',monospace";ctx.textAlign="center";ctx.textBaseline="middle";
  ctx.fillText("TIME'S UP!",cx,cy-65);

  // Divider
  ctx.shadowBlur=0;ctx.strokeStyle="rgba(239,68,68,0.2)";ctx.lineWidth=1;
  ctx.beginPath();ctx.moveTo(cx-130,cy-42);ctx.lineTo(cx+130,cy-42);ctx.stroke();

  // Stats
  const acc=shots>0?Math.round(hits/shots*100):0;
  const rows=[["ICONS DESTROYED",kills],["SHOTS FIRED",shots],["ACCURACY",acc+"%"]];
  rows.forEach(([label,val],i)=>{
    const ry=cy-14+i*38;
    ctx.font="10px 'Share Tech Mono',monospace";ctx.fillStyle="rgba(255,255,255,0.38)";
    ctx.textAlign="left";ctx.fillText(label,cx-128,ry);
    ctx.fillStyle="#00ffc8";ctx.font="bold 15px 'Share Tech Mono',monospace";
    ctx.textAlign="right";ctx.fillText(val,cx+128,ry);
  });

  // Footer
  ctx.shadowBlur=0;ctx.font="10px 'Share Tech Mono',monospace";
  ctx.fillStyle="rgba(0,255,200,0.3)";ctx.textAlign="center";
  ctx.fillText("// unlocking identity...",cx,cy+82);

  ctx.globalAlpha=1;ctx.restore();
}

// ──────────────────────────────────────────────────────────────
//  ARSENAL UI
// ──────────────────────────────────────────────────────────────
function GunCard({ gun, index, isSelected, ammo, onSelect, disabled }) {
  const dots=Math.min(gun.maxAmmo,15);
  return (
    <div onClick={()=>!disabled&&onSelect(index)} style={{
      position:"relative",padding:"9px 10px",marginBottom:5,
      border:`1px solid ${isSelected?gun.col+"88":"rgba(255,255,255,0.06)"}`,
      borderRadius:2,cursor:disabled?"default":"pointer",overflow:"hidden",
      background:isSelected?"rgba(0,0,0,0.55)":"transparent",
      opacity:disabled?.4:1,transition:"all .15s",
    }}>
      {isSelected&&!disabled&&<div style={{position:"absolute",left:0,top:0,bottom:0,width:2,background:gun.col,boxShadow:`0 0 8px ${gun.col}`}}/>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
        <span style={{fontSize:11,fontWeight:700,color:"#fff",letterSpacing:".06em",fontFamily:"'Share Tech Mono',monospace"}}>{gun.name}</span>
        <span style={{fontSize:9,color:isSelected?gun.col:"rgba(255,255,255,0.3)",border:`1px solid ${isSelected?gun.col:"rgba(255,255,255,0.12)"}`,padding:"1px 4px",borderRadius:2,fontFamily:"'Share Tech Mono',monospace"}}>[{gun.key}]</span>
      </div>
      <div style={{fontSize:9,color:isSelected?"rgba(255,255,255,0.5)":"rgba(255,255,255,0.25)",marginBottom:6,letterSpacing:".08em",fontFamily:"'Share Tech Mono',monospace"}}>{gun.mode}</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
        {Array.from({length:dots},(_,d)=>(
          <div key={d} style={{width:6,height:6,borderRadius:1,background:d<ammo?gun.col:"rgba(255,255,255,0.08)",boxShadow:d<ammo?`0 0 4px ${gun.col}`:"none",transition:"all .1s"}}/>
        ))}
        {gun.maxAmmo>15&&<span style={{fontSize:9,color:gun.col,marginLeft:3,fontFamily:"'Share Tech Mono',monospace"}}>{ammo}/{gun.maxAmmo}</span>}
      </div>
    </div>
  );
}

function ArsenalPanel({ selectedGun, gunAmmo, onSelectGun, onReload, kills, shots, hits, reloading, gameEnded, timeLeft }) {
  const urgent=timeLeft<=8&&!gameEnded;
  const frame={padding:"12px 11px",background:"rgba(4,8,16,0.88)",border:"1px solid rgba(0,255,180,0.15)",clipPath:"polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",backdropFilter:"blur(12px)"};
  return (
    <div style={{position:"absolute",top:"50%",right:20,transform:"translateY(-50%)",width:190,zIndex:20,display:"flex",flexDirection:"column",gap:8,fontFamily:"'Share Tech Mono',monospace",opacity:gameEnded?0:1,transition:"opacity .9s",pointerEvents:gameEnded?"none":"auto"}}>
      <div style={frame}>
        <div style={{fontSize:10,fontWeight:700,color:"rgba(0,255,180,0.65)",letterSpacing:".25em",marginBottom:10,paddingBottom:8,borderBottom:"1px solid rgba(0,255,180,0.1)",fontFamily:"'Orbitron',sans-serif",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span>ARSENAL</span>
          {!gameEnded&&(
            <span style={{fontSize:13,fontWeight:700,letterSpacing:".05em",color:urgent?"#ef4444":timeLeft<=15?"#facc15":"#00ffc8",textShadow:urgent?"0 0 12px #ef4444":"none"}}>{Math.ceil(timeLeft)}s</span>
          )}
        </div>
        {GUNS.map((gun,i)=>(
          <GunCard key={gun.id} gun={gun} index={i} isSelected={i===selectedGun} ammo={gunAmmo[i]} onSelect={onSelectGun} disabled={gameEnded}/>
        ))}
      </div>
      {!gameEnded&&(
        <div onClick={onReload} style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"8px",gap:8,fontSize:11,color:reloading?"rgba(255,140,0,0.8)":"rgba(0,255,180,0.6)",letterSpacing:".15em",border:`1px solid ${reloading?"rgba(255,140,0,0.3)":"rgba(0,255,180,0.15)"}`,borderRadius:2,cursor:"pointer",background:reloading?"rgba(255,140,0,0.05)":"rgba(0,255,180,0.02)"}}>
          [ R ]&nbsp;&nbsp;{reloading?"RELOADING…":"RELOAD"}
        </div>
      )}
      <div style={{...frame,padding:"9px 11px"}}>
        {[["DESTROYED",kills],["ACCURACY",shots>0?Math.round(hits/shots*100)+"%":"—"],["SHOTS",shots]].map(([label,val])=>(
          <div key={label} style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"rgba(255,255,255,0.3)",padding:"2px 0"}}>
            <span>{label}</span><span style={{color:"#00ffc8"}}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
//  MAIN
// ──────────────────────────────────────────────────────────────
const HeroParticles = () => {
  const canvasRef   = useRef(null);
  const stateRef    = useRef({
    icons:[], projs:[], exps:[], beams:[],
    mouseX:0, mouseY:0, cannonAngle:-Math.PI/2,
    shake:{x:0,y:0,t:0,str:0}, lastShot:0,
    startTime: Date.now(),
    gameEnded: false, overlayAlpha:0, pulseT:0,
    gameOverAt: 0, revealSent: false,
    animFrame:null,
  });

  const [selectedGun,setSelectedGun]=useState(0);
  const [gunAmmo,setGunAmmo]=useState(GUNS.map(g=>g.maxAmmo));
  const [kills,setKills]=useState(0);
  const [shots,setShots]=useState(0);
  const [hits,setHits]=useState(0);
  const [reloading,setReloading]=useState(false);
  const [hitFlash,setHitFlash]=useState(0);
  const [gameEnded,setGameEnded]=useState(false);
  const [timeLeft,setTimeLeft]=useState(GAME_DURATION);

  const selectedGunRef=useRef(0);
  const gunAmmoRef=useRef(GUNS.map(g=>g.maxAmmo));
  const reloadingRef=useRef(false);
  const killsRef=useRef(0);
  const shotsRef=useRef(0);
  const hitsRef=useRef(0);

  const syncSelectedGun=(i)=>{selectedGunRef.current=i;setSelectedGun(i);};
  const syncGunAmmo=(arr)=>{gunAmmoRef.current=[...arr];setGunAmmo([...arr]);};

  const hitIcon=useCallback((ic,gun)=>{
    ic.dead=true;ic.deadTimer=110+Math.floor(rand(0,90));
    stateRef.current.exps.push(mkExplosion(ic.x,ic.y,gun));
    killsRef.current++;hitsRef.current++;setKills(killsRef.current);setHits(hitsRef.current);
    const s=stateRef.current.shake;
    s.t=Math.max(s.t,gun.id==="rocket"?18:gun.id==="sniper"?14:6);
    s.str=Math.max(s.str,gun.id==="rocket"?9:gun.id==="sniper"?7:3);
    setHitFlash(gun.id==="rocket"?.25:gun.id==="sniper"?.15:.07);
    setTimeout(()=>setHitFlash(0),80);
  },[]);

  const shoot=useCallback(()=>{
    if(stateRef.current.gameEnded)return;
    if(reloadingRef.current)return;
    const g=GUNS[selectedGunRef.current];
    const s=stateRef.current;
    const now=Date.now();
    if(now-s.lastShot<g.cd)return;
    const ammo=gunAmmoRef.current;
    if(ammo[selectedGunRef.current]<=0)return;
    s.lastShot=now;
    const canvas=canvasRef.current;if(!canvas)return;
    const W=canvas.width,H=canvas.height,cx=W/2,cy=H-22;
    const newAmmo=[...ammo];newAmmo[selectedGunRef.current]--;syncGunAmmo(newAmmo);
    shotsRef.current++;setShots(shotsRef.current);
    const ox=cx+Math.cos(s.cannonAngle)*g.barrelL;
    const oy=cy+Math.sin(s.cannonAngle)*g.barrelL;
    if(g.hitscan){
      s.beams.push({x1:ox,y1:oy,x2:s.mouseX,y2:s.mouseY,col:g.col,age:0,maxAge:22});
      for(const ic of s.icons){
        if(ic.dead)continue;
        const dx=ic.x-ox,dy=ic.y-oy;
        const len=Math.sqrt((s.mouseX-ox)**2+(s.mouseY-oy)**2)||1;
        const t=clamp((dx*(s.mouseX-ox)+dy*(s.mouseY-oy))/(len*len),0,1);
        const dist=Math.sqrt((ic.x-(ox+t*(s.mouseX-ox)))**2+(ic.y-(oy+t*(s.mouseY-oy)))**2);
        if(dist<ic.size+g.pr)hitIcon(ic,g);
      }
      s.shake.t=14;s.shake.str=7;
    } else {
      for(let p=0;p<g.pellets;p++)s.projs.push(mkBullet(ox,oy,s.cannonAngle,g));
      s.shake.t=g.isRocket?4:2;s.shake.str=g.isRocket?4:1.5;
    }
    s.exps.push({x:ox,y:oy,pts:Array.from({length:8},()=>{const a=rand(0,Math.PI*2),sp=rand(1,4);return{x:ox,y:oy,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,r:rand(1,3),a:1,col:g.glow,d:.18};}),rings:[{r:0,maxR:18,a:.8,col:g.glow}],gunId:"muzzle"});
  },[hitIcon]);

  const startReload=useCallback(()=>{
    if(stateRef.current.gameEnded)return;
    if(reloadingRef.current)return;
    const gi=selectedGunRef.current;
    if(gunAmmoRef.current[gi]===GUNS[gi].maxAmmo)return;
    reloadingRef.current=true;setReloading(true);
    const ms=GUNS[gi].id==="sniper"?2200:GUNS[gi].id==="rocket"?2800:1200;
    setTimeout(()=>{const a=[...gunAmmoRef.current];a[gi]=GUNS[gi].maxAmmo;syncGunAmmo(a);reloadingRef.current=false;setReloading(false);},ms);
  },[]);

  useEffect(()=>{
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");
    const s=stateRef.current;

    const resize=()=>{
      canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight;
      if(!s.icons.length)s.icons=Array.from({length:22},(_,i)=>mkIcon(canvas.width,canvas.height,i));
    };
    resize();window.addEventListener("resize",resize);

    const onMove=e=>{const r=canvas.getBoundingClientRect();s.mouseX=e.clientX-r.left;s.mouseY=e.clientY-r.top;};
    canvas.addEventListener("mousemove",onMove);
    canvas.addEventListener("click",shoot);

    let smgInt=null;
    const onDown=()=>{if(GUNS[selectedGunRef.current].id==="smg"&&!s.gameEnded)smgInt=setInterval(shoot,GUNS[selectedGunRef.current].cd);};
    const onUp=()=>{clearInterval(smgInt);smgInt=null;};
    canvas.addEventListener("mousedown",onDown);window.addEventListener("mouseup",onUp);

    const onKey=e=>{
      if(s.gameEnded)return;
      if(e.code==="Space"){e.preventDefault();shoot();return;}
      if(e.key==="r"||e.key==="R"){startReload();return;}
      const idx=["1","2","3","4","5"].indexOf(e.key);
      if(idx>=0)syncSelectedGun(idx);
    };
    window.addEventListener("keydown",onKey);

    const loop=()=>{
      const W=canvas.width,H=canvas.height,cx=W/2,cy=H-22;
      ctx.clearRect(0,0,W,H);
      ctx.save();

      // — Timer —
      const tLeft=Math.max(0,GAME_DURATION-(Date.now()-s.startTime)/1000);
      setTimeLeft(tLeft);
      s.pulseT++;

      if(tLeft<=0&&!s.gameEnded){
        s.gameEnded=true;setGameEnded(true);
        s.gameOverAt=Date.now();
        s.overlayAlpha=1;
        window.dispatchEvent(new CustomEvent("heroTimeUp",{detail:{score:killsRef.current}}));
      }
      if(s.gameEnded){
        const elapsed=Date.now()-s.gameOverAt;
        if(elapsed<=GAME_OVER_HOLD_MS){
          s.overlayAlpha=1;
        }else if(elapsed<=GAME_OVER_HOLD_MS+GAME_OVER_FADE_MS){
          const fadeProgress=(elapsed-GAME_OVER_HOLD_MS)/GAME_OVER_FADE_MS;
          s.overlayAlpha=Math.max(0,1-fadeProgress);
        }else{
          s.overlayAlpha=0;
          if(!s.revealSent){
            s.revealSent=true;
            window.dispatchEvent(new CustomEvent("heroGameEnd",{detail:{score:killsRef.current}}));
          }
        }
      }

      // — Shake —
      if(s.shake.t>0){s.shake.t--;s.shake.x=rand(-s.shake.str,s.shake.str)*(s.shake.t/12);s.shake.y=rand(-s.shake.str,s.shake.str)*(s.shake.t/12);}
      else{s.shake.x=lerp(s.shake.x,0,.35);s.shake.y=lerp(s.shake.y,0,.35);}
      ctx.translate(s.shake.x,s.shake.y);

      s.cannonAngle=lerp(s.cannonAngle,Math.atan2(s.mouseY-cy,s.mouseX-cx),.1);

      // Aim line
      if(!s.gameEnded){ctx.save();ctx.strokeStyle="rgba(255,255,255,0.07)";ctx.lineWidth=1;ctx.setLineDash([3,7]);ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(s.mouseX,s.mouseY);ctx.stroke();ctx.setLineDash([]);ctx.restore();}

      // Icons
      for(const ic of s.icons){
        if(ic.dead){ic.deadTimer--;if(ic.deadTimer<=0)Object.assign(ic,mkIcon(W,H,s.icons.indexOf(ic)),{op:0});continue;}
        ic.op=Math.min(ic.op+.015,.9);
        boidsUpdate(ic,s.icons,W,H);
        drawIcon(ctx,ic);
      }

      // Projectiles
      for(const p of s.projs){
        if(!p.alive)continue;
        p.trail.push({x:p.x,y:p.y});
        if(p.trail.length>(p.isRocket?18:10))p.trail.shift();
        p.x+=p.vx;p.y+=p.vy;
        p.isRocket?drawRocket(ctx,p):drawBullet(ctx,p);
        if(p.x<-30||p.x>W+30||p.y<-30||p.y>H+30){p.alive=false;continue;}
        const g=GUNS.find(g=>g.id===p.gunId)||GUNS[0];
        for(const ic of s.icons){
          if(ic.dead)continue;
          const dx=p.x-ic.x,dy=p.y-ic.y;
          if(Math.sqrt(dx*dx+dy*dy)<ic.size+p.r){
            p.alive=false;
            if(p.isRocket){for(const ic2 of s.icons){if(ic2.dead)continue;const dx2=p.x-ic2.x,dy2=p.y-ic2.y;if(Math.sqrt(dx2*dx2+dy2*dy2)<g.exR*.6)hitIcon(ic2,g);}}
            else hitIcon(ic,g);
            break;
          }
        }
      }
      s.projs=s.projs.filter(p=>p.alive);

      // Beams
      for(const b of s.beams){drawBeam(ctx,b);b.age++;}
      s.beams=s.beams.filter(b=>b.age<b.maxAge);

      // Explosions
      for(const e of s.exps){
        drawExplosion(ctx,e);
        for(const r of e.rings){r.r+=e.gunId==="rocket"?5.5:3.5;r.a=Math.max(0,r.a-.03);}
        for(const p of e.pts){p.x+=p.vx;p.y+=p.vy;p.vy+=.12;p.vx*=.97;p.a=Math.max(0,p.a-p.d);p.r*=.98;}
      }
      s.exps=s.exps.filter(e=>e.rings.some(r=>r.a>0)||e.pts.some(p=>p.a>0));

      // Cannon
      if(!s.gameEnded)drawCannon(ctx,cx,cy,s.cannonAngle,selectedGunRef.current);

      // Crosshair
      if(!s.gameEnded){
        const cg=GUNS[selectedGunRef.current];
        ctx.save();ctx.strokeStyle=cg.col;ctx.lineWidth=1;ctx.globalAlpha=.5;
        ctx.shadowColor=cg.glow;ctx.shadowBlur=8;const cs=10;
        ctx.beginPath();ctx.moveTo(s.mouseX-cs,s.mouseY);ctx.lineTo(s.mouseX+cs,s.mouseY);ctx.moveTo(s.mouseX,s.mouseY-cs);ctx.lineTo(s.mouseX,s.mouseY+cs);ctx.stroke();
        ctx.beginPath();ctx.arc(s.mouseX,s.mouseY,cs*.9,0,Math.PI*2);ctx.globalAlpha=.2;ctx.stroke();
        ctx.restore();
      }

      // Timer HUD
      if(!s.gameEnded)drawTimer(ctx,W,tLeft,s.pulseT);

      // Game-over overlay
      if(s.gameEnded&&s.overlayAlpha>0)drawGameOver(ctx,W,H,killsRef.current,shotsRef.current,hitsRef.current,s.overlayAlpha);

      ctx.restore();
      s.animFrame=requestAnimationFrame(loop);
    };

    s.animFrame=requestAnimationFrame(loop);
    return()=>{
      cancelAnimationFrame(s.animFrame);
      canvas.removeEventListener("mousemove",onMove);
      canvas.removeEventListener("click",shoot);
      canvas.removeEventListener("mousedown",onDown);
      window.removeEventListener("mouseup",onUp);
      window.removeEventListener("keydown",onKey);
      window.removeEventListener("resize",resize);
      clearInterval(smgInt);
    };
  },[shoot,startReload,hitIcon]);

  return (
    <>
      {/* Hit flash */}
      <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:50,
        opacity:hitFlash,background:"radial-gradient(ellipse at center,rgba(255,255,255,0.08) 0%,transparent 70%)",
        transition:"opacity .06s"}}/>

      {/* Canvas */}
      <canvas ref={canvasRef}
        style={{position:"absolute",inset:0,width:"100%",height:"100%",
          cursor:gameEnded?"default":"crosshair",display:"block",background:"transparent"}}
        aria-hidden="true"/>

      {/* Arsenal panel */}
      <ArsenalPanel selectedGun={selectedGun} gunAmmo={gunAmmo}
        onSelectGun={syncSelectedGun} onReload={startReload}
        kills={kills} shots={shots} hits={hits}
        reloading={reloading} gameEnded={gameEnded} timeLeft={timeLeft}/>
    </>
  );
};

export default HeroParticles;
