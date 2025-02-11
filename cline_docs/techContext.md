# Technical Context

## Technologies Used

### Core Dependencies
- Node.js and npm for package management
- Current dependencies:
  ```json
  {
    "@inquirer/prompts": "^7.2.0",  // Interactive CLI prompts
    "axios": "^1.7.9",              // HTTP client
    "dotenv": "^16.4.7",            // Environment configuration
    "minimatch": "^10.0.1"          // File pattern matching
  }
  ```

### Development Tools
- Code Analysis Tool (codeSummary.mjs)
  - Uses OpenRouter API for code analysis
  - Generates Markdown documentation
  - Supports interactive file selection

### Planned Technologies
Frontend:
- React/Next.js (planned)
- Modern CSS tooling
- State management solution

Backend:
- Node.js/Express (planned)
- RESTful API architecture
- Email processing libraries

## Development Setup

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm (Comes with Node.js)
- Git for version control

### Environment Configuration
Required environment variables:
```env
OPENROUTER_API_KEY=your_api_key
YOUR_SITE_URL=your_site_url
YOUR_SITE_NAME=your_site_name
```

### Installation Steps
1. Clone repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in .env file
4. Start development servers (once implemented):
   - Frontend: TBD
   - Backend: TBD

## Technical Constraints
- Must maintain separation between frontend and backend
- Environment variables required for API keys and configuration
- Code analysis tool requires OpenRouter API access
- Node modules need to be reinstalled after deletion
