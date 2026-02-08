import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import Container from '../../components/Container/Container';
import { parseResume } from '../../utils/api';
import './Upload.css';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);

  // Handle file selection
  const handleFileSelect = async (selectedFile) => {
    setError('');
    setFile(selectedFile);

    const fileType = selectedFile.type;
    const fileName = selectedFile.name.toLowerCase();

    try {
      setIsProcessing(true);
      setProgress('Extracting text from file...');

      let extractedText = '';

      if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
        extractedText = await extractTextFromPDF(selectedFile);
      } else if (
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        fileName.endsWith('.docx')
      ) {
        extractedText = await extractTextFromDOCX(selectedFile);
      } else {
        throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
      }

      if (!extractedText || extractedText.trim().length === 0) {
        throw new Error('Could not extract text from the file. Please try another file.');
      }

      setResumeText(extractedText);
      await handleParse(extractedText);
    } catch (err) {
      console.error('File processing error:', err);
      setError(err.message);
      setIsProcessing(false);
      setProgress('');
    }
  };

  // Extract text from PDF
  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      setProgress(`Extracting text from page ${i} of ${pdf.numPages}...`);
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText.trim();
  };

  // Extract text from DOCX
  const extractTextFromDOCX = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  // Parse resume with AI
  const handleParse = async (text) => {
    try {
      setProgress('Analyzing resume with AI...');
      const parsedData = await parseResume(text);

      // Store parsed data in localStorage for the preview page
      localStorage.setItem('parsedResumeData', JSON.stringify(parsedData));

      setProgress('Success! Redirecting to preview...');

      // Navigate to preview page after a brief delay
      setTimeout(() => {
        navigate('/preview');
      }, 1000);
    } catch (err) {
      console.error('Parsing error:', err);
      setError(`Failed to parse resume: ${err.message}`);
      setIsProcessing(false);
      setProgress('');
    }
  };

  // Handle text input submission
  const handleTextSubmit = async () => {
    if (!resumeText || resumeText.trim().length === 0) {
      setError('Please enter your resume text');
      return;
    }

    setError('');
    setIsProcessing(true);
    await handleParse(resumeText);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="upload-page">
      <Container>
        <div className="upload-content">
          <h1>Upload Your Resume</h1>
          <p className="upload-subtitle">
            We'll use AI to parse your resume and create a stunning portfolio
          </p>

          {!showTextInput ? (
            <>
              {/* File Upload Dropzone */}
              <div
                className={`upload-dropzone ${isDragging ? 'dragging' : ''} ${
                  isProcessing ? 'processing' : ''
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={!isProcessing ? openFilePicker : undefined}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileInputChange}
                  style={{ display: 'none' }}
                  disabled={isProcessing}
                />

                {!isProcessing ? (
                  <>
                    <div className="upload-icon">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                    </div>
                    <p className="upload-primary-text">
                      {isDragging ? 'Drop your resume here' : 'Drag & drop your resume here'}
                    </p>
                    <p className="upload-secondary-text">or click to browse</p>
                    <p className="upload-supported">Supports PDF and DOCX files</p>
                  </>
                ) : (
                  <>
                    <div className="upload-spinner"></div>
                    <p className="upload-progress">{progress}</p>
                  </>
                )}
              </div>

              {/* Text Input Option */}
              <div className="upload-divider">
                <span>or</span>
              </div>

              <button
                className="upload-btn upload-btn-primary"
                onClick={() => setShowTextInput(true)}
                disabled={isProcessing}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Paste Resume Text
              </button>
            </>
          ) : (
            <>
              {/* Text Input Mode */}
              <div className="upload-text-input">
                <textarea
                  className="resume-textarea"
                  placeholder="Paste your resume text here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  disabled={isProcessing}
                  rows={15}
                />
                <div className="text-input-actions">
                  <button
                    className="upload-btn upload-btn-secondary"
                    onClick={() => {
                      setShowTextInput(false);
                      setResumeText('');
                    }}
                    disabled={isProcessing}
                  >
                    ← Back to Upload
                  </button>
                  <button
                    className="upload-btn upload-btn-primary"
                    onClick={handleTextSubmit}
                    disabled={isProcessing || !resumeText.trim()}
                  >
                    {isProcessing ? 'Processing...' : 'Parse Resume'}
                  </button>
                </div>
                {isProcessing && (
                  <p className="upload-progress" style={{ marginTop: '1rem', textAlign: 'center' }}>
                    {progress}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Error Display */}
          {error && (
            <div className="upload-error">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Tips Section */}
          {!isProcessing && !error && (
            <div className="upload-tips">
              <h3>💡 Tips for best results:</h3>
              <ul>
                <li>Use a well-formatted resume with clear sections</li>
                <li>Include sections like Experience, Skills, Projects, Education</li>
                <li>PDF files generally work better than DOCX</li>
                <li>Make sure text is selectable (not scanned images)</li>
              </ul>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Upload;
