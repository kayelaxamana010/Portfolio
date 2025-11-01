import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { supabase } from "../supabase"; 

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import CardCaseStudy from "../components/CardCaseStudy";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";


const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-light-text-secondary dark:text-slate-300 
      hover:text-light-accent dark:hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/80 dark:bg-white/5 
      hover:bg-light-bg-secondary dark:hover:bg-white/10
      rounded-2xl
      border 
      border-gray-200 dark:border-white/10
      hover:border-light-accent dark:hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
      shadow-soft dark:shadow-none
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-light-accent-secondary dark:bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// Updated Tech Stack
const techStacks = [
  { icon: "aws.svg", language: "AWS" },
  { icon: "google-cloud.svg", language: "Google Cloud" },
  { icon: "github.svg", language: "GitHub" },
  { icon: "confluence.svg", language: "Confluence" },
  { icon: "jira.svg", language: "Jira" },
  { icon: "windows.svg", language: "Windows" },
  { icon: "linux.svg", language: "Linux" },
  { icon: "make.svg", language: "Make" },
  { icon: "zapier.svg", language: "Zapier" },
  { icon: "mysql.svg", language: "MySQL" },
  { icon: "postgresql.svg", language: "PostgreSQL" },
  { icon: "powershell.svg", language: "PowerShell" },
  { icon: "sap.svg", language: "SAP" },
  { icon: "slack.svg", language: "Slack" },
  { icon: "microsoft-office.svg", language: "MS Office" },
  { icon: "snow.svg", language: "ServiceNow" },
  { icon: "cursor-ai.svg", language: "Cursor AI" },
  { icon: "openai.svg", language: "OpenAI" },
];

// Sample Case Studies data (for testing - replace with Supabase data later)
const sampleCaseStudies = [
  {
    id: 1,
    Title: "Mobile Safe SSL Renewal for Power BI Report Server",
    Description: "Replaced and deployed a new Entrust certificate across AWS ACM, Load Balancer, and Power BI Report Server. Ensured secure mobile access on corporate WiFi with clear verification and rollback."
  },
  {
    id: 2,
    Title: "ServiceNow Automation for Database User Access Requests",
    Description: "Automated intake and fulfillment of MySQL/Aurora DB user access via ServiceNow. Applied least-privilege by environment, stored credentials in the vault, and notified users with time-boxed links."
  },
  {
    id: 3,
    Title: "Restoring Connectivity via Power BI On-premises Data Gateway Restart",
    Description: "A repeatable, low-risk procedure to restart the on-premises data gateway when refreshes or live connections fail. Covers Gateway UI restart and Windows Services fallback, with sign-in and status checks."
  }
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCaseStudies, setShowAllCaseStudies] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
    });
    
    // Check if coming from case study page
    const fromCaseStudy = sessionStorage.getItem('returnToCaseStudies');
    if (fromCaseStudy === 'true') {
      setValue(1); // Set to Case Studies tab (index 1)
      sessionStorage.removeItem('returnToCaseStudies'); // Clean up
    }
  }, []);


  const fetchData = useCallback(async () => {
    try {
      // Fetch data from Supabase in parallel
      const [projectsResponse, caseStudiesResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order('id', { ascending: true }),
        supabase.from("case_studies").select("*").order('id', { ascending: true }),
        supabase.from("certificates").select("*").order('id', { ascending: true }), 
      ]);

      // Handle each response independently with fallbacks
      const projectData = projectsResponse.error ? [] : (projectsResponse.data || []);
      const caseStudyData = caseStudiesResponse.error ? sampleCaseStudies : (caseStudiesResponse.data || []);
      const certificateData = certificatesResponse.error ? [] : (certificatesResponse.data || []);

      // Log errors but don't break the app
      if (projectsResponse.error) console.warn("Projects fetch error:", projectsResponse.error.message);
      if (caseStudiesResponse.error) console.warn("Case Studies fetch error (using sample data):", caseStudiesResponse.error.message);
      if (certificatesResponse.error) console.warn("Certificates fetch error:", certificatesResponse.error.message);

      setProjects(projectData);
      setCaseStudies(caseStudyData);
      setCertificates(certificateData);

      // Store in localStorage (this functionality is maintained)
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("caseStudies", JSON.stringify(caseStudyData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
      // Use sample data as ultimate fallback
      setCaseStudies(sampleCaseStudies);
    }
  }, []);



  useEffect(() => {
    // Try taking it from localStorage first for faster loading.
    const cachedProjects = localStorage.getItem('projects');
    const cachedCaseStudies = localStorage.getItem('caseStudies');
    const cachedCertificates = localStorage.getItem('certificates');

    if (cachedProjects) setProjects(JSON.parse(cachedProjects));
    if (cachedCaseStudies) {
      setCaseStudies(JSON.parse(cachedCaseStudies));
    } else {
      // Use sample data if no cached data
      setCaseStudies(sampleCaseStudies);
    }
    if (cachedCertificates) setCertificates(JSON.parse(cachedCertificates));
    
    fetchData(); // Still call fetchData to synchronize latest data
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else if (type === 'caseStudies') {
      setShowAllCaseStudies(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCaseStudies = showAllCaseStudies ? caseStudies : caseStudies.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  // Rest of the component (return statement) remains unchanged
  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-transparent overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary">
          Portfolio Showcase
        </h2>
        <p className="text-light-text-secondary dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise.
        </p>
        <p className="text-light-text-secondary dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(229, 231, 235, 0.5)",
            borderRadius: "24px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 2px 15px rgba(0, 0, 0, 0.08)",
            ".dark &": {
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "none",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
              ".dark &": {
                background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              },
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#718096",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "16px",
                ".dark &": {
                  color: "#94a3b8",
                },
                "&:hover": {
                  color: "#667eea",
                  backgroundColor: "rgba(102, 126, 234, 0.08)",
                  transform: "translateY(-2px)",
                  ".dark &": {
                    color: "#ffffff",
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                  },
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#1a202c",
                  background: "linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))",
                  boxShadow: "0 2px 15px rgba(102, 126, 234, 0.2)",
                  ".dark &": {
                    color: "#fff",
                    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                    boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  },
                  "& .lucide": {
                    color: "#667eea",
                    ".dark &": {
                      color: "#a78bfa",
                    },
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Case Studies"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(3)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          {/* Tab 0: Projects */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          {/* Tab 1: Case Studies */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedCaseStudies.map((caseStudy, index) => (
                  <div
                    key={caseStudy.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardCaseStudy
                      Title={caseStudy.Title}
                      Description={caseStudy.Description}
                      id={caseStudy.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {caseStudies.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('caseStudies')}
                  isShowingMore={showAllCaseStudies}
                />
              </div>
            )}
          </TabPanel>

          {/* Tab 2: Tech Stack */}
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>

          {/* Tab 3: Certificates */}
          <TabPanel value={value} index={3} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={certificate.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}