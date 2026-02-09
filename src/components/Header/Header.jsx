import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header({ selectedTemplate, onTemplateChange }) {
  const location = useLocation()
  const isPreviewPage = location.pathname === '/preview'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className={`header ${isPreviewPage ? 'header-preview' : ''}`}>
      <div className="container header-content">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <span className="logo-text">Career</span>
          <span className="logo-accent text-purple">Canvas</span>
        </Link>

        {isPreviewPage && (
          <>
            {/* Hamburger Menu Button - Mobile Only (only on preview page) */}
            <button
              className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>

            {/* Show template tabs on preview page */}
            <nav className={`nav template-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
              <span className="nav-label">Template:</span>
              <div className="template-tabs">
                <button
                  className={`template-tab ${selectedTemplate === 'aurora' ? 'active' : ''}`}
                  onClick={() => {
                    onTemplateChange('aurora')
                    closeMobileMenu()
                  }}
                >
                  Aurora
                </button>
                <button
                  className={`template-tab ${selectedTemplate === 'nebula' ? 'active' : ''}`}
                  onClick={() => {
                    onTemplateChange('nebula')
                    closeMobileMenu()
                  }}
                >
                  Nebula
                </button>
                <button
                  className={`template-tab ${selectedTemplate === 'spark' ? 'active' : ''}`}
                  onClick={() => {
                    onTemplateChange('spark')
                    closeMobileMenu()
                  }}
                >
                  Spark
                </button>
              </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
              <div className="mobile-overlay" onClick={closeMobileMenu}></div>
            )}
          </>
        )}
      </div>
    </header>
  )
}

export default Header
