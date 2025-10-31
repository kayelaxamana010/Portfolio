import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Globe } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 260);
    
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Animated blobs matching the main site's light theme */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-purple-200/30 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/20 via-transparent to-blue-200/20 blur-2xl animate-float" />
  </div>
);

const IconButton = ({ Icon, link }) => (
  <a 
    href={link} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group relative inline-block"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
    <div className="relative rounded-2xl bg-white/80 dark:bg-black/50 backdrop-blur-xl p-3 sm:p-4 flex items-center justify-center border border-gray-200 dark:border-white/10 group-hover:border-light-accent dark:group-hover:border-white/20 transition-all duration-300 shadow-soft dark:shadow-none hover:shadow-soft-lg dark:hover:shadow-dark-soft group-hover:scale-110 transform">
      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-light-text dark:text-white group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors duration-300" />
    </div>
  </a>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Social links configuration matching the Home page
  const socialIcons = [
    { Icon: Github, link: "https://github.com/kayelaxamana010" },
    { Icon: Linkedin, link: "https://www.linkedin.com/in/katherine-laxamana/" },
    { Icon: FaWhatsapp, link: "https://wa.me/+639778491473" }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-white via-blue-50/80 to-pink-50/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />
          
          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto">
              {/* Icons */}
              <motion.div 
                className="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                {socialIcons.map((social, index) => (
                  <div key={index} data-aos="fade-down" data-aos-delay={index * 200}>
                    <IconButton Icon={social.Icon} link={social.link} />
                  </div>
                ))}
              </motion.div>

              {/* Welcome Text */}
              <motion.div 
                className="text-center mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4">
                  <div className="mb-2 sm:mb-4">
                    <span data-aos="fade-right" data-aos-delay="200" className="inline-block px-2 text-light-text dark:bg-gradient-to-r dark:from-white dark:via-blue-100 dark:to-purple-200 dark:bg-clip-text dark:text-transparent">
                      Welcome
                    </span>{' '}
                    <span data-aos="fade-right" data-aos-delay="400" className="inline-block px-2 text-light-text dark:bg-gradient-to-r dark:from-white dark:via-blue-100 dark:to-purple-200 dark:bg-clip-text dark:text-transparent">
                      To
                    </span>{' '}
                    <span data-aos="fade-right" data-aos-delay="600" className="inline-block px-2 text-light-text dark:bg-gradient-to-r dark:from-white dark:via-blue-100 dark:to-purple-200 dark:bg-clip-text dark:text-transparent">
                      My
                    </span>
                  </div>
                  <div>
                    <span data-aos="fade-up" data-aos-delay="800" className="inline-block px-2 bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-indigo-600 dark:to-purple-600 bg-clip-text text-transparent">
                      Portfolio
                    </span>{' '}
                    <span data-aos="fade-up" data-aos-delay="1000" className="inline-block px-2 bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-indigo-600 dark:to-purple-600 bg-clip-text text-transparent">
                      Website
                    </span>
                  </div>
                </h1>
              </motion.div>

              {/* Website Link */}
              <motion.div 
                className="text-center"
                variants={childVariants}
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                <a
                  href="kslportfolio"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full relative group hover:scale-105 transition-transform duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-light-accent/20 to-light-accent-secondary/20 dark:from-indigo-600/20 dark:to-purple-600/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                  <div className="relative flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-light-accent dark:text-indigo-600" />
                    <span className="bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-indigo-600 dark:to-purple-600 bg-clip-text text-transparent">
                      <TypewriterEffect text="kslportfolio" />
                    </span>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;