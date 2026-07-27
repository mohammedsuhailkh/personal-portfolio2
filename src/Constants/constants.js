

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faX,
  faBars,
  faWindowRestore,
  faBagShopping,
  faDiceD6,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {
  faReact,
  faGithub,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

import {
  htmlIcon,
  cssIcon,
  jsIcon,
  reactIcon,
  gitIcon,
  githubIcon,

  pyIcon,
  viteIcon,
  nodeIcon,

  figmaIcon,
  pboost,
  InvoiceGenerator,
  monster,
  mario,
  summariser,
  avatar,
  FirebaseIcon,
  burpsuiteIcon,
  designer,
  runner,
  aargon,
  towerbash,
  dumbledash,
  downtown,
  os,
  farming_camp,
  mirthIsland
} from '../assets';

library.add(faX, faBars, faWindowRestore, faBagShopping, faDiceD6);

const media = {
  htmlIcon,
  cssIcon,
  jsIcon,
  reactIcon,
  gitIcon,
  githubIcon,
  pyIcon,
  viteIcon,
  nodeIcon,
  figmaIcon,
  avatar,
};

const icons = {
  faBars,
  faX,
  faWindowRestore,
  faBagShopping,
  faDiceD6,
  faReact,
  faGithub,
  faLinkedin,
  faEnvelope,
};

const introduction = {
  text: [
    "Hey there, welcome to my corner of the internet! (:",

    "I'm Suhail — an experienced Unity developer specializing in cross-platform game development and porting across PS5, Xbox, Nintendo Switch, and PC. I've shipped multiple commercial titles, handling everything from platform-specific optimizations and save systems to full gameplay implementation.",
    "Beyond game development, I have a solid foundation in backend engineering and modern web frameworks. I work with Node.js, React, and Firebase to build full-stack applications, and I'm comfortable architecting REST APIs, managing cloud infrastructure, and deploying scalable web services.",
    "My passion lies in building polished, high-performance experiences — whether that's a game running at 60fps on console hardware or a sleek web app with a seamless user experience."

  ],
};

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'projects',
    title: 'Projects',
  },
  {
    id: 'skills',
    title: 'Skills',
  },
  // {
  //   id: 'contact',
  //   title: 'Contact',
  // },
];

const projects = [
{
  name: "Farming Camp (PS5 / MS / XBOX)",
  description: "Farming Camp is a farming simulation game where I worked on porting the game to PS5, Microsoft Store, and Xbox platforms. I implemented the complete demo-to-save migration system, enabling players to seamlessly carry over their progress from the demo version to the full game. I also built the cloud save access system across Microsoft Store and Xbox, ensuring save data synchronization and Xbox Play Anywhere compliance for a smooth cross-platform experience.",
  image: farming_camp,
  video_link: "FarmingCamp.mp4",
  source_code_link: "https://github.com/mohammedsuhailkh/",
  demo_link: "",
},
{
  name: "Mirth Island (PS5 / NINTENDO SWITCH)",
  description: "Mirth Island is a cozy life-simulation game that I ported to PS5 and Nintendo Switch. I optimized the game for each platform's hardware capabilities, implemented platform-based code changes for input handling, rendering, and system APIs, and built the save data system with platform-specific storage integration to ensure reliable progress persistence across both consoles.",
  image: mirthIsland,
  video_link: "MirthIsland.mp4",
  source_code_link: "https://github.com/mohammedsuhailkh/",
  demo_link: "",
},
{
  name: "Valeria (In Production)",
  description: "Valeria is a survival-action game fully designed and developed by me as a solo project. I implemented all core gameplay systems including player movement and combat mechanics, survival systems, enemy AI behaviors, interaction systems, game progression logic, UI implementation, and environment setup. The project showcases my ability to independently build complete gameplay mechanics and integrate them into a cohesive survival experience using Unity.",
  image: dumbledash,
  video_link: "dumbledash.mp4",
  source_code_link: "https://github.com/mohammedsuhailkh/",
  demo_link: "",
},
{
  name: "Orange Season 2 (PS5)",
  description: "Orange Season is a farming simulation game for PS5 where I contributed by implementing the complete tractor system, including vehicle control and dynamic switching between multiple farming tools. I also worked on fully implementing the inventory system, handling item management, interactions, and gameplay integration to support core farming mechanics.",
  image: os,
  video_link: "OS.mp4",
  source_code_link: "https://github.com/mohammedsuhailkh/",
  demo_link: "",
},
{
  name: "AereA (WINDOWS / NINTENDO SWITCH / PS5 / XBOX)",
  description: "AereA is a music-themed action RPG where I was responsible for fully porting the game across multiple platforms including Windows, Nintendo Switch, PS5, and Xbox. I handled platform adaptation, build configuration, optimization, and compatibility implementation, while also managing ongoing maintenance, updates, and technical stability of the entire game across all supported platforms.",
  image: downtown,
  video_link: "downtown.mp4",
  source_code_link: "https://github.com/mohammedsuhailkh/",
  demo_link: "",
},
{
  name: "Truck Driver (WINDOWS / MAC / ANDROID / SWITCH)",
  description: "Truck Driver is a realistic driving simulation game where I contributed by handling cross-platform porting across Windows, Mac, Android, and Nintendo Switch. My work focused on bug fixing, platform-specific issue resolution, performance improvements, and stability optimization, along with contributing to the implementation and support of downloadable content (DLC) features.",
  image: towerbash,
  video_link: "towerbash.mp4",
  source_code_link: "https://github.com/mohammedsuhailkh/",
  demo_link: "",
},
{
  name: "VR Chemlab",
  description: "VR Chemlab is an immersive virtual reality educational application fully designed and developed by me from scratch. I implemented all interaction systems, experiment mechanics, VR controls, UI workflows, and environment setup, creating an interactive simulation that allows users to safely perform and explore chemistry experiments within a realistic virtual learning environment.",
  image: aargon,
  video_link: "aargon.mp4",
  source_code_link: "https://github.com/mohammedsuhailkh/",
  demo_link: "",
},
{
  name: "StarShip Stride (WebGL)",
  description: "StarShip Stride is a WebGL-based space navigation game fully developed by me from scratch, where players pilot a spaceship through obstacle-filled environments to achieve a safe landing. I implemented player controls, physics-based movement, collision systems, level mechanics, gameplay logic, and WebGL optimization to deliver a smooth browser-based gameplay experience.",
  image: pboost,
  video_link: "starshipstride.mp4",
  source_code_link: "https://github.com/mohammedsuhailkh/starship-stride",
  demo_link: "",
},

{
  name: "Food Truck Shef (WINDOWS / SWITCH / PS5)",
  description: "Food Truck Shef is a time-management cooking simulation game where I contributed by implementing input system modifications and handling platform adaptation during the PS5 porting process. My responsibilities also included resolving gameplay and platform-specific bugs, improving stability, and ensuring smooth performance and compatibility across supported platforms.",
  image: monster,
  video_link: "monster.mp4",
  source_code_link: "https://github.com/mohammedsuhailkh/monster-escape-unity3D",
  demo_link: "",
},
  // {
  //   name: 'Mario Clone',
  //   description: 'Designed and crafted a Mario-inspired game with a comprehensive set of basic features.',
  //   image: mario,
  //   video_link: 'mario.mp4', // Add the video link here
  //   source_code_link: 'https://github.com/mohammedsuhailkh/mario-clone',
  //   demo_link: '',
  // },
  // {
  //   name: 'Coin Rush',
  //   description: 'Developed an immersive endless runner game that puts players on a thrilling quest to collect coins while skillfully avoiding obstacles.',
  //   image: runner,
  //   video_link: 'runner.mp4', // Add the video link here
  //   source_code_link: 'https://github.com/mohammedsuhailkh/infinite-runner',
  //   demo_link: '',
  // },
  {
    name: "Invoice Generator",
    description: 'Developed a sleek full-stack web app for a company, streamlining invoice printing and management while ensuring secure data storage in the database.',
    image: InvoiceGenerator,
    video_link: '', // Add the video link here
    source_code_link: 'https://github.com/mohammedsuhailkh/invoice-generator',
    demo_link: ' ',
  },

  {
    name: 'ShortnIt',
    description: 'Experience an advanced web application driven by AI for effortless information extraction. Simply paste an article link, and let the intelligent summarizer condense the content, providing you with concise insights.',
    image: summariser,
    video_link: 'ShortnItV.webm', // Add the video link here
    source_code_link: 'https://github.com/mohammedsuhailkh/summarizer',
    demo_link: 'https://summarizer-bice.vercel.app/',
  },
  {
    name: 'Designer',
    description: "This project features an interactive shirt designer powered by Three.js and OpenAI API for enhanced customization. Users can design shirts using 3D models, while OpenAI integration ensures seamless interaction.",
    image: designer,
    video_link: '', // Add the video link here
    source_code_link: 'https://github.com/mohammedsuhailkh/AI-3d_Shirt_designer',
    demo_link: 'https://designer-deploy-build.vercel.app/',
  },
];


const memoji = {
  image: [avatar],
};

const skills = [
  {
    id: 'html',
    title: 'HTML',
    icon: htmlIcon,
    description:
      'I have a strong command of HTML for organizing web pages and generating meaningful content that can be accessed by all users.',
  },
  {
    id: 'css',
    title: 'CSS',
    icon: cssIcon,
    description:
    'I possess expertise in utilizing CSS to design web pages and craft visually captivating layouts that enhance the overall user experience.',
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    icon: jsIcon,
    description:
    'I have substantial experience in employing JavaScript to introduce interactivity and functionality into web pages, resulting in dynamic user interfaces.',
  },
  {
    id: 'react',
    title: 'React',
    icon: reactIcon,
    description:
      'I am well-versed in React, proficient in creating reusable components and managing application state using hooks and context.',
  },
  // {
  //   id: 'java',
  //   title: 'Java',
  //   icon: javaIcon,
  //   description:
  //     'I have extensive experience utilizing Java for object-oriented programming (OOP) and implementing data structures.',
  // },
  // {
  //   id: 'aws',
  //   title: 'Amazon Web Services',
  //   icon: awsIcon,
  //   description:
  //     'I am certified in AWS and proficient in working with EC2 and RDS instances, leveraging the power of cloud computing for scalable and reliable infrastructure.',
  // },
  {
    id: 'figma',
    title: 'Figma',
    icon: figmaIcon,
    description:
    'In my Figma skills, I unleash creativity, designing captivating user interfaces and collaborating seamlessly with designers and developers.',
  },
  {
    id: 'git',
    title: 'Git',
    icon: gitIcon,
    description:
    'I am proficient in Git, managing code changes, collaborating with others, and resolving conflicts effectively.',
  },
  {
    id: 'github',
    title: 'GitHub',
    icon: githubIcon,
    description:
      'I am skilled in using GitHub for seamless project collaboration, code sharing, and issue tracking. Through GitHub, I efficiently create and manage repositories and effectively present my work to potential employers.',
  },
  // {
  //   id: 'psql',
  //   title: 'Postgresql',
  //   icon: psqlIcon,
  //   description:
  //     'I have a strong command of PostgreSQL, encompassing a wide range of skills such as database normalization, triggers, front-end connectivity, and data analysis using software like Power BI.',
  // },
  {
    id: 'vite',
    title: 'Vite',
    icon: viteIcon,
    description:
      'I have gained considerable experience working with Vite for approximately six months, leveraging its capabilities to build React websites and seamlessly deploy them on platforms like Netlify.',
  },
  {
    id: 'py',
    title: 'Python',
    icon: pyIcon,
    description:
      'I possess a foundational understanding of Python, which means I have a grasp of its fundamental concepts and functionalities. While I may not be an expert, I am familiar with the basics and can work with the language to some extent.',
  },
  {
    id: 'node',
    title: 'Node',
    icon: nodeIcon,
    description:
      'When it comes to building web applications, I prefer using Node as my runtime environment over Yarn. I have expertise in leveraging Node.js to develop powerful and scalable web applications.',
  },
  {
    id: 'firebase',
    title: 'FireBase',
    icon: FirebaseIcon,
    description:
      "I possess practical hands-on experience with Firebase. Through active engagement and practice, I have gained a foundational understanding of how to effectively work with Firebase features and functionalities.",
  },
  {
    id: 'burp',
    title: 'Burp suite',
    icon: burpsuiteIcon,
    description:
      'I possess practical, hands-on expertise in utilizing and navigating the features of Burp Suite. This includes a deep understanding of its functionalities and the ability to effectively employ it for various tasks related to web security, testing, and analysis.',
  },
  // {
  //   id: 'eslint',
  //   title: 'Eslint',
  //   icon: eslintIcon,
  //   description:
  //     'I utilize ESLint to identify and resolve code issues, as well as standardize the structure of my projects. With ESLint, I ensure code quality and consistency throughout my development process.',
  // },
];

const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

export {
  media,
  introduction,
  projects,
  memoji,
  skills,
  markerSvg,
  icons,
};
