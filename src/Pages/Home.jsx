import React, { useState, useEffect, useCallback, memo } from "react"
import { Github, Linkedin, Mail, ExternalLink, Sparkles } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-soft dark:shadow-none">
        <span className="bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-light-accent dark:text-dark-accent" />
          Ready to Automate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary blur-2xl opacity-20"></span>
        <span className="relative text-light-text dark:bg-gradient-to-r dark:from-white dark:via-blue-100 dark:to-purple-200 dark:bg-clip-text dark:text-transparent">
          I.T
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent">
          Professional
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 text-sm text-light-text dark:text-gray-300 hover:bg-light-bg-secondary dark:hover:bg-white/10 transition-all duration-300 shadow-soft dark:shadow-none">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href} target={text === 'Contact' ? '_blank' : undefined} rel={text === 'Contact' ? 'noopener noreferrer' : undefined}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary rounded-2xl opacity-30 blur-md group-hover:opacity-60 transition-all duration-700"></div>
      <div className="relative h-11 bg-white dark:bg-dark-bg backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 leading-none overflow-hidden shadow-soft dark:shadow-none hover:shadow-soft-lg dark:hover:shadow-dark-soft transition-all duration-300">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-light-accent/10 to-light-accent-secondary/10 dark:from-dark-accent/20 dark:to-dark-accent-secondary/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="text-light-text dark:bg-gradient-to-r dark:from-gray-200 dark:to-white dark:bg-clip-text dark:text-transparent font-medium z-10">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-light-text dark:text-gray-200 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-2xl bg-white/80 dark:bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-gray-200 dark:border-white/10 group-hover:border-light-accent dark:group-hover:border-white/20 transition-all duration-300 shadow-soft dark:shadow-none hover:shadow-soft-lg dark:hover:shadow-dark-soft">
        <Icon className="w-5 h-5 text-light-text-secondary dark:text-gray-400 group-hover:text-light-accent dark:group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["I.T Professional", "DevOps Engineer", "Automation Specialist"];
const TECH_STACK = ["AWS", "Make", "MySQL", "Atlassian"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/kayelaxamana010" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/katherine-laxamana/" },
  { icon: FaWhatsapp, link: "https://wa.me/+639778491473" }
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
       
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Lottie configuration
  const lottieOptions = {
    src: "https://lottie.host/d8a01712-2f35-4e89-99eb-842bbf5d6ccc/P8CeBZUhcb.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering 
        ? "scale-[180%] sm:scale-[160%] md:scale-[150%] lg:scale-[145%] rotate-2" 
        : "scale-[175%] sm:scale-[155%] md:scale-[145%] lg:scale-[140%]"
    }`
  };

  return (
    <div className="min-h-screen bg-transparent overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] " id="Home">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto  min-h-screen ">
          <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
              data-aos="fade-right"
              data-aos-delay="200">
              <div className="space-y-4 sm:space-y-6">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-xl md:text-2xl text-light-text-secondary dark:bg-gradient-to-r dark:from-gray-100 dark:to-gray-300 dark:bg-clip-text dark:text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-light-text-secondary dark:text-gray-400 max-w-xl leading-relaxed font-light"
                  data-aos="fade-up"
                  data-aos-delay="1000">
                  Building intelligent, functional, and intuitive AI automations that deliver results.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-3 w-full justify-start" data-aos="fade-up" data-aos-delay="1400">
                  <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                  <CTAButton href="https://mail.google.com/mail/?view=cm&fs=1&to=td.katherine.laxamana@gmail.com" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div className="hidden sm:flex gap-4 justify-start" data-aos="fade-up" data-aos-delay="1600">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Optimized Lottie Animation */}
            <div className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600">
              <div className="relative w-full opacity-90">
                <div className={`absolute inset-0 bg-gradient-to-r from-light-accent/10 to-light-accent-secondary/10 dark:from-dark-accent/10 dark:to-dark-accent-secondary/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                  isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                }`}>
                </div>

                <div className={`relative lg:left-12 z-10 w-full opacity-90 transform transition-transform duration-500 ${
                  isHovering ? "scale-105" : "scale-100"
                }`}>
                  <DotLottieReact {...lottieOptions} />
                </div>

                <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                  isHovering ? "opacity-50" : "opacity-20"
                }`}>
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-light-accent/10 to-light-accent-secondary/10 dark:from-indigo-500/10 dark:to-purple-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                    isHovering ? "scale-110" : "scale-100"
                  }`}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);