import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Upload from './pages/Upload/Upload'
import Preview from './pages/Preview/Preview'
import Aurora from './templates/Aurora/Aurora'
import Nebula from './templates/Nebula/Nebula'
import Spark from './templates/Spark/Spark'

function AppContent() {
  const location = useLocation()
  const isTemplatePage = location.pathname.startsWith('/templates/')

  return (
    <div className="app">
      {!isTemplatePage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/templates/aurora" element={<Aurora />} />
          <Route path="/templates/nebula" element={<Nebula />} />
          <Route path="/templates/spark" element={<Spark />} />
        </Routes>
      </main>
      {!isTemplatePage && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
