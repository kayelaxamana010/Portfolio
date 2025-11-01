import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ProjectDetails from "./components/ProjectDetail";
import CaseStudySSL from "./Pages/CaseStudySSL";
import CaseStudyServiceNow from "./Pages/CaseStudyServiceNow";
import CaseStudyPowerBI from "./Pages/CaseStudyPowerBI";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from 'framer-motion';
import NotFoundPage from "./Pages/404";

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  const location = useLocation();

  useEffect(() => {
    // Skip welcome screen if navigating with hash (from back button)
    if (location.hash) {
      setShowWelcome(false);
      // Scroll to the section after a brief delay
      setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location, setShowWelcome]);
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <Navbar />
          <AnimatedBackground />
          <Home />
          <About />
          <Portofolio />
          <footer>
            <center>
              <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
              <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                © 2025{" "}
                <a href="https://flowbite.com/" className="hover:underline">
                  kayelaxamana™
                </a>
                . All Rights Reserved.
              </span>
            </center>
          </footer>
        </>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            kayelaxamana™
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

const CaseStudyPageLayout = () => (
  <>
    <AnimatedBackground />
    <CaseStudySSL />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            kayelaxamana™
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

const CaseStudyServiceNowLayout = () => (
  <>
    <AnimatedBackground />
    <CaseStudyServiceNow />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            kayelaxamana™
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

const CaseStudyPowerBILayout = () => (
  <>
    <AnimatedBackground />
    <CaseStudyPowerBI />
    <footer>
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            kayelaxamana™
          </a>
          . All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
        <Route path="/case-study/ssl" element={<CaseStudyPageLayout />} />
        <Route path="/case-study/servicenow" element={<CaseStudyServiceNowLayout />} />
        <Route path="/case-study/powerbi" element={<CaseStudyPowerBILayout />} />
        <Route path="/case-study/:id" element={<CaseStudyPageLayout />} />
        <Route path="*" element={<NotFoundPage />} /> {/* This is the 404 route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;