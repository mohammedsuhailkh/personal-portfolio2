

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
  Nesco,
  Netflix,
  summariser,
  avatar,
  FirebaseIcon,
  burpsuiteIcon,
  designer,
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
  {
    id: 'contact',
    title: 'Contact',
  },
];

const projects = [
  {
    name: "Nesco Ice Creams",
    description: 'Developed a static website for an Ice Cream manufacturing company to effectively showcase their range of products and essential company information',
    image: Nesco,
    source_code_link: '',
    demo_link: 'https://nescoicecream.com/',
  },
  {
    name: 'Netflix Clone',
    description: 'Crafted using React.js, Firebase, and the dynamic TMDB API, this project showcases a meticulously crafted Netflix clone.',
    image: Netflix,
    source_code_link: 'https://github.com/mohammedsuhailkh/netflix-clone',
    demo_link: '',
  },
  {
    name: 'ShortnIt',
    description: 'Experience an advanced web application driven by AI for effortless information extraction. Simply paste an article link, and let the intelligent summarizer condense the content, providing you with concise insights.',
    image: summariser,
    source_code_link: 'https://github.com/mohammedsuhailkh/summarizer',
    demo_link: 'https://summarizer-bice.vercel.app/',
  },
  {
    name: 'Designer',
    description: "This project features an interactive shirt designer powered by Three.js and OpenAI API for enhanced customization. Users can design shirts using 3D models, while OpenAI integration ensures seamless interaction for a dynamic design experience.",
    image: designer,
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
