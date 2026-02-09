import { useState, useEffect } from 'react'
import './Nebula.css'

function Nebula({ data }) {
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
    handleScroll() // Call once to set initial active section

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Default sample data for standalone viewing
  const defaultData = {
    name: "Alex Chen",
    title: "Full Stack Software Engineer",
    email: "alex.chen@email.com",
    phone: "+1 (555) 987-6543",
    location: "Seattle, WA",
    linkedin: "linkedin.com/in/alexchen",
    github: "github.com/alexchen",
    website: "alexchen.dev",

    about: "Results-driven software engineer with 7+ years of experience building scalable web applications and distributed systems. Passionate about writing clean, efficient code and solving complex technical challenges. Strong advocate for best practices, code quality, and continuous learning.",

    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "AWS",
      "Docker",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
      "REST APIs",
      "CI/CD"
    ],

    experience: [
      {
        title: "Senior Software Engineer",
        company: "CloudScale Technologies",
        location: "Seattle, WA",
        period: "Mar 2022 - Present",
        points: [
          "Architected and implemented microservices infrastructure serving 5M+ daily active users",
          "Reduced system latency by 40% through database optimization and caching strategies",
          "Led a team of 5 engineers in developing a real-time analytics platform",
          "Established code review processes and engineering best practices across the organization"
        ]
      },
      {
        title: "Software Engineer",
        company: "DataFlow Systems",
        location: "San Francisco, CA",
        period: "Jun 2020 - Feb 2022",
        points: [
          "Built and maintained RESTful APIs serving 50,000+ requests per minute",
          "Implemented automated testing framework, increasing code coverage from 45% to 85%",
          "Collaborated with product and design teams to ship 20+ features",
          "Mentored junior engineers and conducted technical interviews"
        ]
      },
      {
        title: "Junior Software Engineer",
        company: "InnovateTech",
        location: "Austin, TX",
        period: "Jul 2018 - May 2020",
        points: [
          "Developed responsive web applications using React and Node.js",
          "Integrated third-party APIs and payment processing systems",
          "Participated in agile development practices including daily standups and sprint planning"
        ]
      }
    ],

    projects: [
      {
        name: "Real-time Collaboration Platform",
        description: "Built a WebSocket-based collaboration platform enabling 10,000+ concurrent users to work together seamlessly with sub-100ms latency.",
        tech: ["Node.js", "WebSockets", "Redis", "React"]
      },
      {
        name: "E-commerce Microservices",
        description: "Architected and deployed a scalable e-commerce system using microservices, handling $2M+ in monthly transactions.",
        tech: ["AWS", "Docker", "Kubernetes", "PostgreSQL"]
      },
      {
        name: "AI-Powered Code Review Tool",
        description: "Created an automated code review tool using machine learning to detect bugs and suggest improvements, adopted by 500+ developers.",
        tech: ["Python", "TensorFlow", "GraphQL", "MongoDB"]
      }
    ],

    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of Washington",
        location: "Seattle, WA",
        year: "2018"
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
    <div className="nebula-template">
      {/* Sticky Navigation */}
      <nav className="nebula-nav">
        <div className="nebula-nav-content">
          <span className="nebula-nav-name">{portfolioData.name}</span>

          {/* Hamburger Button */}
          <button
            className={`nebula-hamburger ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="nebula-hamburger-line"></span>
            <span className="nebula-hamburger-line"></span>
            <span className="nebula-hamburger-line"></span>
          </button>

          <div className={`nebula-nav-items ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#about" className={`nebula-nav-item ${activeSection === 'about' ? 'active' : ''}`} title="About" onClick={() => setMobileMenuOpen(false)}>
              <span className="nebula-nav-bullet"></span>
              <span className="nebula-nav-label">About</span>
            </a>
            <a href="#skills" className={`nebula-nav-item ${activeSection === 'skills' ? 'active' : ''}`} title="Skills" onClick={() => setMobileMenuOpen(false)}>
              <span className="nebula-nav-bullet"></span>
              <span className="nebula-nav-label">Skills</span>
            </a>
            <a href="#experience" className={`nebula-nav-item ${activeSection === 'experience' ? 'active' : ''}`} title="Experience" onClick={() => setMobileMenuOpen(false)}>
              <span className="nebula-nav-bullet"></span>
              <span className="nebula-nav-label">Experience</span>
            </a>
            <a href="#projects" className={`nebula-nav-item ${activeSection === 'projects' ? 'active' : ''}`} title="Projects" onClick={() => setMobileMenuOpen(false)}>
              <span className="nebula-nav-bullet"></span>
              <span className="nebula-nav-label">Projects</span>
            </a>
            <a href="#education" className={`nebula-nav-item ${activeSection === 'education' ? 'active' : ''}`} title="Education" onClick={() => setMobileMenuOpen(false)}>
              <span className="nebula-nav-bullet"></span>
              <span className="nebula-nav-label">Education</span>
            </a>
          </div>
        </div>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div className="nebula-mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>
        )}
      </nav>

      {/* Header Section */}
      <header className="nebula-header">
        <div className="nebula-header-content">
          <h1 className="nebula-name">{portfolioData.name}</h1>
          <p className="nebula-title">{portfolioData.title}</p>
          <div className="nebula-contact-links">
            <a href={`mailto:${portfolioData.email}`} className="nebula-link">
              <svg className="nebula-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {portfolioData.email}
            </a>
            <a href={`tel:${portfolioData.phone}`} className="nebula-link">
              <svg className="nebula-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {portfolioData.phone}
            </a>
            <span className="nebula-link">
              <svg className="nebula-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {portfolioData.location}
            </span>
          </div>
          <div className="nebula-social-links">
            <a href={`https://${portfolioData.linkedin}`} target="_blank" rel="noopener noreferrer" className="nebula-social-link">
              <svg className="nebula-social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href={`https://${portfolioData.github}`} target="_blank" rel="noopener noreferrer" className="nebula-social-link">
              <svg className="nebula-social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href={`https://${portfolioData.website}`} target="_blank" rel="noopener noreferrer" className="nebula-social-link">
              <svg className="nebula-social-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="nebula-main">
        {/* About Section */}
        <section id="about" className="nebula-section">
          <h2 className="nebula-section-title">
            <span className="nebula-title-accent"></span>
            About Me
          </h2>
          <p className="nebula-about-text">{portfolioData.about}</p>
        </section>

        {/* Skills Section */}
        <section id="skills" className="nebula-section">
          <h2 className="nebula-section-title">
            <span className="nebula-title-accent"></span>
            Skills
          </h2>
          <div className="nebula-skills-grid">
            {portfolioData.skills.map((skill, index) => (
              <div key={index} className="nebula-skill-tag">
                <span className="nebula-skill-dot"></span>
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="nebula-section">
          <h2 className="nebula-section-title">
            <span className="nebula-title-accent"></span>
            Experience
          </h2>
          <div className="nebula-timeline">
            {portfolioData.experience.map((job, index) => (
              <div key={index} className="nebula-timeline-item">
                <div className="nebula-timeline-line"></div>
                <div className="nebula-timeline-marker"></div>
                <div className="nebula-timeline-content">
                  <div className="nebula-job-header">
                    <div>
                      <h3 className="nebula-job-title">{job.title}</h3>
                      <p className="nebula-job-company">{job.company} • {job.location}</p>
                    </div>
                    <span className="nebula-job-period">{job.period}</span>
                  </div>
                  <ul className="nebula-job-points">
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
        <section id="projects" className="nebula-section">
          <h2 className="nebula-section-title">
            <span className="nebula-title-accent"></span>
            Projects
          </h2>
          <div className="nebula-projects-grid">
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="nebula-project-card">
                <div className="nebula-project-header">
                  <div className="nebula-project-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="nebula-project-name">{project.name}</h3>
                </div>
                <p className="nebula-project-description">{project.description}</p>
                <div className="nebula-project-tech">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="nebula-tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="nebula-section">
          <h2 className="nebula-section-title">
            <span className="nebula-title-accent"></span>
            Education
          </h2>
          {portfolioData.education.map((edu, index) => (
            <div key={index} className="nebula-education-item">
              <div className="nebula-education-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <div>
                <h3 className="nebula-education-degree">{edu.degree}</h3>
                <p className="nebula-education-school">{edu.school} • {edu.location}</p>
                <p className="nebula-education-year">Graduated {edu.year}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="nebula-footer">
        <div className="nebula-footer-line"></div>
        <p>© 2024 {portfolioData.name}. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Nebula
