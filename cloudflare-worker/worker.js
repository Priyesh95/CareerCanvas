/**
 * CareerCanvas Cloudflare Worker
 *
 * This worker handles AI-powered resume parsing and content enhancement
 * using Claude API (Anthropic).
 *
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Go to https://dash.cloudflare.com/
 * 2. Navigate to Workers & Pages
 * 3. Click "Create Application" → "Create Worker"
 * 4. Name it: careercanvas-worker
 * 5. Copy and paste this entire file
 * 6. Click "Save and Deploy"
 * 7. Go to Settings → Variables and Secrets
 * 8. Add variable: CLAUDE_API_KEY (your API key from console.anthropic.com)
 * 9. Click "Encrypt" to make it a secret
 * 10. Click "Deploy"
 *
 * TESTING:
 * curl -X POST https://YOUR-WORKER-URL.workers.dev/api/parse-resume \
 *   -H "Content-Type: application/json" \
 *   -d '{"resumeText": "John Doe\nSoftware Engineer\njohn@example.com"}'
 */

export default {
  async fetch(request, env) {
    // CORS headers for all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // TODO: Change to your domain in production
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    try {
      // Health check endpoint
      if (url.pathname === '/' && request.method === 'GET') {
        return jsonResponse({
          status: 'online',
          service: 'CareerCanvas Worker',
          version: '1.0.0',
          endpoints: {
            health: 'GET /',
            parseResume: 'POST /api/parse-resume',
            enhanceContent: 'POST /api/enhance-content'
          },
          timestamp: new Date().toISOString()
        }, corsHeaders);
      }

      // Parse Resume endpoint
      if (url.pathname === '/api/parse-resume' && request.method === 'POST') {
        return await handleParseResume(request, env, corsHeaders);
      }

      // Enhance Content endpoint
      if (url.pathname === '/api/enhance-content' && request.method === 'POST') {
        return await handleEnhanceContent(request, env, corsHeaders);
      }

      // 404 for unknown routes
      return jsonResponse({
        error: 'Not Found',
        message: 'Available endpoints: GET /, POST /api/parse-resume, POST /api/enhance-content'
      }, corsHeaders, 404);

    } catch (error) {
      console.error('Worker error:', error);
      return jsonResponse({
        success: false,
        error: 'Internal server error',
        message: error.message
      }, corsHeaders, 500);
    }
  }
};

// ============================================
// HANDLER: Parse Resume
// ============================================
async function handleParseResume(request, env, corsHeaders) {
  try {
    // Parse request body
    const body = await request.json();
    const { resumeText } = body;

    // Validate input
    if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length === 0) {
      return jsonResponse({
        success: false,
        error: 'Invalid input',
        message: 'resumeText is required and must be a non-empty string'
      }, corsHeaders, 400);
    }

    // Check if resume text is too long (max 50,000 characters)
    if (resumeText.length > 50000) {
      return jsonResponse({
        success: false,
        error: 'Resume too long',
        message: 'Resume text must be less than 50,000 characters'
      }, corsHeaders, 400);
    }

    // Validate API key exists
    if (!env.CLAUDE_API_KEY) {
      console.error('CLAUDE_API_KEY not configured in environment variables');
      return jsonResponse({
        success: false,
        error: 'Server configuration error',
        message: 'API key not configured. Please contact administrator.'
      }, corsHeaders, 500);
    }

    console.log('Parsing resume, length:', resumeText.length);

    // Call Claude API with parsing prompt
    const parsedData = await callClaudeAPI(
      getParsingPrompt(resumeText),
      env.CLAUDE_API_KEY,
      4096 // max tokens for parsing
    );

    console.log('Resume parsed successfully');

    return jsonResponse({
      success: true,
      data: parsedData
    }, corsHeaders);

  } catch (error) {
    console.error('Parse resume error:', error);
    return jsonResponse({
      success: false,
      error: 'Parsing failed',
      message: error.message
    }, corsHeaders, 500);
  }
}

// ============================================
// HANDLER: Enhance Content
// ============================================
async function handleEnhanceContent(request, env, corsHeaders) {
  try {
    // Parse request body
    const body = await request.json();
    const { type, content, context } = body;

    // Validate input
    if (!type || !content) {
      return jsonResponse({
        success: false,
        error: 'Invalid input',
        message: 'type and content are required'
      }, corsHeaders, 400);
    }

    // Validate type
    const validTypes = ['bio', 'bullet-point', 'project-description'];
    if (!validTypes.includes(type)) {
      return jsonResponse({
        success: false,
        error: 'Invalid type',
        message: `type must be one of: ${validTypes.join(', ')}`
      }, corsHeaders, 400);
    }

    // Validate API key exists
    if (!env.CLAUDE_API_KEY) {
      console.error('CLAUDE_API_KEY not configured in environment variables');
      return jsonResponse({
        success: false,
        error: 'Server configuration error',
        message: 'API key not configured. Please contact administrator.'
      }, corsHeaders, 500);
    }

    console.log('Enhancing content, type:', type);

    // Get appropriate enhancement prompt
    const prompt = getEnhancementPrompt(type, content, context || {});
    const enhanced = await callClaudeAPI(
      prompt,
      env.CLAUDE_API_KEY,
      1024 // max tokens for enhancement
    );

    console.log('Content enhanced successfully');

    return jsonResponse({
      success: true,
      data: {
        type,
        original: content,
        enhanced: enhanced
      }
    }, corsHeaders);

  } catch (error) {
    console.error('Enhance content error:', error);
    return jsonResponse({
      success: false,
      error: 'Enhancement failed',
      message: error.message
    }, corsHeaders, 500);
  }
}

// ============================================
// CLAUDE API CALLER
// ============================================
async function callClaudeAPI(prompt, apiKey, maxTokens = 4096) {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: maxTokens,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', response.status, errorText);
      throw new Error(`Claude API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const content = data.content[0].text;

    // For parsing (larger max_tokens), extract and parse JSON
    if (maxTokens > 1024) {
      return parseJSON(content);
    }

    // For enhancement, return text directly
    return content.trim();

  } catch (error) {
    console.error('Claude API call failed:', error);
    throw error;
  }
}

// ============================================
// PROMPTS
// ============================================
function getParsingPrompt(resumeText) {
  return `You are a professional resume parser. Extract structured information from the following resume and return it as valid JSON.

Resume Text:
${resumeText}

IMPORTANT: Return ONLY valid JSON (no markdown, no code blocks, no explanations). The JSON must follow this exact structure:

{
  "personal": {
    "name": "Full Name",
    "title": "Job Title or Professional Role",
    "email": "email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "City, State or Country",
    "linkedin": "linkedin.com/in/username",
    "github": "github.com/username",
    "website": "personal-website.com"
  },
  "about": "A compelling 2-3 sentence professional summary",
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "location": "City, State",
      "period": "Start Date - End Date (e.g., Jan 2023 - Present)",
      "points": ["Key achievement or responsibility 1", "Achievement 2"]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Brief description of the project",
      "tech": ["Technology 1", "Technology 2"],
      "emoji": "🚀"
    }
  ],
  "education": [
    {
      "degree": "Degree Name (e.g., Bachelor of Science in Computer Science)",
      "school": "University Name",
      "location": "City, State",
      "year": "Graduation Year (e.g., 2020)",
      "gpa": "3.8"
    }
  ]
}

EXTRACTION RULES:
1. Extract ALL information available in the resume
2. For missing fields, use empty string "" for text or empty array [] for lists
3. For projects, suggest appropriate emojis based on project type (e.g., 🚀 for web apps, 📱 for mobile, 🤖 for AI/ML, 🎨 for design, 💼 for business, 📊 for data, 🔧 for tools)
4. Preserve bullet points and achievements from work experience
5. Extract all skills mentioned (technical, soft skills, tools, languages)
6. Format dates consistently (e.g., "Jan 2023 - Present" or "2020 - 2022")
7. If no about/bio is present, generate one from the experience
8. Ensure ALL JSON is properly formatted and valid
9. Return ONLY the JSON object, nothing else

Begin parsing:`;
}

function getEnhancementPrompt(type, content, context) {
  if (type === 'bio') {
    const experienceText = context.experience
      ? JSON.stringify(context.experience, null, 2)
      : 'No experience data provided';

    return `Generate a compelling 2-3 sentence professional bio/summary based on this work experience:

Work Experience:
${experienceText}

Requirements:
- Write in first person ("I am..." or third person "John is...")
- Highlight key achievements and skills
- Make it engaging and professional
- Keep it concise (2-3 sentences max)
- Focus on value and impact

Return ONLY the bio text as plain text. Do not use markdown formatting, bold text, asterisks, or any special formatting. Just plain text.`;
  }

  if (type === 'bullet-point') {
    const jobTitle = context.title || 'this role';
    const company = context.company || 'the company';

    return `Rewrite this job responsibility into a powerful, achievement-focused bullet point:

Original: "${content}"
Job Context: ${jobTitle} at ${company}

Requirements:
- Start with a strong action verb (Led, Developed, Implemented, Increased, etc.)
- Include quantifiable results or impact where possible
- Use the STAR method (Situation, Task, Action, Result) if applicable
- Keep it concise (1-2 lines)
- Make it achievement-oriented, not task-oriented
- Focus on the value delivered

Return ONLY the improved bullet point as plain text. Do not use markdown formatting, bold text, asterisks, or any special formatting. Just plain text.`;
  }

  if (type === 'project-description') {
    const projectName = context.name || 'This project';
    const tech = context.tech || [];
    const techList = Array.isArray(tech) ? tech.join(', ') : tech;

    return `Improve this project description to be more engaging and highlight its impact:

Project Name: ${projectName}
Current Description: "${content}"
Technologies Used: ${techList}

Requirements:
- Make it clear and engaging
- Highlight the problem solved and impact
- Mention key technologies naturally
- Keep it concise (2-3 sentences)
- Focus on value and outcomes
- Make it interesting to potential employers

Return ONLY the improved description as plain text. Do not use markdown formatting, bold text, asterisks, or any special formatting. Just plain text.`;
  }

  throw new Error(`Invalid enhancement type: ${type}`);
}

// ============================================
// UTILITIES
// ============================================
function parseJSON(text) {
  let jsonText = text.trim();

  // Remove markdown code blocks if present
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/```json\n?/, '').replace(/```\s*$/, '').trim();
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/```\n?/, '').replace(/```\s*$/, '').trim();
  }

  try {
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('JSON parse error:', error);
    console.error('Attempted to parse:', jsonText.substring(0, 200));
    throw new Error('Failed to parse JSON response from AI');
  }
}

function jsonResponse(data, corsHeaders, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}
