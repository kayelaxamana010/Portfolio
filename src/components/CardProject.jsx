import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  // Handle case when ProjectLink is empty
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink is empty");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };
  
  const handleDetails = (e) => {
    if (!id) {
      console.log("ID is empty");
      e.preventDefault();
      alert("Project details are not available");
    }
  };
  

  return (
    <div className="group relative w-full">
            
      <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-gradient-to-br dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-lg border border-gray-200 dark:border-white/10 shadow-soft-lg dark:shadow-2xl transition-all duration-300 hover:shadow-soft-lg dark:hover:shadow-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-light-accent/5 via-light-accent-secondary/5 to-pink-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
    
        <div className="relative p-5 z-10">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={Img}
              alt={Title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-semibold text-light-text dark:bg-gradient-to-r dark:from-blue-200 dark:via-purple-200 dark:to-pink-200 dark:bg-clip-text dark:text-transparent">
              {Title}
            </h3>
            
            <p className="text-light-text-secondary dark:text-gray-300/80 text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>
            
            <div className="pt-4 flex items-center justify-between">
              {ProjectLink ? (
                <a
                href={ProjectLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-2 text-light-accent dark:text-blue-400 hover:text-light-accent-secondary dark:hover:text-blue-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium">Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-light-text-secondary dark:text-gray-500 text-sm">Demo Not Available</span>
              )}
              
     

              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-light-bg-secondary dark:bg-white/5 hover:bg-light-accent/10 dark:hover:bg-white/10 text-light-text dark:text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-light-accent/50 dark:focus:ring-purple-500/50 shadow-soft dark:shadow-none"
                >
                  <span className="text-sm font-medium">Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-light-text-secondary dark:text-gray-500 text-sm">Details Not Available</span>
              )}
            </div>
          </div>
          
          <div className="absolute inset-0 border border-white/0 group-hover:border-light-accent/50 dark:group-hover:border-purple-500/50 rounded-3xl transition-colors duration-300 -z-50"></div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;