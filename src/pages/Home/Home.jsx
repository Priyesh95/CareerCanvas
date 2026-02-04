import { Link } from 'react-router-dom'
import Container from '../../components/Container/Container'
import Button from '../../components/Button/Button'
import AuroraImage from '../../assets/Aurora.png'
import NebulaImage from '../../assets/Nebula.png'
import SparkImage from '../../assets/Spark.png'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <Container>
          <div className="hero-content">
            <h1 className="hero-title">
              Turn Your <span className="gradient-text">Resume</span><br />
              Into a Portfolio
            </h1>
            <p className="hero-description">
              Build a beautiful portfolio website in minutes using AI-powered technology
            </p>
            <div className="hero-actions">
              <Link to="/upload">
                <Button variant="primary" size="lg">
                  <svg className="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Upload Your Resume
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="stats-section">
        <Container>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Portfolios Created</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2 min</div>
              <div className="stat-label">Average Setup Time</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Free Forever</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3</div>
              <div className="stat-label">Beautiful Templates</div>
            </div>
          </div>
        </Container>
      </section>

      <section id="templates" className="templates-section">
        <Container>
          <h2 className="section-title">
            Professional Templates <span className="gradient-text">That Shine</span>
          </h2>
          <p className="section-subtitle">
            Pick your favorite design from our curated collection. Every template is mobile-friendly and ready to impress.
          </p>
          <div className="templates-grid">
            <div className="template-card">
              <div className="template-preview">
                <img src={AuroraImage} alt="Aurora Template Preview" className="template-preview-image" />
              </div>
              <div className="template-info">
                <h3>Aurora</h3>
                <p>Clean, minimal design with white and light green theme. Perfect for professionals and creatives.</p>
                <Link to="/templates/aurora">
                  <Button variant="primary">View Aurora →</Button>
                </Link>
              </div>
            </div>

            <div className="template-card">
              <div className="template-preview">
                <img src={NebulaImage} alt="Nebula Template Preview" className="template-preview-image" />
              </div>
              <div className="template-info">
                <h3>Nebula</h3>
                <p>Professional dark theme with grey and green accents. Makes a strong visual impact.</p>
                <Link to="/templates/nebula">
                  <Button variant="primary">View Nebula →</Button>
                </Link>
              </div>
            </div>

            <div className="template-card">
              <div className="template-preview">
                <img src={SparkImage} alt="Spark Template Preview" className="template-preview-image" />
              </div>
              <div className="template-info">
                <h3>Spark</h3>
                <p>Lively and playful theme with vibrant colors and fun animations. Perfect for creative professionals.</p>
                <Link to="/templates/spark">
                  <Button variant="primary">View Spark →</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="how-it-works">
        <Container>
          <h2 className="section-title">
            <span className="gradient-text">How It</span> Works
          </h2>
          <p className="section-subtitle">Just three easy steps to launch your portfolio</p>
          <div className="steps">
            <div className="step">
              <div className="step-icon-wrapper">
                <div className="step-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
              </div>
              <h3>Upload Resume</h3>
              <p>Drop your resume file or paste the text directly</p>
            </div>
            <div className="step-connector">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M0 12H38M38 12L28 2M38 12L28 22" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="12" x2="40" y2="12">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="step">
              <div className="step-icon-wrapper">
                <div className="step-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
                  </svg>
                </div>
              </div>
              <h3>AI Processing</h3>
              <p>Smart algorithms parse and structure your data instantly</p>
            </div>
            <div className="step-connector">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path d="M0 12H38M38 12L28 2M38 12L28 22" stroke="url(#gradient2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="gradient2" x1="0" y1="12" x2="40" y2="12">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="step">
              <div className="step-icon-wrapper">
                <div className="step-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </div>
              </div>
              <h3>Download & Deploy</h3>
              <p>Export your portfolio and host it anywhere you like</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="features">
        <Container>
          <h2 className="section-title">
            Why <span className="gradient-text">CareerCanvas?</span>
          </h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h3>AI-Powered</h3>
              <p>Intelligent parsing extracts all your work history, skills, and accomplishments effortlessly</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                </svg>
              </div>
              <h3>Stunning Designs</h3>
              <p>Handcrafted templates designed to showcase your best professional self</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <h3>Super Fast</h3>
              <p>Go from resume to live portfolio in less than 2 minutes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-box">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
              <h3>Mobile Ready</h3>
              <p>Works flawlessly across all devices and screen sizes</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default Home
