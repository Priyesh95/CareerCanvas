import { useState } from 'react';
import { enhanceContent } from '../../utils/api';
import './EnhancementModal.css';

// Utility function to strip markdown formatting
function stripMarkdown(text) {
  if (!text) return text;
  // Remove bold/italic markdown
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')  // Remove **bold**
    .replace(/\*([^*]+)\*/g, '$1')      // Remove *italic*
    .replace(/__([^_]+)__/g, '$1')      // Remove __bold__
    .replace(/_([^_]+)_/g, '$1')        // Remove _italic_
    .trim();
}

function EnhancementModal({ parsedData, onClose, onDataUpdate }) {
  const [step, setStep] = useState('select'); // 'select', 'processing', 'review'
  const [selections, setSelections] = useState({
    bio: false,
    experience: false,
    projects: false
  });
  const [enhancements, setEnhancements] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSelectionChange = (type) => {
    setSelections(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleEnhance = async () => {
    const selectedTypes = Object.keys(selections).filter(key => selections[key]);

    if (selectedTypes.length === 0) {
      setError('Please select at least one section to enhance');
      return;
    }

    setLoading(true);
    setError('');
    setStep('processing');
    const results = {};

    try {
      // Enhance bio
      if (selections.bio && parsedData.about) {
        const result = await enhanceContent('bio', parsedData.about, {
          experience: parsedData.experience
        });
        results.bio = {
          original: parsedData.about,
          enhanced: stripMarkdown(result.enhanced)
        };
      }

      // Enhance experience bullet points
      if (selections.experience && parsedData.experience) {
        results.experience = [];
        for (let job of parsedData.experience) {
          const enhancedPoints = [];
          for (let point of job.points) {
            const result = await enhanceContent('bullet-point', point, {
              title: job.title,
              company: job.company
            });
            enhancedPoints.push({
              original: point,
              enhanced: stripMarkdown(result.enhanced)
            });
          }
          results.experience.push({
            job: job,
            points: enhancedPoints
          });
        }
      }

      // Enhance project descriptions
      if (selections.projects && parsedData.projects) {
        results.projects = [];
        for (let project of parsedData.projects) {
          const result = await enhanceContent('project-description', project.description, {
            name: project.name,
            tech: project.tech
          });
          results.projects.push({
            project: project,
            original: project.description,
            enhanced: stripMarkdown(result.enhanced)
          });
        }
      }

      setEnhancements(results);
      setStep('review');
    } catch (err) {
      console.error('Enhancement error:', err);
      setError(`Failed to enhance content: ${err.message}`);
      setStep('select');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    const updatedData = { ...parsedData };

    // Update bio
    if (enhancements.bio) {
      updatedData.about = enhancements.bio.enhanced;
    }

    // Update experience bullet points
    if (enhancements.experience) {
      updatedData.experience = parsedData.experience.map((job, jobIndex) => {
        const enhancedJob = enhancements.experience[jobIndex];
        if (enhancedJob) {
          return {
            ...job,
            points: enhancedJob.points.map(p => p.enhanced)
          };
        }
        return job;
      });
    }

    // Update project descriptions
    if (enhancements.projects) {
      updatedData.projects = parsedData.projects.map((project, projectIndex) => {
        const enhancedProject = enhancements.projects[projectIndex];
        if (enhancedProject) {
          return {
            ...project,
            description: enhancedProject.enhanced
          };
        }
        return project;
      });
    }

    // Update parsed data in localStorage and parent component
    localStorage.setItem('parsedResumeData', JSON.stringify(updatedData));
    onDataUpdate(updatedData);
    onClose();
  };

  const handleReject = () => {
    setStep('select');
    setEnhancements({});
    setSelections({ bio: false, experience: false, projects: false });
  };

  return (
    <div className="enhancement-modal-overlay" onClick={onClose}>
      <div className="enhancement-modal" onClick={(e) => e.stopPropagation()}>
        <div className="enhancement-modal-header">
          <h2>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path>
            </svg>
            Enhance with AI
          </h2>
          <button className="enhancement-modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="enhancement-modal-body">
          {step === 'select' && (
            <>
              <p className="enhancement-modal-description">
                Select which sections you'd like to enhance with AI. We'll improve the content while maintaining authenticity.
              </p>

              <div className="enhancement-options">
                <label className="enhancement-option">
                  <input
                    type="checkbox"
                    checked={selections.bio}
                    onChange={() => handleSelectionChange('bio')}
                    disabled={!parsedData.about}
                  />
                  <div className="enhancement-option-content">
                    <h3>Professional Bio</h3>
                    <p>Generate a compelling summary from your experience</p>
                  </div>
                </label>

                <label className="enhancement-option">
                  <input
                    type="checkbox"
                    checked={selections.experience}
                    onChange={() => handleSelectionChange('experience')}
                    disabled={!parsedData.experience || parsedData.experience.length === 0}
                  />
                  <div className="enhancement-option-content">
                    <h3>Experience Bullets</h3>
                    <p>Rewrite bullet points with action verbs and quantifiable results</p>
                  </div>
                </label>

                <label className="enhancement-option">
                  <input
                    type="checkbox"
                    checked={selections.projects}
                    onChange={() => handleSelectionChange('projects')}
                    disabled={!parsedData.projects || parsedData.projects.length === 0}
                  />
                  <div className="enhancement-option-content">
                    <h3>Project Descriptions</h3>
                    <p>Improve project descriptions to highlight impact and technologies</p>
                  </div>
                </label>
              </div>

              {error && (
                <div className="enhancement-error">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {error}
                </div>
              )}

              <div className="enhancement-modal-actions">
                <button className="enhancement-btn enhancement-btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button
                  className="enhancement-btn enhancement-btn-primary"
                  onClick={handleEnhance}
                  disabled={loading}
                >
                  Enhance Selected
                </button>
              </div>
            </>
          )}

          {step === 'processing' && (
            <div className="enhancement-processing">
              <div className="enhancement-spinner"></div>
              <h3>Enhancing your content...</h3>
              <p>This may take a moment. Please don't close this window.</p>
            </div>
          )}

          {step === 'review' && (
            <>
              <p className="enhancement-modal-description">
                Review the AI-enhanced content below. You can accept or reject the changes.
              </p>

              <div className="enhancement-comparisons">
                {enhancements.bio && (
                  <div className="enhancement-comparison">
                    <h3>Professional Bio</h3>
                    <div className="enhancement-comparison-grid">
                      <div className="enhancement-comparison-col">
                        <h4>Original</h4>
                        <p>{enhancements.bio.original}</p>
                      </div>
                      <div className="enhancement-comparison-col enhancement-enhanced">
                        <h4>Enhanced</h4>
                        <p>{enhancements.bio.enhanced}</p>
                      </div>
                    </div>
                  </div>
                )}

                {enhancements.experience && enhancements.experience.map((jobData, jobIndex) => (
                  <div key={jobIndex} className="enhancement-comparison">
                    <h3>{jobData.job.title} at {jobData.job.company}</h3>
                    {jobData.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="enhancement-comparison-grid">
                        <div className="enhancement-comparison-col">
                          <h4>Original</h4>
                          <p>{point.original}</p>
                        </div>
                        <div className="enhancement-comparison-col enhancement-enhanced">
                          <h4>Enhanced</h4>
                          <p>{point.enhanced}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {enhancements.projects && enhancements.projects.map((projectData, projectIndex) => (
                  <div key={projectIndex} className="enhancement-comparison">
                    <h3>{projectData.project.name}</h3>
                    <div className="enhancement-comparison-grid">
                      <div className="enhancement-comparison-col">
                        <h4>Original</h4>
                        <p>{projectData.original}</p>
                      </div>
                      <div className="enhancement-comparison-col enhancement-enhanced">
                        <h4>Enhanced</h4>
                        <p>{projectData.enhanced}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="enhancement-modal-actions">
                <button className="enhancement-btn enhancement-btn-secondary" onClick={handleReject}>
                  Reject Changes
                </button>
                <button className="enhancement-btn enhancement-btn-primary" onClick={handleAccept}>
                  Accept All Changes
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnhancementModal;
