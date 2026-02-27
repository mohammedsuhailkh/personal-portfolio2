// import React, { useState } from 'react';
// import { projects } from '../Constants/constants';
// import SectionTitle from './SectionTitle';


// const ProjectCards = () => {
//   const [hoveredProject, setHoveredProject] = useState(null);
//   const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });

//   const handleMouseEnter = (project) => {
//     setHoveredProject(project);
//     const img = new Image();
//     img.src = project.image;
//     img.onload = () => {
//       setVideoDimensions({ width: img.width, height: img.height });
//     };
//   };

//   const handleMouseLeave = () => {
//     setHoveredProject(null);
//     setVideoDimensions({ width: 0, height: 0 });
//   };

//   const fixedVideoHeight = 320; 

//   return (
//     <div className="container mx-auto py-15 text-white "  id='projects'>
//        <SectionTitle title="PROJECTS I WORKED ON" subtitle="What I have done so far" />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         {projects.map((project) => (
//           <div
//             key={project.id}
//             className="bg-white p-6 rounded-lg shadow-lg bg-white text-black relative" 
//             onMouseEnter={() => handleMouseEnter(project)}
//             onMouseLeave={handleMouseLeave}
//           >
//             <h3 className="tcolor text-lg font-semibold mb-2">{project.name}</h3>
//             <div className="aspect-w-12 aspect-h-9">
//               <img
//                 src={project.image}
//                 alt={project.name}
//                 className="object-cover rounded-lg w-full h-40 md:h-56 lg:h-64"
//               />
//               {hoveredProject === project && (
//                 <video
//                   className="object-cover rounded-lg absolute top-0 left-0"
//                   style={{
//                     width: `${videoDimensions.width}px`,
//                     height: `${fixedVideoHeight}px`,
//                     objectFit: 'cover',
//                   }}
//                   autoPlay
//                   loop
//                   controls
                  
//                 >
//                   <source src={project.video_link} type="video/mp4" />
//                   Your browser does not support the video format
//                 </video>
//               )}
//             </div>
//             <div className="mt-2 h-25">
//               <p className="text-sm text-white tcolor">{project.description}</p>
//             </div>
//             <div className="mt-4 mb-4 flex justify-center gap-3">
//               <button className="tcolor border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white focus:outline-none focus:ring focus:border-blue-300">
//                 <a
//                   href={project.demo_link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="tcolor text-blue-500 text-sm inline-block"
//                 >
//                   See Demo
//                 </a>
//               </button>
//               <button className="tcolor border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-400 hover:text-white focus:outline-none focus:ring focus:border-gray-300">
//                 <a
//                   href={project.source_code_link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="tcolor text-white text-sm inline-block" 
//                 >
//                   Source Code
//                 </a>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectCards;


import React, { useState, useRef, useEffect } from 'react';
import { projects } from '../Constants/constants';
import SectionTitle from './SectionTitle';

const ProjectCards = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [tilt, setTilt] = useState({});
  const videoRef = useRef(null);

  const handleTilt = (e, id) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt(prev => ({ ...prev, [id]: { rotateX, rotateY } }));
  };

  const handleTiltReset = (id) => {
    setTilt(prev => ({ ...prev, [id]: { rotateX: 0, rotateY: 0 } }));
  };

  useEffect(() => {
    if (selectedProject && videoRef.current) {
      videoRef.current.play();
    }
  }, [selectedProject]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const t = (id) => tilt[id] || { rotateX: 0, rotateY: 0 };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;1,9..40,300&display=swap');

        .pc-section {
          font-family: 'DM Sans', sans-serif;
          padding: 80px 0;
          position: relative;
        }

        .pc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 28px;
          margin-top: 48px;
          perspective: 1200px;
        }

        .pc-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.15s ease, box-shadow 0.3s ease;
          background: linear-gradient(145deg, #1a1a2e, #16213e);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            0 10px 40px rgba(0,0,0,0.4),
            0 1px 0 rgba(255,255,255,0.06) inset;
          will-change: transform;
        }

        .pc-card:hover {
          box-shadow:
            0 24px 60px rgba(0,0,0,0.6),
            0 0 40px rgba(99,102,241,0.15),
            0 1px 0 rgba(255,255,255,0.1) inset;
        }

        .pc-card-inner {
          transform-style: preserve-3d;
          position: relative;
        }

        .pc-img-wrap {
          position: relative;
          overflow: hidden;
          height: 220px;
        }

        .pc-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease, filter 0.3s ease;
        }

        .pc-card:hover .pc-img-wrap img {
          transform: scale(1.05);
          filter: brightness(0.7);
        }

        .pc-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,12,41,0.9) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pc-card:hover .pc-img-overlay {
          opacity: 1;
        }

        .pc-play-btn {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: rgba(99,102,241,0.9);
          border: 2px solid rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(0.8);
          transition: transform 0.3s ease;
          backdrop-filter: blur(4px);
        }

        .pc-card:hover .pc-play-btn {
          transform: scale(1);
        }

        .pc-card-body {
          padding: 18px 20px 20px;
          transform: translateZ(20px);
        }

        .pc-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.01em;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pc-title-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #6366f1;
          flex-shrink: 0;
          box-shadow: 0 0 8px #6366f1;
        }

        .pc-tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
        }

        .pc-tag {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid rgba(99,102,241,0.4);
          color: rgba(165,163,255,0.9);
          background: rgba(99,102,241,0.08);
        }

        .pc-click-hint {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.3);
          margin-top: 10px;
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* ── MODAL ── */

        .pc-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0,0,0,0);
          backdrop-filter: blur(0px);
          animation: pcBackdropIn 0.35s ease forwards;
        }

        @keyframes pcBackdropIn {
          to {
            background: rgba(0,0,0,0.75);
            backdrop-filter: blur(12px);
          }
        }

        .pc-modal {
          position: relative;
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 24px;
          background: linear-gradient(160deg, #0f0c29, #1a1a3e, #24243e);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow:
            0 40px 100px rgba(0,0,0,0.7),
            0 0 0 1px rgba(99,102,241,0.2),
            0 0 80px rgba(99,102,241,0.08);
          transform: scale(0.85) translateY(30px);
          opacity: 0;
          animation: pcModalIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s forwards;
          scrollbar-width: thin;
          scrollbar-color: rgba(99,102,241,0.3) transparent;
        }

        @keyframes pcModalIn {
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        .pc-modal-video-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          background: #000;
          border-radius: 24px 24px 0 0;
          overflow: hidden;
        }

        .pc-modal-video-wrap video,
        .pc-modal-video-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .pc-modal-video-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(to top, #1a1a3e, transparent);
          pointer-events: none;
        }

        .pc-modal-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(0,0,0,0.5);
          color: #fff;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s, transform 0.2s;
          backdrop-filter: blur(4px);
        }

        .pc-modal-close:hover {
          background: rgba(239,68,68,0.7);
          transform: scale(1.1) rotate(90deg);
        }

        .pc-modal-body {
          padding: 28px 32px 32px;
        }

        .pc-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
        }

        .pc-modal-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.7rem;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .pc-modal-title span {
          background: linear-gradient(90deg, #a5b4fc, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pc-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(99,102,241,0.5), transparent);
          margin: 20px 0;
        }

        .pc-modal-desc-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #6366f1;
          margin-bottom: 10px;
        }

        .pc-modal-desc {
          font-size: 0.97rem;
          line-height: 1.75;
          color: rgba(210,210,230,0.85);
          font-weight: 300;
        }

        .pc-modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 28px;
          flex-wrap: wrap;
        }

        .pc-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          border: none;
        }

        .pc-btn:hover {
          transform: translateY(-2px);
        }

        .pc-btn-primary {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: #fff;
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
        }

        .pc-btn-primary:hover {
          box-shadow: 0 8px 30px rgba(99,102,241,0.5);
        }

        .pc-btn-secondary {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.8);
          border: 1px solid rgba(255,255,255,0.12);
        }

        .pc-btn-secondary:hover {
          background: rgba(255,255,255,0.1);
        }

        @media (max-width: 600px) {
          .pc-modal-body { padding: 20px; }
          .pc-modal-title { font-size: 1.3rem; }
        }
      `}</style>

      <div className="container mx-auto pc-section" id="projects">
        <SectionTitle title="PROJECTS I WORKED ON" subtitle="What I have done so far" />

        <div className="pc-grid">
          {projects.map((project) => {
            const { rotateX, rotateY } = t(project.id);
            return (
              <div
                key={project.id}
                className="pc-card"
                style={{
                  transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                }}
                onMouseMove={(e) => handleTilt(e, project.id)}
                onMouseLeave={() => handleTiltReset(project.id)}
                onClick={() => setSelectedProject(project)}
              >
                <div className="pc-card-inner">
                  <div className="pc-img-wrap">
                    <img src={project.image} alt={project.name} />
                    <div className="pc-img-overlay">
                      <div className="pc-play-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="pc-card-body">
                    <div className="pc-title">
                      <span className="pc-title-dot" />
                      {project.name}
                    </div>
                    {/* <div className="pc-tag-row">
                      {(project.tags || ['React', 'Node.js']).map((tag, i) => (
                        <span key={i} className="pc-tag">{tag}</span>
                      ))}
                    </div> */}
                    <div className="pc-click-hint">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                      </svg>
                      Click to explore
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <div
          className="pc-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedProject(null);
          }}
        >
          <div className="pc-modal">
            {/* Video / Image */}
            <div className="pc-modal-video-wrap">
              {selectedProject.video_link ? (
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  controls
                  playsInline
                >
                  <source src={selectedProject.video_link} type="video/mp4" />
                  <img src={selectedProject.image} alt={selectedProject.name} />
                </video>
              ) : (
                <img src={selectedProject.image} alt={selectedProject.name} />
              )}
              <div className="pc-modal-video-gradient" />
              <button
                className="pc-modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="pc-modal-body">
              <div className="pc-modal-header">
                <h2 className="pc-modal-title">
                  <span>{selectedProject.name}</span>
                </h2>
              </div>

              {/* <div className="pc-tag-row" style={{ marginBottom: 0 }}>
                {(selectedProject.tags || ['React', 'Node.js']).map((tag, i) => (
                  <span key={i} className="pc-tag">{tag}</span>
                ))}
              </div> */}

              <div className="pc-divider" />

              <div className="pc-modal-desc-label">About this project</div>
              <p className="pc-modal-desc">{selectedProject.description}</p>

              <div className="pc-modal-actions">
                <a
                  href={selectedProject.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pc-btn pc-btn-primary"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Live Demo
                </a>
                <a
                  href={selectedProject.source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pc-btn pc-btn-secondary"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                  </svg>
                  Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCards;