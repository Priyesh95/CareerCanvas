/**
 * Export utility for generating standalone HTML portfolios
 *
 * This module handles the conversion of portfolio data and templates
 * into downloadable, standalone HTML files with embedded CSS.
 */

// Import template CSS files (these will be bundled by Vite)
import auroraCSS from '../templates/Aurora/Aurora.css?raw';
import nebulaCSS from '../templates/Nebula/Nebula.css?raw';
import sparkCSS from '../templates/Spark/Spark.css?raw';

/**
 * Generate HTML for Aurora template
 */
function generateAuroraHTML(data) {
  // Extract personal info from nested structure
  const personal = data.personal || {};
  const name = personal.name || 'Your Name';
  const title = personal.title || 'Your Title';
  const email = personal.email || 'your.email@example.com';
  const phone = personal.phone || '+1 (555) 123-4567';
  const location = personal.location || 'Your Location';
  const linkedin = personal.linkedin || '';
  const github = personal.github || '';
  const website = personal.website || '';

  const about = data.about || 'Your professional bio will appear here.';
  const skills = data.skills || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || [];

  return `
    <div class="aurora-template">
      <!-- Navigation -->
      <nav class="aurora-nav">
        <div class="aurora-nav-content">
          <span class="aurora-nav-name">${name}</span>
          <div class="aurora-nav-links">
            <a href="#about" class="aurora-nav-link">About</a>
            <a href="#skills" class="aurora-nav-link">Skills</a>
            <a href="#experience" class="aurora-nav-link">Experience</a>
            <a href="#projects" class="aurora-nav-link">Projects</a>
            <a href="#education" class="aurora-nav-link">Education</a>
          </div>
        </div>
      </nav>

      <!-- Header Section -->
      <header class="aurora-header">
        <div class="aurora-header-content">
          <h1 class="aurora-name">${name}</h1>
          <p class="aurora-title">${title}</p>
          <div class="aurora-contact-links">
            <a href="mailto:${email}" class="aurora-link">
              <svg class="aurora-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              ${email}
            </a>
            <a href="tel:${phone}" class="aurora-link">
              <svg class="aurora-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              ${phone}
            </a>
            <span class="aurora-link">
              <svg class="aurora-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              ${location}
            </span>
          </div>
          <div class="aurora-social-links">
            ${linkedin ? `<a href="https://${linkedin}" target="_blank" rel="noopener noreferrer" class="aurora-social-link">LinkedIn</a>` : ''}
            ${github ? `<a href="https://${github}" target="_blank" rel="noopener noreferrer" class="aurora-social-link">GitHub</a>` : ''}
            ${website ? `<a href="https://${website}" target="_blank" rel="noopener noreferrer" class="aurora-social-link">Website</a>` : ''}
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="aurora-main">
        <!-- About Section -->
        ${about ? `
        <section id="about" class="aurora-section">
          <h2 class="aurora-section-title">About Me</h2>
          <p class="aurora-about-text">${about}</p>
        </section>
        ` : ''}

        <!-- Skills Section -->
        ${skills.length > 0 ? `
        <section id="skills" class="aurora-section">
          <h2 class="aurora-section-title">Skills</h2>
          <div class="aurora-skills-grid">
            ${skills.map(skill => `<span class="aurora-skill-tag">${skill}</span>`).join('')}
          </div>
        </section>
        ` : ''}

        <!-- Experience Section -->
        ${experience.length > 0 ? `
        <section id="experience" class="aurora-section">
          <h2 class="aurora-section-title">Experience</h2>
          <div class="aurora-timeline">
            ${experience.map(job => `
              <div class="aurora-timeline-item">
                <div class="aurora-timeline-marker"></div>
                <div class="aurora-timeline-content">
                  <div class="aurora-job-header">
                    <h3 class="aurora-job-title">${job.title}</h3>
                    <span class="aurora-job-period">${job.period}</span>
                  </div>
                  <p class="aurora-job-company">${job.company}${job.location ? ` • ${job.location}` : ''}</p>
                  ${job.points && job.points.length > 0 ? `
                    <ul class="aurora-job-points">
                      ${job.points.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </section>
        ` : ''}

        <!-- Projects Section -->
        ${projects.length > 0 ? `
        <section id="projects" class="aurora-section">
          <h2 class="aurora-section-title">Projects</h2>
          <div class="aurora-projects-grid">
            ${projects.map(project => `
              <div class="aurora-project-card">
                <h3 class="aurora-project-name">${project.name}</h3>
                <p class="aurora-project-description">${project.description}</p>
                ${project.tech && project.tech.length > 0 ? `
                  <div class="aurora-project-tech">
                    ${project.tech.map(tech => `<span class="aurora-tech-tag">${tech}</span>`).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </section>
        ` : ''}

        <!-- Education Section -->
        ${education.length > 0 ? `
        <section id="education" class="aurora-section">
          <h2 class="aurora-section-title">Education</h2>
          ${education.map(edu => `
            <div class="aurora-education-item">
              <h3 class="aurora-education-degree">${edu.degree}</h3>
              <p class="aurora-education-school">${edu.school}${edu.location ? ` • ${edu.location}` : ''}</p>
              <p class="aurora-education-year">Graduated ${edu.year}</p>
            </div>
          `).join('')}
        </section>
        ` : ''}
      </main>

      <!-- Footer -->
      <footer class="aurora-footer">
        <p>© ${new Date().getFullYear()} ${name}. All rights reserved.</p>
      </footer>
    </div>
  `;
}

/**
 * Generate HTML for Nebula template
 */
function generateNebulaHTML(data) {
  // Extract personal info from nested structure
  const personal = data.personal || {};
  const name = personal.name || 'Your Name';
  const title = personal.title || 'Your Title';
  const email = personal.email || 'your.email@example.com';
  const phone = personal.phone || '+1 (555) 123-4567';
  const location = personal.location || 'Your Location';
  const linkedin = personal.linkedin || '';
  const github = personal.github || '';
  const website = personal.website || '';

  const about = data.about || 'Your professional bio will appear here.';
  const skills = data.skills || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || [];

  return `
    <div class="nebula-template">
      <!-- Navigation -->
      <nav class="nebula-nav">
        <div class="nebula-nav-content">
          <span class="nebula-nav-name">${name}</span>
          <div class="nebula-nav-items">
            <a href="#about" class="nebula-nav-item">
              <span class="nebula-nav-bullet"></span>
              <span class="nebula-nav-label">About</span>
            </a>
            <a href="#skills" class="nebula-nav-item">
              <span class="nebula-nav-bullet"></span>
              <span class="nebula-nav-label">Skills</span>
            </a>
            <a href="#experience" class="nebula-nav-item">
              <span class="nebula-nav-bullet"></span>
              <span class="nebula-nav-label">Experience</span>
            </a>
            <a href="#projects" class="nebula-nav-item">
              <span class="nebula-nav-bullet"></span>
              <span class="nebula-nav-label">Projects</span>
            </a>
            <a href="#education" class="nebula-nav-item">
              <span class="nebula-nav-bullet"></span>
              <span class="nebula-nav-label">Education</span>
            </a>
          </div>
        </div>
      </nav>

      <!-- Header Section -->
      <header class="nebula-header">
        <div class="nebula-header-content">
          <h1 class="nebula-name">${name}</h1>
          <p class="nebula-title">${title}</p>
          <div class="nebula-contact-links">
            <a href="mailto:${email}" class="nebula-link">
              <svg class="nebula-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              ${email}
            </a>
            <a href="tel:${phone}" class="nebula-link">
              <svg class="nebula-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              ${phone}
            </a>
            <span class="nebula-link">
              <svg class="nebula-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              ${location}
            </span>
          </div>
          <div class="nebula-social-links">
            ${linkedin ? `
            <a href="https://${linkedin}" target="_blank" rel="noopener noreferrer" class="nebula-social-link">
              <svg class="nebula-social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            ` : ''}
            ${github ? `
            <a href="https://${github}" target="_blank" rel="noopener noreferrer" class="nebula-social-link">
              <svg class="nebula-social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            ` : ''}
            ${website ? `
            <a href="https://${website}" target="_blank" rel="noopener noreferrer" class="nebula-social-link">
              <svg class="nebula-social-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </a>
            ` : ''}
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="nebula-main">
        <!-- About Section -->
        ${about ? `
        <section id="about" class="nebula-section">
          <h2 class="nebula-section-title">
            <span class="nebula-title-accent"></span>
            About Me
          </h2>
          <p class="nebula-about-text">${about}</p>
        </section>
        ` : ''}

        <!-- Skills Section -->
        ${skills.length > 0 ? `
        <section id="skills" class="nebula-section">
          <h2 class="nebula-section-title">
            <span class="nebula-title-accent"></span>
            Skills
          </h2>
          <div class="nebula-skills-grid">
            ${skills.map(skill => `
              <div class="nebula-skill-tag">
                <span class="nebula-skill-dot"></span>
                ${skill}
              </div>
            `).join('')}
          </div>
        </section>
        ` : ''}

        <!-- Experience Section -->
        ${experience.length > 0 ? `
        <section id="experience" class="nebula-section">
          <h2 class="nebula-section-title">
            <span class="nebula-title-accent"></span>
            Experience
          </h2>
          <div class="nebula-timeline">
            ${experience.map((job, index) => `
              <div class="nebula-timeline-item">
                ${index < experience.length - 1 ? '<div class="nebula-timeline-line"></div>' : ''}
                <div class="nebula-timeline-marker"></div>
                <div class="nebula-timeline-content">
                  <div class="nebula-job-header">
                    <div>
                      <h3 class="nebula-job-title">${job.title}</h3>
                      <p class="nebula-job-company">${job.company}</p>
                    </div>
                    <span class="nebula-job-period">${job.period}</span>
                  </div>
                  ${job.points && job.points.length > 0 ? `
                    <ul class="nebula-job-points">
                      ${job.points.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </section>
        ` : ''}

        <!-- Projects Section -->
        ${projects.length > 0 ? `
        <section id="projects" class="nebula-section">
          <h2 class="nebula-section-title">
            <span class="nebula-title-accent"></span>
            Projects
          </h2>
          <div class="nebula-projects-grid">
            ${projects.map(project => `
              <div class="nebula-project-card">
                <div class="nebula-project-header">
                  <div class="nebula-project-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 class="nebula-project-name">${project.name}</h3>
                </div>
                <p class="nebula-project-description">${project.description}</p>
                ${project.tech && project.tech.length > 0 ? `
                  <div class="nebula-project-tech">
                    ${project.tech.map(tech => `<span class="nebula-tech-tag">${tech}</span>`).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </section>
        ` : ''}

        <!-- Education Section -->
        ${education.length > 0 ? `
        <section id="education" class="nebula-section">
          <h2 class="nebula-section-title">
            <span class="nebula-title-accent"></span>
            Education
          </h2>
          ${education.map(edu => `
            <div class="nebula-education-item">
              <div class="nebula-education-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                </svg>
              </div>
              <div>
                <h3 class="nebula-education-degree">${edu.degree}</h3>
                <p class="nebula-education-school">${edu.school}</p>
                <p class="nebula-education-year">${edu.year}</p>
              </div>
            </div>
          `).join('')}
        </section>
        ` : ''}
      </main>

      <!-- Footer -->
      <footer class="nebula-footer">
        <div class="nebula-footer-line"></div>
        <p>© ${new Date().getFullYear()} ${name}. All rights reserved.</p>
      </footer>
    </div>
  `;
}

/**
 * Generate HTML for Spark template
 */
function generateSparkHTML(data) {
  // Extract personal info from nested structure
  const personal = data.personal || {};
  const name = personal.name || 'Your Name';
  const title = personal.title || 'Your Title';
  const email = personal.email || 'your.email@example.com';
  const phone = personal.phone || '+1 (555) 123-4567';
  const location = personal.location || 'Your Location';
  const linkedin = personal.linkedin || '';
  const github = personal.github || '';
  const website = personal.website || '';

  const about = data.about || 'Your professional bio will appear here.';
  const skills = data.skills || [];
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || [];

  return `
    <div class="spark-template">
      <!-- Navigation -->
      <nav class="spark-nav">
        <div class="spark-nav-content">
          <div class="spark-nav-brand">
            <span class="spark-nav-name">${name}</span>
          </div>
          <div class="spark-nav-links">
            <a href="#about" class="spark-nav-link">About</a>
            <a href="#skills" class="spark-nav-link">Skills</a>
            <a href="#experience" class="spark-nav-link">Experience</a>
            <a href="#projects" class="spark-nav-link">Projects</a>
            <a href="#education" class="spark-nav-link">Education</a>
          </div>
        </div>
      </nav>

      <!-- Hero Header -->
      <header class="spark-header">
        <div class="spark-header-bg"></div>
        <div class="spark-floating-badge spark-badge-1">🚀 Creative</div>
        <div class="spark-floating-badge spark-badge-2">✨ Designer</div>
        <div class="spark-floating-badge spark-badge-3">💡 Innovator</div>
        <div class="spark-header-content">
          <div class="spark-hello">Hi there! :)</div>
          <h1 class="spark-name">
            I'm <span class="underline">${name}</span>.
          </h1>
          <p class="spark-title">
            <span class="spark-status-dot"></span>
            ${title}
          </p>
          <p class="spark-about-text">${about}</p>
          <div class="spark-contact-grid">
            <a href="mailto:${email}" class="spark-contact-item spark-bubble-orange">
              <span class="spark-contact-icon">✉</span>
              <span>Get in touch</span>
            </a>
            ${linkedin ? `
            <a href="https://${linkedin}" target="_blank" rel="noopener noreferrer" class="spark-contact-item spark-bubble-purple">
              <span class="spark-contact-icon">in</span>
              <span>LinkedIn</span>
            </a>
            ` : ''}
          </div>
          <div class="spark-social-bubbles">
            ${github ? `
            <a href="https://${github}" target="_blank" rel="noopener noreferrer" class="spark-bubble spark-bubble-orange">
              <span class="spark-contact-icon">💻</span>
              <span>GitHub</span>
            </a>
            ` : ''}
            ${phone ? `
            <span class="spark-bubble spark-bubble-orange">
              <span class="spark-contact-icon">📱</span>
              <span>${phone}</span>
            </span>
            ` : ''}
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="spark-main">
        <!-- About Section -->
        <section id="about" class="spark-section">
          <h2 class="spark-section-title">About</h2>
          <div class="spark-about-card">
            <p class="spark-about-text">${about}</p>
          </div>
        </section>

        <!-- Skills Section -->
        ${skills.length > 0 ? `
        <section id="skills" class="spark-section spark-section-alt">
          <h2 class="spark-section-title">Superpowers</h2>
          <div class="spark-skills-grid">
            ${skills.map(skill => `<div class="spark-skill-bubble">${skill}</div>`).join('')}
          </div>
        </section>
        ` : ''}

        <!-- Experience Section -->
        ${experience.length > 0 ? `
        <section id="experience" class="spark-section">
          <h2 class="spark-section-title">Journey</h2>
          <div class="spark-timeline">
            ${experience.map(job => `
              <div class="spark-timeline-item">
                <div class="spark-timeline-dot"></div>
                <div class="spark-experience-card">
                  <div class="spark-job-header">
                    <div>
                      <h3 class="spark-job-title">${job.title}</h3>
                      <p class="spark-job-company">${job.company}${job.location ? ` · ${job.location}` : ''}</p>
                    </div>
                    <span class="spark-job-period">${job.period}</span>
                  </div>
                  ${job.points && job.points.length > 0 ? `
                    <ul class="spark-job-points">
                      ${job.points.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </section>
        ` : ''}

        <!-- Projects Section -->
        ${projects.length > 0 ? `
        <section id="projects" class="spark-section spark-section-alt">
          <h2 class="spark-section-title">Projects</h2>
          <div class="spark-projects-grid">
            ${projects.map(project => `
              <div class="spark-project-card">
                ${project.emoji ? `<div class="spark-project-emoji">${project.emoji}</div>` : '<div class="spark-project-emoji">🚀</div>'}
                <h3 class="spark-project-name">${project.name}</h3>
                <p class="spark-project-description">${project.description}</p>
                ${project.tech && project.tech.length > 0 ? `
                  <div class="spark-project-tech">
                    ${project.tech.map(tech => `<span class="spark-tech-badge">${tech}</span>`).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </section>
        ` : ''}

        <!-- Education Section -->
        ${education.length > 0 ? `
        <section id="education" class="spark-section">
          <h2 class="spark-section-title">Education</h2>
          ${education.map(edu => `
            <div class="spark-education-card">
              <div>
                <h3 class="spark-education-degree">${edu.degree}</h3>
                <p class="spark-education-school">${edu.school}${edu.location ? ` · ${edu.location}` : ''}</p>
              </div>
              <div class="spark-education-year">
                <span>Class of ${edu.year}</span>
                ${edu.gpa ? `<span>GPA: ${edu.gpa}</span>` : ''}
              </div>
            </div>
          `).join('')}
        </section>
        ` : ''}
      </main>

      <!-- Footer -->
      <footer class="spark-footer">
        <p>Made with ❤️ by ${name} • © ${new Date().getFullYear()}</p>
        <p class="spark-footer-tagline">Let's create something amazing together!</p>
      </footer>
    </div>
  `;
}

/**
 * Get CSS for a specific template
 */
function getTemplateCSS(templateId) {
  switch (templateId) {
    case 'aurora':
      return auroraCSS;
    case 'nebula':
      return nebulaCSS;
    case 'spark':
      return sparkCSS;
    default:
      return sparkCSS;
  }
}

/**
 * Generate HTML for a specific template
 */
function getTemplateHTML(templateId, data) {
  switch (templateId) {
    case 'aurora':
      return generateAuroraHTML(data);
    case 'nebula':
      return generateNebulaHTML(data);
    case 'spark':
      return generateSparkHTML(data);
    default:
      return generateSparkHTML(data);
  }
}

/**
 * Generate complete standalone HTML document
 */
export function generateStandaloneHTML(templateId, data) {
  const css = getTemplateCSS(templateId);
  const html = getTemplateHTML(templateId, data);

  // Extract name from personal object
  const name = (data.personal && data.personal.name) || 'Portfolio';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${name} - Professional Portfolio">
  <meta name="author" content="${name}">
  <title>${name} - Portfolio</title>
  <style>
    /* Reset and Base Styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.6;
    }

    /* Template Styles */
    ${css}

    /* Smooth Scroll */
    html {
      scroll-behavior: smooth;
    }
  </style>
  <script>
    // Scroll tracking for navigation
    document.addEventListener('DOMContentLoaded', function() {
      // Support Nebula, Aurora, and Spark templates
      const nebulaNavItems = document.querySelectorAll('.nebula-nav-item');
      const auroraNavLinks = document.querySelectorAll('.aurora-nav-link');
      const sparkNavLinks = document.querySelectorAll('.spark-nav-link');

      if (nebulaNavItems.length > 0) {
        // Nebula template scroll tracking
        function updateNebulaActiveNav() {
          const sections = ['about', 'skills', 'experience', 'projects', 'education'];
          const scrollPosition = window.scrollY + 200;

          for (const sectionId of sections) {
            const element = document.getElementById(sectionId);
            if (element) {
              const offsetTop = element.offsetTop;
              const offsetHeight = element.offsetHeight;

              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                nebulaNavItems.forEach(item => item.classList.remove('active'));
                const activeNavItem = document.querySelector(\`.nebula-nav-item[href="#\${sectionId}"]\`);
                if (activeNavItem) {
                  activeNavItem.classList.add('active');
                }
                break;
              }
            }
          }
        }

        window.addEventListener('scroll', updateNebulaActiveNav);
        updateNebulaActiveNav();
      }

      if (auroraNavLinks.length > 0) {
        // Aurora template scroll tracking
        function updateAuroraActiveNav() {
          const sections = ['about', 'skills', 'experience', 'projects', 'education'];
          const scrollPosition = window.scrollY + 200;

          for (const sectionId of sections) {
            const element = document.getElementById(sectionId);
            if (element) {
              const offsetTop = element.offsetTop;
              const offsetHeight = element.offsetHeight;

              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                auroraNavLinks.forEach(link => link.classList.remove('active'));
                const activeNavLink = document.querySelector(\`.aurora-nav-link[href="#\${sectionId}"]\`);
                if (activeNavLink) {
                  activeNavLink.classList.add('active');
                }
                break;
              }
            }
          }
        }

        window.addEventListener('scroll', updateAuroraActiveNav);
        updateAuroraActiveNav();
      }

      if (sparkNavLinks.length > 0) {
        // Spark template scroll tracking
        function updateSparkActiveNav() {
          const sections = ['about', 'skills', 'experience', 'projects', 'education'];
          const scrollPosition = window.scrollY + 200;

          for (const sectionId of sections) {
            const element = document.getElementById(sectionId);
            if (element) {
              const offsetTop = element.offsetTop;
              const offsetHeight = element.offsetHeight;

              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                sparkNavLinks.forEach(link => link.classList.remove('active'));
                const activeNavLink = document.querySelector(\`.spark-nav-link[href="#\${sectionId}"]\`);
                if (activeNavLink) {
                  activeNavLink.classList.add('active');
                }
                break;
              }
            }
          }
        }

        window.addEventListener('scroll', updateSparkActiveNav);
        updateSparkActiveNav();
      }
    });
  </script>
</head>
<body>
  ${html}
</body>
</html>`;
}

/**
 * Download HTML as a file
 */
export function downloadHTML(templateId, data) {
  try {
    const htmlContent = generateStandaloneHTML(templateId, data);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Create download link
    const link = document.createElement('a');

    // Extract name from personal object
    const name = (data.personal && data.personal.name) || 'portfolio';

    // Generate filename: convert to lowercase, replace spaces with hyphens, remove special chars
    const cleanName = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')          // Replace spaces with hyphens
      .replace(/-+/g, '-')           // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, '');        // Remove leading/trailing hyphens

    const fileName = `${cleanName}-portfolio.html`;
    link.href = url;
    link.download = fileName;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Download failed:', error);
    return false;
  }
}
