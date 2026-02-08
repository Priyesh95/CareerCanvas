# CareerCanvas Cloudflare Worker

This folder contains the Cloudflare Worker script for CareerCanvas's AI-powered resume parsing and content enhancement.

## 📋 What This Worker Does

- **Parses resumes** using Claude API (Sonnet 4.5)
- **Enhances content** (bio generation, bullet point rewriting, project descriptions)
- **Secures API keys** (never exposed to frontend)
- **Handles CORS** for cross-origin requests

## 🚀 Deployment Instructions

### Step 1: Copy the Worker Code

1. Open [worker.js](./worker.js)
2. Select all and copy (Cmd+A, Cmd+C on Mac)

### Step 2: Deploy to Cloudflare

1. Go to https://dash.cloudflare.com/
2. Sign up or log in (free tier is sufficient)
3. Click **"Workers & Pages"** in the left sidebar
4. Click **"Create Application"**
5. Click **"Create Worker"**
6. Name it: `careercanvas-worker` (or any name you prefer)
7. In the code editor, **delete the default code**
8. **Paste the code** from worker.js
9. Click **"Save and Deploy"**

### Step 3: Set Environment Variable

1. In your worker dashboard, click **"Settings"** tab
2. Click **"Variables and Secrets"**
3. Under "Environment Variables", click **"Add variable"**
4. Set:
   - **Variable name**: `CLAUDE_API_KEY`
   - **Value**: Your Claude API key (get it from https://console.anthropic.com/)
5. **Important**: Click **"Encrypt"** to make it a secret
6. Click **"Deploy"** to apply changes

### Step 4: Get Your Worker URL

After deployment, you'll see your worker URL:
```
https://careercanvas-worker.YOUR-SUBDOMAIN.workers.dev
```

**Copy this URL** - you'll need it for the frontend configuration!

## 🧪 Testing Your Worker

### Test 1: Health Check

Open in browser or use curl:
```bash
curl https://YOUR-WORKER-URL.workers.dev/
```

Expected response:
```json
{
  "status": "online",
  "service": "CareerCanvas Worker",
  "version": "1.0.0",
  "endpoints": {
    "health": "GET /",
    "parseResume": "POST /api/parse-resume",
    "enhanceContent": "POST /api/enhance-content"
  }
}
```

### Test 2: Parse Resume

```bash
curl -X POST https://YOUR-WORKER-URL.workers.dev/api/parse-resume \
  -H "Content-Type: application/json" \
  -d '{
    "resumeText": "John Doe\nSoftware Engineer\njohn@example.com\n+1-555-0123\nNew York, NY\n\nSkills: JavaScript, React, Node.js\n\nExperience:\nSenior Developer at Tech Corp\nJan 2020 - Present\n- Led team of 5 engineers\n- Built scalable web applications"
  }'
```

Expected: Structured JSON with personal info, skills, experience, etc.

### Test 3: Enhance Content

```bash
curl -X POST https://YOUR-WORKER-URL.workers.dev/api/enhance-content \
  -H "Content-Type: application/json" \
  -d '{
    "type": "bullet-point",
    "content": "Worked on the website",
    "context": {
      "jobTitle": "Frontend Developer",
      "company": "Tech Corp"
    }
  }'
```

Expected: Enhanced bullet point with action verbs and impact.

## 📡 API Endpoints

### `GET /`
Health check endpoint.

**Response:**
```json
{
  "status": "online",
  "service": "CareerCanvas Worker",
  "version": "1.0.0"
}
```

### `POST /api/parse-resume`
Parse resume text into structured portfolio data.

**Request:**
```json
{
  "resumeText": "string - full resume content"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "personal": { ... },
    "about": "...",
    "skills": [...],
    "experience": [...],
    "projects": [...],
    "education": [...]
  }
}
```

### `POST /api/enhance-content`
Enhance specific content with AI.

**Request:**
```json
{
  "type": "bio" | "bullet-point" | "project-description",
  "content": "original content",
  "context": { ... }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "type": "bio",
    "original": "...",
    "enhanced": "..."
  }
}
```

## 🔧 Configuration

### Environment Variables

- **CLAUDE_API_KEY** (required): Your Anthropic API key

### CORS Settings

By default, CORS is set to `*` (allow all origins). For production, update line 27 in worker.js:

```javascript
'Access-Control-Allow-Origin': 'https://your-domain.com',
```

## 🐛 Troubleshooting

### Error: "API key not configured"
- Make sure you added `CLAUDE_API_KEY` in Settings → Variables
- Ensure you clicked "Encrypt" and "Deploy"

### Error: "Claude API returned 401"
- Your API key is invalid or expired
- Get a new key from https://console.anthropic.com/

### Error: "CORS error" in browser
- Check that CORS headers are properly set
- Verify `Access-Control-Allow-Origin` includes your domain

### JSON Parse Error
- The AI returned invalid JSON
- Check the resume text isn't too complex
- Try with a simpler resume first

## 💰 Cost Estimate

- **Cloudflare Workers**: Free tier (100,000 requests/day)
- **Claude API**: ~$0.01-0.05 per resume parse
- **Monthly estimate**: $5-25 for 1,000 users (depending on usage)

## 📊 Monitoring

View logs and analytics:
1. Go to your worker in Cloudflare dashboard
2. Click "Logs" tab (real-time logs)
3. Click "Analytics" tab (request metrics)

## 🔒 Security Notes

- ✅ API key is encrypted and never exposed to clients
- ✅ CORS is configured for security
- ✅ Input validation on all endpoints
- ⚠️ Update CORS origin to your domain in production
- ⚠️ Consider rate limiting for production use

## 📝 Next Steps

After deploying your worker:

1. **Copy the worker URL**
2. **Update frontend** to use this URL (in `src/utils/api.js`)
3. **Test from frontend** to ensure connection works
4. **Update CORS** settings for production

## 📚 Additional Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Claude API Docs](https://docs.anthropic.com/)
- [CareerCanvas Project Docs](../claude.md)

---

**Questions?** Check the main project documentation in [claude.md](../claude.md)
