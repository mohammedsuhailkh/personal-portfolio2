

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
  downtown
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
    "Hello there, I'm so happy you are here! (:",

    "Hello! My name is Suhail, Im a freelance developer and a  cyber security enthusiast ,I enjoy creating things that live on the internet." ,
    " My interest in web development started back in 2018 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button had bought in me a lot of interest in cyber security and web developement.",
    " My main focus these days is building accessible, inclusive products and securing the internet for a safer digital world."

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
    name: "Valeria (In Production)",
    description: 'Valeria is a survival-action game where a young girl navigates a desolate, creature-infested island to uncover the truth behind her abandonment and fight for her life.  ',
    image: dumbledash,
    video_link: 'dumbledash.mp4', // Add the video link here
    source_code_link: 'https://github.com/mohammedsuhailkh/',
    demo_link: '',
  },
  {
    name: "AereA",
    description: 'AereA is a music-themed action RPG where players battle enemies and retrieve stolen instruments to restore harmony. ',
    image: downtown,
    video_link: 'downtown.mp4', // Add the video link here
    source_code_link: 'https://github.com/mohammedsuhailkh/',
    demo_link: '',
  },
  {
    name: 'Tower Bash',
    description: 'Tower Bash is a captivating tower defense game . Strategically place towers, unleash powerful cannons, and defend your kingdom against relentless waves of enemies',
    image: towerbash,
    video_link: 'towerbash.mp4', // Add the video link here
    source_code_link: 'https://github.com/mohammedsuhailkh/',
    demo_link: '',
  },
  {
    name: 'VR Chemlab',
    description: 'VR Chemlab allows users to safely perform and explore experiments in an immersive, interactive virtual environment, enhancing learning and engagement.',
    image: aargon,
    video_link: 'aargon.mp4', // Add the video link here
    source_code_link: 'https://github.com/mohammedsuhailkh/',
    demo_link: '',
  },
  {
    name: "StarShip Stride",
    description: 'Developed a game in which "We pilot a spaceship through a course of obstacles, striving to land safely on the designated finishing rock without encountering any obstacles to achieve victory."',
    image: pboost,
    video_link: 'starshipstride.mp4', // Add the video link here
    source_code_link: 'https://github.com/mohammedsuhailkh/starship-stride',
    demo_link: ' ',
  },

  {
    name: 'Monster Chase',
    description: 'Created a game in which We control a player tasked with jumping over monsters to secure victory; touching them results in defeat.',
    image: monster,
    video_link: 'monster.mp4', // Add the video link here
    source_code_link: 'https://github.com/mohammedsuhailkh/monster-escape-unity3D',
    demo_link: '',
  },
  {
    name: 'Mario Clone',
    description: 'Designed and crafted a Mario-inspired game with a comprehensive set of basic features.',
    image: mario,
    video_link: 'mario.mp4', // Add the video link here
    source_code_link: 'https://github.com/mohammedsuhailkh/mario-clone',
    demo_link: '',
  },
  {
    name: 'Coin Rush',
    description: 'Developed an immersive endless runner game that puts players on a thrilling quest to collect coins while skillfully avoiding obstacles.',
    image: runner,
    video_link: 'runner.mp4', // Add the video link here
    source_code_link: 'https://github.com/mohammedsuhailkh/infinite-runner',
    demo_link: '',
  },
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
