import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header({ selectedTemplate, onTemplateChange }) {
  const location = useLocation()
  const isPreviewPage = location.pathname === '/preview'

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <span className="logo-text">Career</span>
          <span className="logo-accent text-purple">Canvas</span>
        </Link>

        {isPreviewPage ? (
          // Show template tabs on preview page
          <nav className="nav template-nav">
            <span className="nav-label">Template:</span>
            <div className="template-tabs">
              <button
                className={`template-tab ${selectedTemplate === 'aurora' ? 'active' : ''}`}
                onClick={() => onTemplateChange('aurora')}
              >
                Aurora
              </button>
              <button
                className={`template-tab ${selectedTemplate === 'nebula' ? 'active' : ''}`}
                onClick={() => onTemplateChange('nebula')}
              >
                Nebula
              </button>
              <button
                className={`template-tab ${selectedTemplate === 'spark' ? 'active' : ''}`}
                onClick={() => onTemplateChange('spark')}
              >
                Spark
              </button>
            </div>
          </nav>
        ) : (
          // Show regular navigation on other pages
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/upload" className="nav-link nav-link-cta">
              Create Portfolio
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
