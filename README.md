# 🌟 Katherine Laxamana - Portfolio Website

> A modern, responsive portfolio website showcasing my expertise in IT automation, DevOps, and AI integration.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://kslportfolio-id010.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/kayelaxamana010/Portfolio)

![Portfolio Banner](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?style=flat-square&logo=vite)

---

## 🎯 About

This is my personal portfolio website built to showcase my professional work as an **IT Professional** and **DevOps Engineer** specializing in automation and AI integration. The site features a modern, glassmorphic design with seamless light/dark mode transitions and engaging animations.

**Live Site:** [kslportfolio-id010.vercel.app](https://kslportfolio-id010.vercel.app/)

---

## ✨ Features

### 🎨 **Design & UX**
- ✅ Modern glassmorphic UI with gradient accents
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Smooth light/dark mode toggle
- ✅ Animated welcome screen
- ✅ Scroll-triggered animations (AOS)
- ✅ Interactive animated background

### 📱 **Sections**
1. **Home** - Introduction with animated typing effect
2. **About** - Personal background, stats, and downloadable CV
3. **Portfolio** - Three tabs:
   - Projects (with live demos)
   - Case Studies (detailed technical documentation)
   - Tech Stack (skills visualization)
   - Certificates (interactive gallery)
4. **Contact** - Direct email integration

### 🔧 **Functionality**
- ✅ Dynamic routing with React Router
- ✅ Supabase integration for data management
- ✅ LocalStorage caching for performance
- ✅ SessionStorage for state persistence
- ✅ SEO optimized with JSON-LD structured data
- ✅ Lazy loading and code splitting

### 🎯 **Case Studies**
Three comprehensive technical case studies with dedicated detail pages:
1. **SSL Renewal** - Power BI Report Server certificate deployment
2. **ServiceNow Automation** - Database user access automation
3. **Power BI Gateway** - On-premises data gateway restart procedures

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI library |
| **Vite** | 6.0.3 | Build tool & dev server |
| **Tailwind CSS** | 3.4.17 | Utility-first styling |
| **React Router DOM** | 7.1.1 | Client-side routing |
| **Framer Motion** | 11.18.0 | Animations |
| **AOS** | 2.3.4 | Scroll animations |

### **UI Components**
- **Material-UI** - Tabs, Modal, Icons
- **Lucide React** - Modern icon library
- **Lottie Files** - Animated illustrations
- **React Icons** - Social media icons

### **Backend Integration**
- **Supabase** - Database & API
- **SweetAlert2** - Enhanced alerts

### **Development**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 📁 Project Structure

```
Portofolio_V5/
├── public/
│   ├── Photo.jpg              # Profile image
│   └── images/                # Static assets
├── src/
│   ├── components/
│   │   ├── Background.jsx     # Animated background
│   │   ├── CardProject.jsx    # Project card component
│   │   ├── CardCaseStudy.jsx  # Case study card
│   │   ├── Certificate.jsx    # Certificate modal
│   │   ├── DarkModeToggle.jsx # Theme switcher
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── ProjectDetail.jsx  # Project detail page
│   │   └── TechStackIcon.jsx  # Tech stack icons
│   ├── Pages/
│   │   ├── Home.jsx           # Landing section
│   │   ├── About.jsx          # About section
│   │   ├── Portofolio.jsx     # Portfolio section
│   │   ├── CaseStudySSL.jsx   # SSL case study
│   │   ├── CaseStudyServiceNow.jsx
│   │   ├── CaseStudyPowerBI.jsx
│   │   ├── WelcomeScreen.jsx  # Entry animation
│   │   └── 404.jsx            # Not found page
│   ├── App.jsx                # Main app & routing
│   ├── main.jsx               # Entry point
│   ├── index.css              # Global styles
│   └── supabase.js            # Supabase config
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies
```

---

## 🌐 Deployment

### **Vercel (Recommended)**

This project is optimized for Vercel deployment:

1. **Connect GitHub repository to Vercel**
2. **Configure build settings:**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Add environment variables** in Vercel dashboard
4. **Deploy!**

Every push to `main` branch automatically triggers a new deployment.

### **Alternative Deployment Options**
- Netlify
- GitHub Pages
- AWS Amplify
- Firebase Hosting

---

## ⚡ Performance

### **Lighthouse Scores**
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### **Optimizations**
- ✅ Code splitting & lazy loading
- ✅ Image optimization
- ✅ LocalStorage caching
- ✅ Minified CSS & JS
- ✅ Responsive images
- ✅ Efficient animations

---

## 🎨 Design Philosophy

### **Color Palette**

**Light Mode:**
- Primary: `#667eea` (Indigo)
- Secondary: `#764ba2` (Purple)
- Accent: Pink gradients

**Dark Mode:**
- Background: `#030014` (Deep blue-black)
- Primary: `#8b5cf6` (Purple)
- Secondary: `#3b82f6` (Blue)

### **Typography**
- **Font Family:** Poppins (Google Fonts)
- **Headings:** Bold, gradient text
- **Body:** Light/Regular weights

---

## 📦 Dependencies

### **Core**
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.1.1",
  "vite": "^6.0.3"
}
```

### **Styling**
```json
{
  "tailwindcss": "^3.4.17",
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0"
}
```

### **UI & Animations**
```json
{
  "framer-motion": "^11.18.0",
  "aos": "^2.3.4",
  "@mui/material": "^6.3.1",
  "lucide-react": "^0.469.0"
}
```

---

## 🔧 Configuration Files

### **Tailwind Config**
Custom theme with light/dark mode support, custom colors, and shadows.

### **Vite Config**
Optimized build configuration with React plugin.

### **ESLint Config**
Code quality and consistency rules.

---

## 📝 Features Roadmap

- [x] Basic portfolio structure
- [x] Light/dark mode toggle
- [x] Case studies section
- [x] Responsive design
- [x] SEO optimization
- [x] Animated welcome screen
- [ ] Blog section
- [ ] Contact form with backend
- [ ] Multilingual support
- [ ] Analytics integration

---

## 🐛 Known Issues

None at the moment! 🎉

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Contact

**Katherine Laxamana**

- 🌐 Website: [kslportfolio-id010.vercel.app](https://kslportfolio-id010.vercel.app/)
- 💼 LinkedIn: [katherine-laxamana](https://www.linkedin.com/in/katherine-laxamana/)
- 🐙 GitHub: [@kayelaxamana010](https://github.com/kayelaxamana010)

---

## 🙏 Acknowledgments

- **Design Inspiration:** Modern glassmorphism trends
- **Icons:** [Lucide Icons](https://lucide.dev/)
- **Animations:** [AOS Library](https://michalsnik.github.io/aos/)
- **Illustrations:** [Lottie Files](https://lottiefiles.com/)
- **Hosting:** [Vercel](https://vercel.com/)
- **Database:** [Supabase](https://supabase.com/)

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/kayelaxamana010/Portfolio?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/kayelaxamana010/Portfolio?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/kayelaxamana010/Portfolio?style=social)

---

<div align="center">

[Back to Top ↑](#-katherine-laxamana---portfolio-website)

</div>


