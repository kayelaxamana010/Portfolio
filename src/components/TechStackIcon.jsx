import React from 'react';

const TechStackIcon = ({ TechStackIcon, Language }) => {
  return (
    <div className="group p-6 rounded-3xl bg-white/80 dark:bg-slate-800/50 hover:bg-light-bg-secondary dark:hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer border border-gray-200 dark:border-transparent shadow-soft dark:shadow-lg hover:shadow-soft-lg dark:hover:shadow-xl">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-blue-500 dark:to-purple-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
        <img 
          src={TechStackIcon} 
          alt={`${Language} icon`} 
          className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
        />
      </div>
      <span className="text-light-text dark:text-slate-300 font-semibold text-sm md:text-base tracking-wide group-hover:text-light-accent dark:group-hover:text-white transition-colors duration-300">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon; 