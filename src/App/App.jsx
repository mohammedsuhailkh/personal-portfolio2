/*
   Copyright (C), 2023-2024, Sara Echeverria (bl33h)
   Author: Sara Echeverria
   FileName: App.jsx
   Version: I
   Creation: 02/06/2023
   Last modification: 02/06/2023
*/

import NavBar from "../Components/nav/NavBar";
import Hero from "../Pages/Hero";
import About from "../Pages/About";
import Skills from "../Pages/Skills";
import Contact from "../Pages/Contact";
import ProjectCards from "../Components/ProjectCards";

function App() {
  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <ProjectCards />
      <Skills />
      <Contact />
    </>
  );
}

export default App;
