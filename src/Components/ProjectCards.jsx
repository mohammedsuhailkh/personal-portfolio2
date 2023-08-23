import React from 'react';
import { projects } from '../Constants/constants';
import SectionTitle from './SectionTitle';

const ProjectCards = () => {
  return (
    <div className="container mx-auto py-15 text-white" id='projects'>
      <SectionTitle title="PROJECTS" subtitle="What I have done so far" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow-lg bg-white text-black">
            <h3 className="tcolor text-lg font-semibold mb-2">{project.name}</h3>
            <div className="aspect-w-12 aspect-h-9">
              <img
                src={project.image}
                alt={project.name}
                className="object-cover rounded-lg w-full h-40 md:h-56 lg:h-64"
              />
            </div>
            <div className="mt-2 h-25">
              <p className="text-sm text-white tcolor">{project.description}</p>
            </div>
            <div className="mt-4 mb-4 flex justify-center gap-3">
              <button className="tcolor border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white focus:outline-none focus:ring focus:border-blue-300">
                <a
                  href={project.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tcolor text-blue-500 text-sm inline-block"
                >
                  See Demo
                </a>
              </button>
              <button className="tcolor border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-400 hover:text-white focus:outline-none focus:ring focus:border-gray-300">
                <a
                  href={project.source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tcolor text-white text-sm inline-block" 
                >
                  Source Code
                </a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCards;
