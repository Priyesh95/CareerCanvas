import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <span className="logo-text">Career</span>
          <span className="logo-accent text-purple">Canvas</span>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/upload" className="nav-link nav-link-cta">
            Create Portfolio
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
