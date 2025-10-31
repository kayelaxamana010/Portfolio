import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    
    const navItems = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "About" },
        { href: "#Portofolio", label: "Portofolio" },
        { href: "https://mail.google.com/mail/?view=cm&fs=1&to=td.katherine.laxamana@gmail.com", label: "Contact", external: true },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = navItems
                .filter(item => !item.external)
                .map(item => {
                    const section = document.querySelector(item.href);
                    if (section) {
                        return {
                            id: item.href.replace("#", ""),
                            offset: section.offsetTop - 550,
                            height: section.offsetHeight
                        };
                    }
                    return null;
                }).filter(Boolean);

            const currentPosition = window.scrollY;
            const active = sections.find(section => 
                currentPosition >= section.offset && 
                currentPosition < section.offset + section.height
            );

            if (active) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const scrollToSection = (e, href, isExternal) => {
        if (isExternal) {
            window.open(href, '_blank', 'noopener,noreferrer');
            e.preventDefault();
            setIsOpen(false);
            return;
        }
        
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 100;
            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                isOpen
                    ? "bg-white/95 dark:bg-dark-bg/95"
                    : scrolled
                    ? "bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl shadow-soft dark:shadow-dark-soft"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto px-[5%] sm:px-[5%] lg:px-[10%]">
                <div className="flex items-center justify-between h-16">
                    {/* Empty space for layout balance */}
                    <div className="w-12"></div>
                    
                    {/* Desktop Navigation - Centered */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href, item.external)}
                                    className="group relative px-1 py-2 text-sm font-medium"
                                >
                                    <span
                                        className={`relative z-10 transition-colors duration-300 ${
                                            !item.external && activeSection === item.href.substring(1)
                                                ? "bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent font-semibold"
                                                : "text-light-text dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary transform origin-left transition-transform duration-300 ${
                                            !item.external && activeSection === item.href.substring(1)
                                                ? "scale-x-100"
                                                : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    {/* Mobile Menu Button (centered on mobile) */}
                    <div className="md:hidden flex-1 flex justify-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-2 text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent transition-transform duration-300 ease-in-out transform ${
                                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                            }`}
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
        
                    {/* Dark Mode Toggle - Always on the right */}
                    <div className="flex items-center">
                        <DarkModeToggle />
                    </div>
                </div>
            </div>
        
            {/* Mobile Menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${
                    isOpen
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                }`}
            >
                <div className="px-4 py-6 space-y-4 bg-white dark:bg-dark-bg">
                    {navItems.map((item, index) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => scrollToSection(e, item.href, item.external)}
                            className={`block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300 ease ${
                                !item.external && activeSection === item.href.substring(1)
                                    ? "bg-gradient-to-r from-light-accent to-light-accent-secondary dark:from-dark-accent dark:to-dark-accent-secondary bg-clip-text text-transparent font-semibold"
                                    : "text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary"
                            }`}
                            style={{
                                transitionDelay: `${index * 100}ms`,
                                transform: isOpen ? "translateX(0)" : "translateX(50px)",
                                opacity: isOpen ? 1 : 0,
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;