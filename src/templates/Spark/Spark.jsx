import { useState, useEffect } from 'react'
import './Spark.css'

function Spark({ data }) {
  const [activeSection, setActiveSection] = useState('about')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)

    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'projects', 'education']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Default sample data for standalone viewing
  const defaultData = {
    name: "Jordan Rivers",
    title: "Creative Developer & Designer",
    email: "jordan.rivers@email.com",
    phone: "+1 (555) 246-8101",
    location: "Portland, OR",
    linkedin: "linkedin.com/in/jordanrivers",
    github: "github.com/jordanrivers",
    website: "jordanrivers.fun",

    about: "Creative soul with a passion for building delightful digital experiences! I blend code and design to craft products that make people smile. When I'm not coding, you'll find me exploring new coffee shops or doodling in my sketchbook. Let's make something awesome together! ✨",

    skills: [
      "React & Vue",
      "Creative Coding",
      "UI/UX Magic",
      "Animation",
      "JavaScript",
      "TypeScript",
      "Figma Design",
      "Three.js",
      "Illustration",
      "Storytelling",
      "WebGL",
      "Motion Design"
    ],

    experience: [
      {
        title: "Creative Developer",
        company: "Pixel Playground",
        location: "Portland, OR",
        period: "2023 - Present",
        points: [
          "Created interactive experiences that increased user engagement by 65%",
          "Built award-winning animated landing pages for major brands",
          "Led creative coding workshops for the design team",
          "Developed a custom animation library used across 10+ projects"
        ]
      },
      {
        title: "Frontend Developer",
        company: "Bright Ideas Studio",
        location: "Seattle, WA",
        period: "2021 - 2023",
        points: [
          "Designed and developed playful user interfaces for web apps",
          "Collaborated with illustrators to bring designs to life with code",
          "Implemented micro-interactions that delighted 100k+ users",
          "Mentored junior developers in creative coding techniques"
        ]
      },
      {
        title: "Web Designer",
        company: "Fresh Digital",
        location: "Portland, OR",
        period: "2019 - 2021",
        points: [
          "Created vibrant, user-friendly websites for creative agencies",
          "Designed custom illustrations and animations for client projects",
          "Improved conversion rates by 40% through thoughtful UX design"
        ]
      }
    ],

    projects: [
      {
        name: "Playground.js",
        description: "An open-source creative coding library with 5k+ stars on GitHub. Makes building interactive animations fun and accessible for everyone!",
        tech: ["JavaScript", "Canvas API", "WebGL"],
        emoji: "🎨"
      },
      {
        name: "Mood Board App",
        description: "A delightful mood board tool with drag-and-drop magic. Used by 50k+ designers and creatives worldwide to organize inspiration.",
        tech: ["React", "Firebase", "Framer Motion"],
        emoji: "✨"
      },
      {
        name: "Interactive Story Platform",
        description: "Built an immersive storytelling platform where users create choose-your-own-adventure stories with animated illustrations.",
        tech: ["Vue.js", "Three.js", "Node.js"],
        emoji: "📚"
      }
    ],

    education: [
      {
        degree: "Bachelor of Fine Arts in Digital Media",
        school: "Portland Art Institute",
        location: "Portland, OR",
        year: "2019"
      }
    ]
  }

  // Use provided data or fall back to default
  // Map API data structure to template format
  const portfolioData = data ? {
    name: data.personal?.name || defaultData.name,
    title: data.personal?.title || defaultData.title,
    email: data.personal?.email || defaultData.email,
    phone: data.personal?.phone || defaultData.phone,
    location: data.personal?.location || defaultData.location,
    linkedin: data.personal?.linkedin || defaultData.linkedin,
    github: data.personal?.github || defaultData.github,
    website: data.personal?.website || defaultData.website,
    about: data.about || defaultData.about,
    skills: data.skills || defaultData.skills,
    experience: data.experience || defaultData.experience,
    projects: data.projects || defaultData.projects,
    education: data.education || defaultData.education
  } : defaultData

  return (
    <div className="spark-template">
      {/* Floating Navigation */}
      <nav className="spark-nav">
        <div className="spark-nav-content">
          <div className="spark-nav-brand">
            <span className="spark-nav-name">
              {portfolioData.name}
            </span>
          </div>

          {/* Hamburger Button */}
          <button
            className={`spark-hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="spark-hamburger-line"></span>
            <span className="spark-hamburger-line"></span>
            <span className="spark-hamburger-line"></span>
          </button>

          <div className={`spark-nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#about" className={`spark-nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
            <a href="#skills" className={`spark-nav-link ${activeSection === 'skills' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Skills
            </a>
            <a href="#experience" className={`spark-nav-link ${activeSection === 'experience' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Experience
            </a>
            <a href="#projects" className={`spark-nav-link ${activeSection === 'projects' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Projects
            </a>
            <a href="#education" className={`spark-nav-link ${activeSection === 'education' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
              Education
            </a>
          </div>
        </div>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div className="spark-mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>
        )}
      </nav>

      {/* Hero Header */}
      <header className="spark-header">
        <div className="spark-header-bg"></div>
        <div className="spark-floating-badge spark-badge-1">🚀 Creative</div>
        <div className="spark-floating-badge spark-badge-2">✨ Designer</div>
        <div className="spark-floating-badge spark-badge-3">💡 Innovator</div>
        <div className="spark-header-content">
          <div className="spark-hello">Hi there! :)</div>
          <h1 className="spark-name">
            I'm <span className="underline">{portfolioData.name}</span>.
          </h1>
          <p className="spark-title">
            <span className="spark-status-dot"></span>
            {portfolioData.title}
          </p>
          <p className="spark-about-text">{portfolioData.about}</p>
          <div className="spark-contact-grid">
            <a href={`mailto:${portfolioData.email}`} className="spark-contact-item spark-bubble-orange">
              <span className="spark-contact-icon">✉</span>
              <span>Get in touch</span>
            </a>
            <a href={`https://${portfolioData.linkedin}`} target="_blank" rel="noopener noreferrer" className="spark-contact-item spark-bubble-purple">
              <span className="spark-contact-icon">in</span>
              <span>LinkedIn</span>
            </a>
          </div>
          <div className="spark-social-bubbles">
            <a href={`https://${portfolioData.github}`} target="_blank" rel="noopener noreferrer" className="spark-bubble spark-bubble-orange">
              <span className="spark-contact-icon">💻</span>
              <span>GitHub</span>
            </a>
            <span className="spark-bubble spark-bubble-orange">
              <span className="spark-contact-icon">📱</span>
              <span>{portfolioData.phone}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="spark-main">
        {/* About Section */}
        <section id="about" className="spark-section">
          <h2 className="spark-section-title">About</h2>
          <div className="spark-about-card">
            <p className="spark-about-text">{portfolioData.about}</p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="spark-section spark-section-alt">
          <h2 className="spark-section-title">Superpowers</h2>
          <div className="spark-skills-grid">
            {portfolioData.skills.map((skill, index) => (
              <div key={index} className="spark-skill-bubble">
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="spark-section">
          <h2 className="spark-section-title">Journey</h2>
          <div className="spark-timeline">
            {portfolioData.experience.map((job, index) => (
              <div key={index} className="spark-timeline-item">
                <div className="spark-timeline-dot"></div>
                <div className="spark-experience-card">
                  <div className="spark-job-header">
                    <div>
                      <h3 className="spark-job-title">{job.title}</h3>
                      <p className="spark-job-company">{job.company} · {job.location}</p>
                    </div>
                    <span className="spark-job-period">{job.period}</span>
                  </div>
                  <ul className="spark-job-points">
                    {job.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="spark-section spark-section-alt">
          <h2 className="spark-section-title">Projects</h2>
          <div className="spark-projects-grid">
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="spark-project-card">
                <div className="spark-project-emoji">{project.emoji}</div>
                <h3 className="spark-project-name">{project.name}</h3>
                <p className="spark-project-description">{project.description}</p>
                <div className="spark-project-tech">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="spark-tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="spark-section">
          <h2 className="spark-section-title">Education</h2>
          {portfolioData.education.map((edu, index) => (
            <div key={index} className="spark-education-card">
              <div>
                <h3 className="spark-education-degree">{edu.degree}</h3>
                <p className="spark-education-school">{edu.school} · {edu.location}</p>
              </div>
              <div className="spark-education-year">
                <span>Class of {edu.year}</span>
                <span>GPA: 4.0/4.0</span>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="spark-footer">
        <p>Made with ❤️ by {portfolioData.name} • © 2024</p>
        <p className="spark-footer-tagline">Let's create something amazing together!</p>
      </footer>
    </div>
  )
}

export default Spark
