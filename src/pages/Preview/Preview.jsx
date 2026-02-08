import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Aurora from '../../templates/Aurora/Aurora';
import Nebula from '../../templates/Nebula/Nebula';
import Spark from '../../templates/Spark/Spark';
import EnhancementModal from '../../components/EnhancementModal/EnhancementModal';
import './Preview.css';

function Preview({ selectedTemplate, onTemplateChange }) {
  const navigate = useNavigate();
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEnhanceModal, setShowEnhanceModal] = useState(false);

  useEffect(() => {
    // Load parsed data from localStorage
    const storedData = localStorage.getItem('parsedResumeData');

    if (!storedData) {
      // No data found, redirect to upload page
      navigate('/upload');
      return;
    }

    try {
      const data = JSON.parse(storedData);
      setParsedData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error parsing resume data:', error);
      navigate('/upload');
    }
  }, [navigate]);

  // Scroll to top when template changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedTemplate]);

  const templates = [
    {
      id: 'aurora',
      name: 'Aurora',
      component: Aurora
    },
    {
      id: 'nebula',
      name: 'Nebula',
      component: Nebula
    },
    {
      id: 'spark',
      name: 'Spark',
      component: Spark
    }
  ];

  const handleDownload = () => {
    // TODO: Implement download functionality
    alert('Download functionality coming soon!');
  };

  const handleStartOver = () => {
    localStorage.removeItem('parsedResumeData');
    navigate('/upload');
  };

  if (loading) {
    return (
      <div className="preview-page">
        <div className="preview-loading">
          <div className="preview-spinner"></div>
          <p>Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  const SelectedTemplateComponent = templates.find(t => t.id === selectedTemplate)?.component;

  return (
    <div className="preview-page">
      {/* Live Template Preview */}
      <section className="preview-template">
        {SelectedTemplateComponent && parsedData && (
          <SelectedTemplateComponent data={parsedData} />
        )}
      </section>

      {/* Floating Action Buttons */}
      <div className="preview-fab-group">
        <button
          className="preview-fab preview-fab-enhance"
          onClick={() => setShowEnhanceModal(true)}
          title="Enhance with AI"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
          </svg>
          <span>Enhance with AI</span>
        </button>
        <button
          className="preview-fab preview-fab-secondary"
          onClick={handleStartOver}
          title="Start Over"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10"></polyline>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
          </svg>
          <span>Start Over</span>
        </button>
        <button
          className="preview-fab preview-fab-primary"
          onClick={handleDownload}
          title="Download Portfolio"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span>Download</span>
        </button>
      </div>

      {/* Enhancement Modal */}
      {showEnhanceModal && (
        <EnhancementModal
          parsedData={parsedData}
          onClose={() => setShowEnhanceModal(false)}
          onDataUpdate={setParsedData}
        />
      )}
    </div>
  );
}

export default Preview;
