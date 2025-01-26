export const heroOptions = {
  autoPlay: true,
  fullScreen: {
    enable: false,
    zIndex: 0,
  },
  detectRetina: true,
  fpsLimit: 60,
  interactivity: {
    detectsOn: '#hero',
    events: {
      onDiv: [
        {
          selectors: '#repulse-div',
          enable: true,
          mode: 'bubble',
          type: 'circle',
        },
      ],
      onHover: {
        enable: true,
        mode: 'attract',
        parallax: {
          enable: true,
          force: 1800,
          smooth: 20,
        },
      },
      resize: {
        delay: 1.5,
        enable: true,
      },
    },
    modes: {
      bubble: {
        distance: 100,
        duration: 2,
        size: 15,
        color: {
          value: '#fff', // Change the color to white
        },
        opacity: 0.7,
        mix: true,
      },
      attract: {
        distance: 300,
        duration: 1,
        speed: 4,
      },
    },
  },
  particles: {
    collisions: {
      enable: true,
      mode: 'bounce',
    },
    color: {
      value: '#fff', // Change the color to white
    },
    move: {
      angle: {
        offset: 0,
        value: 90,
      },
      center: {
        x: 50,
        y: 50,
        mode: 'percent',
        radius: 0,
      },
      direction: 'none',
      enable: true,
      random: false,
      size: true,
      speed: 2,
      outMode: 'out',
    },
    number: {
      limit: 0,
      value: 50,
    },
    opacity: {
      random: {
        enable: true,
        minimumValue: 0.4,
        maxValue: 0.8,
      },
      value: 0.8,
      animation: {
        count: 0,
        enable: true,
        speed: 0.3,
        decay: 0,
        sync: true,
        destroy: 'none',
        startValue: 'random',
      },
    },
    size: {
      random: {
        enable: true,
        minimumValue: 5,
        maxValue: 20,
      },
      animation: {
        count: 10,
        enable: true,
        speed: 0.5,
        decay: 0,
        sync: true,
        destroy: 'none',
        startValue: 'random',
      },
    },
    lineLinked: {
      blink: false,
      color: {
        value: '#fff', // Change the color to white
      },
      consent: true,
      distance: 150,
      enable: true,
      frequency: 10,
      opacity: 0.6,
      width: 2,
    },
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  smooth: true,
};
