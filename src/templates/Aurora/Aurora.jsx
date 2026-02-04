import { useState, useEffect } from 'react'
import './Aurora.css'

function Aurora() {
  const [activeSection, setActiveSection] = useState('about')

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
    handleScroll() // Call once to set initial active section

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const portfolioData = {
    name: "Sarah Mitchell",
    title: "Senior Product Designer",
    email: "sarah.mitchell@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/sarahmitchell",
    github: "github.com/sarahmitchell",
    website: "sarahmitchell.design",

    about: "Passionate product designer with 6+ years of experience crafting user-centered digital experiences. I specialize in creating intuitive interfaces that solve complex problems while maintaining aesthetic excellence. My approach combines strategic thinking with meticulous attention to detail.",

    skills: [
      "UI/UX Design",
      "Figma",
      "Adobe Creative Suite",
      "Prototyping",
      "User Research",
      "Design Systems",
      "Wireframing",
      "Interaction Design",
      "Responsive Design",
      "HTML/CSS"
    ],

    experience: [
      {
        title: "Senior Product Designer",
        company: "TechVision Inc.",
        location: "San Francisco, CA",
        period: "Jan 2022 - Present",
        points: [
          "Led design initiatives for the company's flagship product, increasing user engagement by 45%",
          "Established and maintained a comprehensive design system used across 8 product teams",
          "Mentored 3 junior designers and conducted weekly design critiques"
        ]
      },
      {
        title: "Product Designer",
        company: "StartupLabs",
        location: "San Francisco, CA",
        period: "Mar 2020 - Dec 2021",
        points: [
          "Designed and shipped 12+ features from concept to production",
          "Conducted user research sessions with 50+ participants to inform design decisions",
          "Collaborated with engineering teams to ensure pixel-perfect implementation"
        ]
      },
      {
        title: "UI Designer",
        company: "Creative Solutions",
        location: "Los Angeles, CA",
        period: "Jun 2018 - Feb 2020",
        points: [
          "Created user interfaces for web and mobile applications",
          "Developed interactive prototypes for client presentations",
          "Worked with clients across healthcare, finance, and e-commerce sectors"
        ]
      }
    ],

    projects: [
      {
        name: "E-commerce Dashboard Redesign",
        description: "Redesigned the analytics dashboard for a major e-commerce platform, improving data visibility and reducing time-to-insight by 60%.",
        tech: ["Figma", "User Research", "Prototyping"]
      },
      {
        name: "Mobile Banking App",
        description: "Designed a mobile-first banking experience focused on simplicity and security, serving over 100,000 active users.",
        tech: ["Mobile Design", "Design System", "Accessibility"]
      },
      {
        name: "SaaS Onboarding Flow",
        description: "Created an intuitive onboarding experience that increased user activation rate by 35% and reduced support tickets by 40%.",
        tech: ["UX Design", "A/B Testing", "Animation"]
      }
    ],

    education: [
      {
        degree: "Bachelor of Fine Arts in Design",
        school: "Rhode Island School of Design",
        location: "Providence, RI",
        year: "2018"
      }
    ]
  }

  return (
    <div className="aurora-template">
      {/* Navigation */}
      <nav className="aurora-nav">
        <div className="aurora-nav-content">
          <span className="aurora-nav-name">{portfolioData.name}</span>
          <div className="aurora-nav-links">
            <a href="#about" className={`aurora-nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</a>
            <a href="#skills" className={`aurora-nav-link ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a>
            <a href="#experience" className={`aurora-nav-link ${activeSection === 'experience' ? 'active' : ''}`}>Experience</a>
            <a href="#projects" className={`aurora-nav-link ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a>
            <a href="#education" className={`aurora-nav-link ${activeSection === 'education' ? 'active' : ''}`}>Education</a>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <header className="aurora-header">
        <div className="aurora-header-content">
          <h1 className="aurora-name">{portfolioData.name}</h1>
          <p className="aurora-title">{portfolioData.title}</p>
          <div className="aurora-contact-links">
            <a href={`mailto:${portfolioData.email}`} className="aurora-link">
              <svg className="aurora-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {portfolioData.email}
            </a>
            <a href={`tel:${portfolioData.phone}`} className="aurora-link">
              <svg className="aurora-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {portfolioData.phone}
            </a>
            <span className="aurora-link">
              <svg className="aurora-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {portfolioData.location}
            </span>
          </div>
          <div className="aurora-social-links">
            <a href={`https://${portfolioData.linkedin}`} target="_blank" rel="noopener noreferrer" className="aurora-social-link">LinkedIn</a>
            <a href={`https://${portfolioData.github}`} target="_blank" rel="noopener noreferrer" className="aurora-social-link">GitHub</a>
            <a href={`https://${portfolioData.website}`} target="_blank" rel="noopener noreferrer" className="aurora-social-link">Website</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="aurora-main">
        {/* About Section */}
        <section id="about" className="aurora-section">
          <h2 className="aurora-section-title">About Me</h2>
          <p className="aurora-about-text">{portfolioData.about}</p>
        </section>

        {/* Skills Section */}
        <section id="skills" className="aurora-section">
          <h2 className="aurora-section-title">Skills</h2>
          <div className="aurora-skills-grid">
            {portfolioData.skills.map((skill, index) => (
              <span key={index} className="aurora-skill-tag">{skill}</span>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="aurora-section">
          <h2 className="aurora-section-title">Experience</h2>
          <div className="aurora-timeline">
            {portfolioData.experience.map((job, index) => (
              <div key={index} className="aurora-timeline-item">
                <div className="aurora-timeline-marker"></div>
                <div className="aurora-timeline-content">
                  <div className="aurora-job-header">
                    <h3 className="aurora-job-title">{job.title}</h3>
                    <span className="aurora-job-period">{job.period}</span>
                  </div>
                  <p className="aurora-job-company">{job.company} • {job.location}</p>
                  <ul className="aurora-job-points">
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
        <section id="projects" className="aurora-section">
          <h2 className="aurora-section-title">Projects</h2>
          <div className="aurora-projects-grid">
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="aurora-project-card">
                <h3 className="aurora-project-name">{project.name}</h3>
                <p className="aurora-project-description">{project.description}</p>
                <div className="aurora-project-tech">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="aurora-tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="aurora-section">
          <h2 className="aurora-section-title">Education</h2>
          {portfolioData.education.map((edu, index) => (
            <div key={index} className="aurora-education-item">
              <h3 className="aurora-education-degree">{edu.degree}</h3>
              <p className="aurora-education-school">{edu.school} • {edu.location}</p>
              <p className="aurora-education-year">Graduated {edu.year}</p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="aurora-footer">
        <p>© 2024 {portfolioData.name}. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Aurora
