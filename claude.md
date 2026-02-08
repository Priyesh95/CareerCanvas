# CareerCanvas - Project Documentation

**Last Updated:** February 5, 2026 (Updated: AI Integration Architecture)
**Status:** Active Development

---

## 🤖 For Claude: How to Use This Documentation

**When the user asks "What is my next task?" or "What should I work on next?":**
1. Jump to the [Project Roadmap](#project-roadmap) section
2. Look at **Current Sprint / High Priority** section
3. Find the FIRST task marked with `- [ ]` (unchecked)
4. Present that task to the user clearly
5. Ask for confirmation before starting
6. After completion, mark it as `- ✅` and update the Last Updated date

**This documentation is comprehensive** - it contains everything you need to understand and continue development on CareerCanvas.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Features](#features)
5. [Templates](#templates)
6. [Cloudflare Worker & Claude API Integration](#cloudflare-worker--claude-api-integration) 🆕
7. [Recent Work](#recent-work)
8. [Known Issues & Fixes](#known-issues--fixes)
9. [Development Guidelines](#development-guidelines)
10. [Project Roadmap](#project-roadmap) ⭐ **Next Tasks Here**
11. [Deployment](#deployment)
12. [Quick Reference](#quick-reference)

---

## Project Overview

**CareerCanvas** is an AI-powered web application that transforms resumes into beautiful portfolio websites in minutes. Users can upload their resume (PDF or DOCX), and the application intelligently parses the content to generate a stunning, mobile-responsive portfolio website using one of three professionally designed templates.

### Purpose
- Help job seekers create professional portfolio websites without coding knowledge
- Provide beautiful, modern templates that showcase their skills and experience
- Make portfolio creation fast, easy, and 100% free

### Key Value Propositions
- **AI-Powered Parsing**: Intelligent extraction of work history, skills, and accomplishments using Claude API
- **AI Content Enhancement**: Rewrite bullet points, generate bios, and improve descriptions with one click
- **Beautiful Templates**: Three professionally designed, responsive templates
- **Quick Setup**: Average setup time of 2 minutes
- **Mobile Responsive**: All templates work flawlessly across devices
- **Privacy-Focused**: Resume parsing happens on secure Cloudflare edge servers

---

## Tech Stack

### Core Technologies
- **React 18.2.4**: Modern React with hooks for component state and effects
- **React Router v7.13.0**: Client-side routing for SPA navigation
- **Vite 7.3.1**: Fast build tool and development server with HMR
- **CSS3**: Custom styling with modern CSS features (Grid, Flexbox, Animations)

### Backend & AI Services
- **Cloudflare Workers**: Serverless edge computing for API endpoints
- **Claude API (Anthropic)**: AI-powered resume parsing and content enhancement
  - Resume section extraction and structuring
  - Intelligent bio generation from experience
  - Bullet point rewriting for impact
  - Project description enhancement

### Dependencies
- **pdfjs-dist 5.4.624**: Parse and extract text from PDF files (client-side)
- **mammoth 1.11.0**: Parse and extract text from DOCX files (client-side)
- **react-router-dom 7.13.0**: Routing library for React

### Development Tools
- **@vitejs/plugin-react 5.1.3**: Official Vite plugin for React
- **Node.js 16+**: Runtime environment
- **npm**: Package manager
- **Wrangler**: Cloudflare Workers CLI for deployment

### Build Configuration
- Vite configured for fast development and optimized production builds
- ES modules architecture
- Hot Module Replacement (HMR) for instant updates during development

### Architecture Overview

```
User Upload → PDF/DOCX Extraction (Client) → Text Sent to CF Worker
→ Claude API Processing → Structured Data → React Frontend
```

**Cloudflare Worker Endpoints:**
- `POST /api/parse-resume` - Parses resume text and extracts structured sections
- `POST /api/enhance-content` - Enhances existing portfolio content with AI

---

## Project Structure

```
CareerCanvas/
├── .claude/                    # Claude project-specific files
├── .git/                       # Git repository
├── node_modules/               # npm dependencies
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images and media files
│   │   ├── Aurora.png          # Aurora template preview
│   │   ├── Nebula.png          # Nebula template preview
│   │   └── Spark.png           # Spark template preview
│   ├── components/             # Reusable React components
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.css
│   │   ├── Container/
│   │   │   ├── Container.jsx
│   │   │   └── Container.css
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   └── Footer/
│   │       ├── Footer.jsx
│   │       └── Footer.css
│   ├── pages/                  # Page components
│   │   ├── Home/
│   │   │   ├── Home.jsx        # Landing page
│   │   │   └── Home.css
│   │   ├── Upload/
│   │   │   ├── Upload.jsx      # Resume upload page
│   │   │   └── Upload.css
│   │   └── Preview/
│   │       ├── Preview.jsx     # Portfolio preview page
│   │       └── Preview.css
│   ├── templates/              # Portfolio templates
│   │   ├── Aurora/
│   │   │   ├── Aurora.jsx
│   │   │   └── Aurora.css
│   │   ├── Nebula/
│   │   │   ├── Nebula.jsx
│   │   │   └── Nebula.css
│   │   └── Spark/
│   │       ├── Spark.jsx       # ✨ Recently updated
│   │       └── Spark.css       # ✨ Recently updated
│   ├── styles/                 # Global styles
│   ├── utils/                  # Utility functions
│   │   └── api.js              # API client for CF Worker communication
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── workers/                    # Cloudflare Workers (Backend)
│   ├── src/
│   │   ├── index.js            # Main worker entry point
│   │   ├── parser.js           # Resume parsing logic with Claude API
│   │   └── enhancer.js         # Content enhancement logic with Claude API
│   ├── wrangler.toml           # CF Workers configuration
│   └── package.json            # Worker dependencies
├── .gitignore
├── index.html                  # HTML entry point
├── package.json                # npm configuration
├── package-lock.json           # Locked dependency versions
├── vite.config.js              # Vite build configuration
├── README.md                   # User-facing documentation
└── claude.md                   # This file - comprehensive project docs
```

---

## Features

### 1. Landing Page (Home)
- Hero section with gradient text effects
- Call-to-action buttons for uploading resume
- Stats section showing portfolio count and setup time
- Template showcase with preview images
- Features section explaining AI parsing, templates, and export
- How it works section with step-by-step guide

### 2. Resume Upload
- Drag-and-drop file upload interface
- Support for PDF and DOCX formats
- Text paste option for direct input
- Client-side text extraction (pdfjs-dist for PDF, mammoth for DOCX)
- Text sent to Cloudflare Worker for AI parsing

### 3. AI-Powered Resume Parsing
- **Powered by Claude API via Cloudflare Workers**
- Intelligent extraction of resume sections:
  - Personal information (name, title, contact details)
  - Professional summary/bio
  - Skills (categorized and structured)
  - Work experience (title, company, dates, achievements)
  - Projects (name, description, technologies)
  - Education (degree, institution, dates, GPA)
- Smart detection of section headers across various resume formats
- Handles unstructured or non-standard resume layouts
- Returns structured JSON data ready for template injection

### 4. Template Preview
- Side-by-side comparison of all templates
- Live preview of portfolio with parsed data
- Template selection and switching
- Real-time data editing
- Export and deployment options

### 5. AI Content Enhancement ✨ (NEW)
**"Enhance with AI" Feature** - Powered by Claude API

After initial parsing, users can enhance their portfolio content with AI:

#### Features:
- **Rewrite Bullet Points for Impact**
  - Transforms basic job descriptions into achievement-focused statements
  - Uses action verbs and quantifiable results
  - Maintains authenticity while improving clarity

- **Generate Bio from Experience**
  - Creates compelling professional summary from work history
  - Customizable tone (professional, friendly, creative)
  - 2-3 sentence concise format

- **Improve Project Descriptions**
  - Enhances technical project descriptions
  - Highlights impact and technologies used
  - Makes projects more engaging and clear

- **Before/After Comparison**
  - Side-by-side view of original vs. enhanced content
  - Accept/reject individual enhancements
  - Preserve original content option
  - Undo functionality

#### User Flow:
1. User uploads resume → AI parsing generates initial portfolio
2. User previews portfolio in selected template
3. User clicks "Enhance with AI" button
4. Modal shows enhancement options (bio, bullets, projects)
5. User selects what to enhance
6. AI processes and returns enhanced content
7. User reviews before/after comparison
8. User accepts or rejects each enhancement
9. Enhanced content updates in template preview

### 6. Portfolio Templates
Three professionally designed templates, each with unique personality and design language:

#### Aurora Template
- **Theme**: Clean, minimal, elegant
- **Color Scheme**: White background with light green accents
- **Best For**: Professionals, corporate roles, clean aesthetic lovers
- **Key Features**:
  - Minimalist design
  - Subtle animations
  - Professional typography
  - White space focused layout

#### Nebula Template
- **Theme**: Professional, modern, tech-focused
- **Color Scheme**: Dark grey background with green accents
- **Best For**: Tech professionals, developers, engineers
- **Key Features**:
  - Dark theme for reduced eye strain
  - Modern card-based layout
  - Professional feel
  - Strong contrast for readability

#### Spark Template ✨ (Recently Updated)
- **Theme**: Quirky but professional, neobrutalism design
- **Color Scheme**: Yellow (#ffe46a), White, Black borders, vibrant accents (green, pink, purple)
- **Best For**: Creative professionals, designers, artists, unique personalities
- **Key Features**:
  - Neobrutalism design system (bold borders, 3D shadows)
  - Extensive animations and micro-interactions
  - Floating badges and decorative elements
  - Playful personality with professional structure
  - Inter font family
  - Sticky navigation with scroll tracking
  - Animated skills section with wave effect
  - Interactive cards with hover effects
  - Custom section titles with spinning decorations

---

## Templates

### Spark Template - Detailed Documentation

The Spark template has undergone a significant redesign to implement a neobrutalism theme that is both quirky and professional.

#### Design Philosophy
- **Neobrutalism**: Bold black borders (2-3px), 3D box shadows (4-6px offset), flat colors
- **Quirky Elements**: Floating badges, animated emojis, playful interactions
- **Professional Structure**: Clean layout, clear hierarchy, readable typography
- **Animation-Rich**: Continuous floating animations, hover effects, entrance animations

#### Color Palette
- **Primary Yellow**: `#ffe46a` (hero, footer, section titles)
- **Background**: `#fdfaf2` (warm off-white)
- **Text**: `#1f2937` (dark grey)
- **Accent Green**: `#10b981` (success states, floating badge 1)
- **Accent Pink**: `#ec4899` (decorative elements, floating badge 2)
- **Accent Purple**: `#9333EA` (active navigation, floating badge 3)
- **Accent Blue**: `#0ea5e9` (underlines, timeline dots)
- **Black**: `#000` (borders, shadows)
- **White**: `#fff` (cards, navigation)

#### Key Components

##### Navigation ([Spark.css:49-135](src/templates/Spark/Spark.css))
```css
.spark-nav {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  backdrop-filter: blur(8px);
  border-bottom: 3px solid #000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
```
- **Sticky positioning** for persistent navigation
- **Active section tracking** with scroll detection
- **Purple active state** (#9333EA) with pulse animation
- **Hover effects** with rotation and shadow
- **Mobile responsive** with stacked layout on small screens

##### Hero Section ([Spark.css:138-435](src/templates/Spark/Spark.css))
- Yellow background with dot pattern overlay
- Floating badges with different colors and animation delays
- Animated "Hi there! :)" greeting with wave animation
- Name with blue underline and sparkle emoji
- Pulsing status dot for availability
- Contact buttons with neobrutalism style and wiggle animation
- Social bubbles for GitHub and phone with bounce effects

##### Floating Badges ([Spark.css:165-215](src/templates/Spark/Spark.css))
Three floating badges with emojis:
1. 🚀 Creative - Green background (#10b981)
2. ✨ Designer - Pink background (#ec4899)
3. 💡 Innovator - Purple background (#8b5cf6)
- Float animation over 6 seconds
- Staggered delays (0s, 2s, 4s)
- 3D shadow effects

##### Skills Section ([Spark.css:573-654](src/templates/Spark/Spark.css))
Titled "Superpowers" with animated skill bubbles:
- **Pop-in animation** on initial load with staggered delays
- **Continuous floating animation** with wave effect (12 skills with different delays)
- **Hover effects**: Rotate, scale, change background to yellow
- **Shine effect** on hover with gradient sweep

##### Experience Section ([Spark.css:656-789](src/templates/Spark/Spark.css))
Titled "Journey" with timeline layout:
- Vertical timeline with pulsing dots
- Experience cards with neobrutalism borders and shadows
- **Sweep effect** on hover with gradient animation
- **Period badges** that scale and change color on card hover
- Company and location information with visual hierarchy

##### Projects Section ([Spark.css:790-904](src/templates/Spark/Spark.css))
- Grid layout with card-based design
- **Large emoji icons** (2.5rem) that bounce and rotate on hover
- **Radial gradient overlay** that appears on hover
- **Tech badges** with black background and yellow text
- **Jello animation** on tech badge hover with skew effects
- Even/odd rotation effects for visual variety

##### Education Section ([Spark.css:906-1002](src/templates/Spark/Spark.css))
- Card layout with degree, school, location, year, and GPA
- **Large graduation cap emoji** (🎓) watermark that rotates on hover
- **Year badges** with black background
- **GPA badges** that turn yellow on hover
- All badges scale up on card hover

##### Footer ([Spark.css:1004-1062](src/templates/Spark/Spark.css))
- Yellow background matching hero
- Spinning lightning bolt (⚡) and floating sparkle (💫) decorations
- Tagline that scales on hover
- Copyright and attribution

#### Animations

The Spark template uses numerous CSS animations:

1. **float-slow**: Background decorative elements (20s, 15s cycles)
2. **float-badge**: Floating badges in hero (6s cycle with rotation)
3. **wave-hand**: Greeting text (2s, one-time)
4. **slide-up**: Name on page load (0.8s)
5. **sparkle**: Emoji next to name (3s cycle)
6. **pulse-subtle**: Active navigation link (2s cycle)
7. **pulse-dot**: Status indicator (2s cycle)
8. **fade-in**: About text (1s with delay)
9. **wiggle**: Contact buttons on hover (0.5s)
10. **bounce-subtle**: Social bubbles on hover (0.6s)
11. **pop-in**: Skills on page load (0.5s with stagger)
12. **float-skill**: Skills continuous animation (3s cycle with delays)
13. **pulse-dot-timeline**: Experience timeline dots (2s cycle)
14. **bounce-emoji**: Project emojis on hover (0.6s)
15. **jello**: Tech badges on hover (0.6s with skew)
16. **rotate-emoji**: Education card emoji on hover (0.6s)
17. **spin-slow**: Section title decorations (4s cycle)
18. **float-sparkle**: About card decoration (3s cycle)
19. **float-circle**: Main content decoration (10s cycle)
20. **float-square**: Main content decoration (12s cycle)

#### Responsive Design ([Spark.css:1069-1172](src/templates/Spark/Spark.css))

Mobile breakpoint at 768px:
- Floating badges hidden on mobile
- Navigation stacks vertically
- Font sizes reduced
- Grid layouts become single column
- Timeline spacing adjusted
- Simplified animations for performance

---

## Cloudflare Worker & Claude API Integration

### Architecture

The application uses a **serverless architecture** with Cloudflare Workers handling all AI-powered functionality:

```
Client (React) → Text Extraction (PDF/DOCX)
     ↓
Cloudflare Worker (Edge) → Claude API
     ↓
Structured Data → Client → Templates
```

### Benefits of This Architecture

1. **Security**: API keys never exposed to client
2. **Performance**: Edge computing reduces latency
3. **Scalability**: Serverless auto-scales with demand
4. **Cost-Effective**: Pay only for actual usage
5. **Separation of Concerns**: Backend logic isolated from frontend

### Cloudflare Worker Endpoints

#### 1. POST `/api/parse-resume`

**Purpose**: Parse resume text into structured portfolio data

**Request**:
```json
{
  "resumeText": "string - full resume content"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "personal": {
      "name": "Full Name",
      "title": "Job Title",
      "email": "email@example.com",
      "phone": "+1 (555) 123-4567",
      "location": "City, State",
      "linkedin": "linkedin.com/in/username",
      "github": "github.com/username",
      "website": "personal-website.com"
    },
    "about": "Professional bio...",
    "skills": ["Skill 1", "Skill 2", ...],
    "experience": [
      {
        "title": "Job Title",
        "company": "Company Name",
        "location": "City, State",
        "period": "2023 - Present",
        "points": ["Achievement 1", "Achievement 2", ...]
      }
    ],
    "projects": [
      {
        "name": "Project Name",
        "description": "Description...",
        "tech": ["Tech 1", "Tech 2", ...]
      }
    ],
    "education": [
      {
        "degree": "Degree Name",
        "school": "School Name",
        "location": "City, State",
        "year": "2019",
        "gpa": "3.8"
      }
    ]
  }
}
```

**Claude Prompt Strategy**:
- System prompt: Define role as resume parser
- User prompt: Resume text + instructions to extract structured JSON
- Use JSON schema in prompt for consistent output
- Handle edge cases (missing sections, unusual formats)

#### 2. POST `/api/enhance-content`

**Purpose**: Enhance specific portfolio content with AI

**Request**:
```json
{
  "type": "bio" | "bullet-point" | "project-description",
  "content": "original content",
  "context": {
    // Additional context for enhancement
    // e.g., for bio: full experience array
    // e.g., for bullet: job title and company
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "original": "original content",
    "enhanced": "enhanced content"
  }
}
```

**Enhancement Prompts**:

1. **Bio Generation**:
   - Input: Experience array
   - Output: 2-3 sentence professional summary
   - Tone options: professional, friendly, creative

2. **Bullet Point Rewriting**:
   - Input: Single bullet point + job context
   - Output: Action-oriented, quantifiable statement
   - Focus: STAR method (Situation, Task, Action, Result)

3. **Project Description**:
   - Input: Project name, description, tech stack
   - Output: Clearer, more engaging description
   - Focus: Impact, problem solved, technologies used

### Implementation Details

#### Worker Structure (workers/src/)

```javascript
// index.js - Main entry point
export default {
  async fetch(request, env) {
    // Route handling
    // CORS headers
    // Error handling
  }
}

// parser.js - Resume parsing logic
export async function parseResume(resumeText, apiKey) {
  // Call Claude API
  // Parse response
  // Return structured data
}

// enhancer.js - Content enhancement logic
export async function enhanceContent(type, content, context, apiKey) {
  // Call Claude API with appropriate prompt
  // Return enhanced content
}
```

#### Environment Variables

Set in Cloudflare Workers dashboard or wrangler.toml:
```toml
[vars]
CLAUDE_API_KEY = "sk-ant-..." # Stored as secret
ALLOWED_ORIGINS = "https://your-domain.com,http://localhost:5173"
```

#### Error Handling

- API rate limits: Implement retry logic with exponential backoff
- Invalid resume format: Return helpful error messages
- Claude API errors: Graceful degradation with user-friendly messages
- CORS errors: Proper header configuration

#### Testing Strategy

1. **Local Development**: Use Wrangler dev mode
2. **Unit Tests**: Test parser/enhancer functions
3. **Integration Tests**: Test full endpoint flow
4. **Load Testing**: Ensure performance under load

### Claude API Usage

#### Model Selection
- **Model**: `claude-3-5-sonnet-20241022` (or latest)
- **Why Sonnet**: Balance of speed, cost, and quality
- **Consider Haiku**: For faster/cheaper operations if quality is sufficient

#### Rate Limits & Costs
- Monitor API usage in Anthropic dashboard
- Implement caching for common resume patterns (optional)
- Consider request batching for multiple enhancements

#### Prompt Engineering Best Practices
1. **Be specific**: Clear instructions for output format
2. **Use examples**: Show desired output structure
3. **Constrain output**: Request JSON for easy parsing
4. **Handle errors**: Anticipate edge cases in prompts
5. **Iterate**: Test and refine prompts based on results

---

## Recent Work

### Spark Template Transformation (February 2026)

The Spark template underwent a complete redesign from a gradient-based playful theme to a neobrutalism design system. This work was completed over multiple iterations with the following changes:

#### Phase 1: Initial Neobrutalism Transformation
- Replaced gradient backgrounds with solid colors
- Implemented bold black borders (2-3px) throughout
- Added 3D box shadows (4-6px offset) to all cards and elements
- Changed font from Poppins to Inter
- Updated color palette to yellow, white, black with vibrant accents

#### Phase 2: Animations and Personality
- Added floating badges to hero section (Creative, Designer, Innovator)
- Implemented extensive CSS animations:
  - Floating, pulsing, rotating, bouncing effects
  - Staggered delays for wave effects
  - Hover interactions on all interactive elements
- Added decorative elements (shapes, emojis, gradients)

#### Phase 3: Bug Fixes and Refinements
1. **Icon Size Issue**: "Get in touch" icon was too small
   - **Fix**: Increased from 1rem to 1.25rem ([Spark.css:374](src/templates/Spark/Spark.css))

2. **Missing GitHub Icon**: GitHub button had no icon
   - **Fix**: Added 💻 laptop emoji ([Spark.jsx:187](src/templates/Spark/Spark.jsx))

3. **Floating Badge Visibility**: Badges not visible on yellow background
   - **Fix**: Changed to green (#10b981), pink (#ec4899), purple (#8b5cf6) with white text ([Spark.css:178-200](src/templates/Spark/Spark.css))

4. **Navigation Color**: Nav bar yellow like hero, no contrast
   - **Fix**: Changed to white background ([Spark.css:55](src/templates/Spark/Spark.css))

5. **Button Spacing**: Buttons too close to about text
   - **Fix**: Increased margin-bottom to 2.5rem ([Spark.css:322](src/templates/Spark/Spark.css))

6. **Name Highlight**: "J" in Jordan Rivers had unwanted highlight
   - **Fix**: Removed highlight span ([Spark.jsx:136](src/templates/Spark/Spark.jsx))

7. **Skills Animation**: Skills section was static
   - **Fix**: Added continuous float-skill animation with wave effect using staggered delays ([Spark.css:595-629](src/templates/Spark/Spark.css))

8. **Sticky Navigation Issue**: Navbar lost sticky behavior
   - **Fix 1**: Added -webkit-sticky prefix and box-shadow ([Spark.css:51-58](src/templates/Spark/Spark.css))
   - **Fix 2**: Removed overflow-x: hidden from .spark-template which broke sticky positioning ([Spark.css:4-11](src/templates/Spark/Spark.css))

#### Files Modified
- [src/templates/Spark/Spark.jsx](src/templates/Spark/Spark.jsx)
- [src/templates/Spark/Spark.css](src/templates/Spark/Spark.css)

---

## Known Issues & Fixes

### Sticky Positioning and Overflow

**Issue**: CSS `position: sticky` doesn't work when parent elements have `overflow` properties set (`overflow: hidden`, `overflow: auto`, `overflow: scroll`).

**Root Cause**: The Spark template had `overflow-x: hidden` on the `.spark-template` container, which prevented the navigation from sticking.

**Solution**:
1. Remove `overflow-x: hidden` from `.spark-template`
2. Ensure no parent containers have overflow restrictions
3. Add vendor prefix `-webkit-sticky` for Safari compatibility
4. Add visual separation with `box-shadow` when sticky

**Code Reference**: [Spark.css:4-58](src/templates/Spark/Spark.css)

### Cross-Browser Compatibility

Always include vendor prefixes for cutting-edge CSS features:
- `-webkit-sticky` for sticky positioning
- Test in Safari, Chrome, Firefox, Edge

### Performance Considerations

The Spark template has many animations running simultaneously:
- **Solution**: Use `will-change` for animated properties (currently not implemented, could be added)
- **Solution**: Reduce animations on mobile devices (implemented in responsive styles)
- **Solution**: Use `transform` and `opacity` for animations (already implemented) as they're GPU-accelerated

---

## Development Guidelines

### Getting Started

1. **Clone and Install**
```bash
git clone <repository-url>
cd CareerCanvas
npm install
```

2. **Run Development Server**
```bash
npm run dev
```
Opens at `http://localhost:5173`

3. **Build for Production**
```bash
npm run build
```
Output in `dist/` directory

4. **Preview Production Build**
```bash
npm run preview
```

### Code Style Guidelines

#### React Components
- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use descriptive prop names

#### CSS Conventions
- Use BEM-like naming: `.component-element--modifier`
- Scope all styles to component class
- Mobile-first responsive design
- Use CSS custom properties for theming
- Animations: Name clearly (e.g., `float-skill`, `bounce-emoji`)

#### File Organization
- Each component in own folder with .jsx and .css
- Templates in templates/ folder
- Pages in pages/ folder
- Shared components in components/ folder

### Working with Templates

Each template is a self-contained React component:

1. **Structure** ([template]/[template].jsx):
   - Import React hooks (useState, useEffect)
   - Implement scroll tracking for navigation
   - Define portfolio data structure
   - Render sections (hero, about, skills, experience, projects, education, footer)

2. **Styling** ([template]/[template].css):
   - Import Google Fonts at top
   - Define base template class
   - Style all sections
   - Define animations with @keyframes
   - Add responsive styles with @media queries

3. **Data Structure**:
```javascript
const portfolioData = {
  name: "Full Name",
  title: "Job Title",
  email: "email@example.com",
  phone: "+1 (555) 123-4567",
  location: "City, State",
  linkedin: "linkedin.com/in/username",
  github: "github.com/username",
  website: "personal-website.com",
  about: "Bio paragraph...",
  skills: ["Skill 1", "Skill 2", ...],
  experience: [{
    title: "Job Title",
    company: "Company Name",
    location: "City, State",
    period: "2023 - Present",
    points: ["Achievement 1", "Achievement 2", ...]
  }],
  projects: [{
    name: "Project Name",
    description: "Description...",
    tech: ["Tech 1", "Tech 2", ...],
    emoji: "🎨"
  }],
  education: [{
    degree: "Degree Name",
    school: "School Name",
    location: "City, State",
    year: "2019"
  }]
}
```

### Adding a New Template

1. Create new folder in `src/templates/[TemplateName]/`
2. Create `[TemplateName].jsx` and `[TemplateName].css`
3. Implement component with same data structure
4. Add route in `App.jsx`:
```javascript
<Route path="/templates/templatename" element={<TemplateName />} />
```
5. Add preview image to `src/assets/`
6. Update Home.jsx to showcase new template

### Testing Checklist

Before committing changes:
- [ ] Test in Chrome, Firefox, Safari, Edge
- [ ] Test on mobile devices (or Chrome DevTools device mode)
- [ ] Verify all animations work smoothly
- [ ] Check sticky navigation on scroll
- [ ] Verify all links work
- [ ] Test hover states on all interactive elements
- [ ] Ensure text is readable (contrast, size)
- [ ] Check for console errors
- [ ] Verify responsive design at various breakpoints

---

## Deployment

### Cloudflare Worker Deployment (Backend - Required First)

**Prerequisites:**
1. Cloudflare account (free tier available)
2. Anthropic API key (get from console.anthropic.com)

**Steps:**

1. **Install Wrangler CLI**
```bash
npm install -g wrangler
wrangler login
```

2. **Set Environment Variables**
```bash
cd workers
npx wrangler secret put CLAUDE_API_KEY
# Enter your Claude API key when prompted
```

3. **Update wrangler.toml**
```toml
name = "careercanvas-worker"
main = "src/index.js"
compatibility_date = "2024-01-01"

[vars]
ALLOWED_ORIGINS = "https://your-domain.com"
```

4. **Deploy Worker**
```bash
npx wrangler deploy
```

5. **Note the Worker URL**
- You'll get a URL like: `https://careercanvas-worker.your-subdomain.workers.dev`
- Update frontend API client to use this URL

### Frontend Deployment

### Build Process

1. **Update API Endpoint**
   - Edit `src/utils/api.js` to point to your deployed Worker URL

2. **Run Production Build**
```bash
npm run build
```

3. **Build Output**
- Creates `dist/` folder with optimized files
- HTML, CSS, JS are minified
- Assets are hashed for cache busting

4. **Preview Build Locally**
```bash
npm run preview
```

### Frontend Deployment Options

#### Option 1: Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Auto-deploy on push to main branch
3. Framework preset: Vite
4. Build command: `npm run build`
5. Output directory: `dist`

#### Option 2: Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy on push to main

#### Option 3: GitHub Pages
1. Add to `package.json`:
```json
"homepage": "https://username.github.io/careercanvas",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Deploy: `npm run deploy`

#### Option 4: Custom Server
1. Build: `npm run build`
2. Copy `dist/` contents to web server
3. Configure server for SPA routing (serve index.html for all routes)

---

## Project Roadmap

### How to Use This Roadmap

When you (Claude) are asked "What is my next task?" or "What should I work on next?":
1. Look at the **Current Sprint / High Priority** section below
2. Identify the FIRST unchecked task
3. Present it to the user and ask for confirmation
4. Upon confirmation, work on that task
5. After completion, mark it as ✅ and update the Last Updated date

### Completed Tasks ✅

#### Foundation & Setup (Completed)
- ✅ Project initialization with React + Vite
- ✅ React Router setup for SPA navigation
- ✅ Landing page (Home) with hero section
- ✅ Template showcase section
- ✅ Features section
- ✅ Stats section

#### Template Development (Completed)
- ✅ Aurora template - Clean minimal design
- ✅ Nebula template - Professional dark theme
- ✅ Spark template - Initial version
- ✅ Spark template - Neobrutalism redesign (February 2026)
  - ✅ Changed from gradient to neobrutalism design
  - ✅ Implemented bold borders and 3D shadows
  - ✅ Changed font from Poppins to Inter
  - ✅ Added floating badges (Creative, Designer, Innovator)
  - ✅ Added extensive animations (20+ keyframe animations)
  - ✅ Fixed icon sizes (Get in touch icon)
  - ✅ Added GitHub icon (💻)
  - ✅ Fixed floating badge visibility
  - ✅ Changed navbar to white background
  - ✅ Fixed button spacing
  - ✅ Removed unwanted highlight from name
  - ✅ Added skills animation with wave effect
  - ✅ Fixed sticky navigation (overflow issue)

#### Components (Completed)
- ✅ Header component with navigation
- ✅ Footer component
- ✅ Button component with variants
- ✅ Container component for layout

#### Documentation (Completed)
- ✅ README.md with project overview
- ✅ claude.md comprehensive documentation
- ✅ Roadmap with completed/pending tasks

---

### Current Sprint / High Priority 🎯

**These are the NEXT tasks to work on, in order of priority:**

#### 1. Cloudflare Worker Setup (HIGH PRIORITY - NEXT TASK)
- [ ] **NEXT TASK**: Set up Cloudflare Worker project
  - Initialize Worker project with Wrangler
  - Set up project structure (workers/ directory)
  - Configure wrangler.toml
  - Set up environment variables for Claude API key
  - Test basic "Hello World" endpoint

- [ ] Implement Claude API integration in Worker
  - Install @anthropic-ai/sdk or use fetch API
  - Create parser.js for resume parsing
  - Design prompt for extracting structured data from resume text
  - Handle API errors and rate limiting
  - Return structured JSON response

- [ ] Create `/api/parse-resume` endpoint
  - Accept POST request with resume text
  - Send text to Claude API with parsing prompt
  - Parse Claude's response into structured data format
  - Validate and sanitize output
  - Return JSON with sections: personal, bio, skills, experience, projects, education

- [ ] Deploy Cloudflare Worker
  - Deploy to production using Wrangler
  - Set up CORS for frontend access
  - Configure custom domain (optional)
  - Test endpoint from frontend

#### 2. Resume Upload & Text Extraction (HIGH PRIORITY)
- [ ] Complete Upload page UI
  - Design file upload dropzone
  - Add drag-and-drop functionality
  - Add file type validation (PDF, DOCX)
  - Show upload progress
  - Add text paste option
  - Loading states during processing

- [ ] Implement client-side text extraction
  - PDF extraction with pdfjs-dist
  - DOCX extraction with mammoth
  - Handle multi-page documents
  - Error handling for corrupted files
  - Display extracted text preview (optional)

- [ ] Connect Upload to CF Worker
  - Create API client utility (src/utils/api.js)
  - Send extracted text to `/api/parse-resume`
  - Handle loading states
  - Display parsing errors to user
  - Store parsed data in React state

- [ ] State management for parsed data
  - Store parsed resume data in React Context or state
  - Make data accessible to Preview page
  - Handle data persistence (localStorage)
  - Allow navigation to Preview page after parsing

#### 3. Template Preview & Selection
- [ ] Complete Preview page
  - Template selection interface
  - Side-by-side template comparison
  - Live data preview with parsed resume
  - Template switching functionality
  - Real-time content editing (optional)

- [ ] Template data injection
  - Pass parsed data to all templates
  - Handle missing data gracefully
  - Default placeholder values
  - Support dynamic data updates

#### 4. AI Content Enhancement (HIGH PRIORITY)
- [ ] Create `/api/enhance-content` endpoint in CF Worker
  - Accept content type (bio, bullet-point, project-description)
  - Accept original content and context
  - Send to Claude API with enhancement prompts
  - Return enhanced content

- [ ] Design enhancement prompts
  - Bio generation prompt (from experience data)
  - Bullet point rewriting prompt (action-oriented, quantifiable)
  - Project description improvement prompt
  - Test and refine prompts for quality

- [ ] Build "Enhance with AI" UI component
  - Modal or sidebar interface
  - Enhancement options (bio, bullets, projects)
  - Before/after comparison view
  - Accept/Reject buttons for each enhancement
  - Loading states during AI processing

- [ ] Implement enhancement logic in Preview page
  - "Enhance with AI" button in Preview
  - Select which sections to enhance
  - Call CF Worker endpoint
  - Display results in comparison view
  - Update portfolio data on acceptance
  - Undo functionality

- [ ] Polish enhancement UX
  - Smooth transitions
  - Progress indicators
  - Error handling
  - Success feedback
  - Keyboard shortcuts (accept/reject)

#### 5. Export & Download
- [ ] Implement export functionality
  - Generate standalone HTML file with embedded CSS
  - Bundle all assets inline
  - Create downloadable ZIP file
  - Add "Copy HTML" button

#### 6. Additional Templates
- [ ] Design and implement Template #4
  - Choose design direction (minimalist, bold, corporate, etc.)
  - Implement React component
  - Add to routing and preview

- [ ] Design and implement Template #5
  - Different aesthetic from other templates
  - Unique animations and interactions

---

### Future Backlog 📋

#### User Features (Medium Priority)
- [ ] User authentication for saving portfolios
  - Sign up / Login with email
  - OAuth (Google, GitHub)
  - User dashboard

- [ ] Portfolio management
  - Save multiple portfolios
  - Edit existing portfolios
  - Delete portfolios

- [ ] Custom domain mapping
  - Allow users to map custom domains
  - CNAME configuration guide

- [ ] Theme customization
  - Color picker for accent colors
  - Font selector (Google Fonts)
  - Layout options (section order)

- [ ] Section reordering
  - Drag-and-drop section reordering
  - Show/hide sections toggle

- [ ] Export options
  - Export to PDF
  - Export to markdown
  - Share via unique URL

#### Technical Improvements (Low-Medium Priority)
- [ ] Testing
  - Add unit tests (Jest, React Testing Library)
  - Component tests for all templates
  - Integration tests for upload flow
  - E2E tests with Playwright/Cypress

- [ ] Performance
  - Code splitting and lazy loading
  - Image optimization
  - Bundle size optimization
  - Lighthouse score > 90

- [ ] Development
  - Implement CI/CD pipeline (GitHub Actions)
  - Add TypeScript for type safety
  - ESLint and Prettier configuration
  - Pre-commit hooks with Husky

- [ ] Progressive Web App
  - Add service worker
  - Offline mode support
  - Install prompt
  - App manifest

- [ ] Accessibility
  - ARIA labels throughout
  - Keyboard navigation
  - Screen reader support
  - WCAG 2.1 Level AA compliance

- [ ] Monitoring
  - Analytics integration (Google Analytics or Plausible)
  - Error tracking (Sentry)
  - Performance monitoring
  - User feedback system

#### Template Enhancements (Low Priority)
- [ ] Animation controls
  - Toggle animations on/off
  - Reduce motion support
  - Animation speed control

- [ ] Print styles
  - Print-friendly CSS for all templates
  - Page break control
  - Simplified layout for printing

- [ ] Dark mode
  - Dark mode toggle for all templates
  - System preference detection
  - Persistent theme choice

- [ ] Additional sections
  - Testimonials/recommendations section
  - Blog/articles section
  - Portfolio image gallery
  - Video background support
  - Certifications section
  - Languages section
  - Volunteer work section

#### Marketing & SEO (Low Priority)
- [ ] SEO optimization
  - Meta tags per template
  - Open Graph tags
  - Twitter Cards
  - Sitemap generation
  - robots.txt

- [ ] Social features
  - Social media sharing buttons
  - Preview images for sharing
  - LinkedIn integration

- [ ] Blog/Content
  - Tips for resume writing
  - Portfolio examples
  - Design inspiration

---

### Task Status Legend

- ✅ **Completed**: Task is done and tested
- 🎯 **Current Sprint**: High priority, work on these next
- 📋 **Future Backlog**: Planned but not started
- [ ] **Pending**: Not yet started
- 🚧 **In Progress**: Currently being worked on (mark manually)

### Updating This Roadmap

When a task is completed:
1. Change `- [ ]` to `- ✅`
2. Move from current section to "Completed Tasks" if it's a major milestone
3. Update the "Last Updated" date at bottom
4. Add any new discovered tasks to appropriate section

When starting a new task:
1. Change `- [ ]` to `- 🚧` (optional, for visibility)
2. When done, change to `- ✅`

---

## Contact & Support

For questions or contributions, please refer to the project repository or contact the development team.

---

**Last Updated**: February 5, 2026 (Updated: AI Integration Architecture)
**Version**: 1.1.0 (Added: Cloudflare Worker + Claude API Integration)
**Status**: Active Development

---

## Quick Reference

### Important Files

**Frontend:**
- **App.jsx**: Main routing configuration
- **Home.jsx**: Landing page with template showcase
- **Upload.jsx**: Resume upload and parsing
- **Preview.jsx**: Template preview and selection
- **src/utils/api.js**: API client for CF Worker communication
- **Spark.jsx**: Spark template component (recently updated)
- **Spark.css**: Spark template styles (recently updated)

**Backend (Cloudflare Workers):**
- **workers/src/index.js**: Main worker entry point and routing
- **workers/src/parser.js**: Resume parsing with Claude API
- **workers/src/enhancer.js**: Content enhancement with Claude API
- **workers/wrangler.toml**: Worker configuration

### Key Commands

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

**Cloudflare Worker:**
```bash
cd workers
npx wrangler dev              # Run worker locally
npx wrangler deploy           # Deploy to production
npx wrangler tail             # View live logs
npx wrangler secret put CLAUDE_API_KEY  # Set API key
```

### Color Palette Reference (Spark Template)
```css
--bg-primary: #fdfaf2
--bg-yellow: #ffe46a
--text-dark: #1f2937
--text-medium: #374151
--accent-green: #10b981
--accent-pink: #ec4899
--accent-purple: #9333EA
--accent-blue: #0ea5e9
--black: #000
--white: #fff
```

### Important CSS Classes (Spark Template)
```css
.spark-template        /* Main container */
.spark-nav            /* Sticky navigation */
.spark-header         /* Hero section */
.spark-floating-badge /* Animated badges */
.spark-skill-bubble   /* Skills with animation */
.spark-experience-card /* Experience cards */
.spark-project-card   /* Project cards */
.spark-education-card /* Education cards */
```

---

**End of Documentation**
