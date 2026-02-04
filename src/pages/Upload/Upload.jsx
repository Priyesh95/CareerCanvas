import Container from '../../components/Container/Container'
import './Upload.css'

function Upload() {
  return (
    <div className="upload-page">
      <Container>
        <div className="upload-content">
          <h1>Upload Your Resume</h1>
          <p className="upload-subtitle">
            We'll parse your resume and create a stunning portfolio
          </p>
          <div className="upload-placeholder">
            <p>Upload functionality coming soon...</p>
            <p className="text-orange">PDF, DOCX, or Text supported</p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Upload
