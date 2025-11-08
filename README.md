# Work Vibe

An AI-powered company vibe checker that automates the tedious process of researching company culture and work environment. This tool uses Reddit data to analyze what people are saying about companies, helping you make informed decisions during your job search.

Read more about how this project was built: [How I built an AI-Powered Company Vibe Checker](https://www.juanireyes.com/projects/work-vibe-ai-powered-company-vibe-checker)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

### API Keys

You need to add the following environment variables to your `.env.local` file:

- **AI Model API Key** (choose one):
  - `GOOGLE_API_KEY` - For Google models (e.g., `gemini-2.5-flash`)
  - `OPENAI_API_KEY` - For OpenAI models (e.g., `gpt-4o-mini`)
- **Reddit API Credentials** (optional):
  - `REDDIT_CLIENT_ID` - Your Reddit API client ID (not required, but recommended for higher rate limits)
  - `REDDIT_CLIENT_SECRET` - Your Reddit API client secret (not required, but recommended for higher rate limits)
- **API URL**:
  - `NEXT_PUBLIC_API_URL` - The base URL for your API (e.g., `http://localhost:3000` for local development)

Example `.env.local`:
```
# AI Model API Key (choose one)
GOOGLE_API_KEY=your_google_api_key_here
# or
OPENAI_API_KEY=your_openai_api_key_here

# Reddit API Credentials (optional - recommended for higher rate limits)
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret

# API URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Switching Models

To switch between models, edit `/app/api/chat/route.ts`:

**Using Google (default):**
```typescript
import { google } from "@ai-sdk/google";

// In the streamText call:
model: google("gemini-2.5-flash"),
```

**Switching to OpenAI:**
```typescript
import { openai } from "@ai-sdk/openai";

// In the streamText call:
model: openai("gpt-4o-mini"),
```

Make sure to comment out the model you're not using and uncomment the one you want to use.

## Contributing

All contributions are welcome! Feel free to open issues, submit pull requests, or suggest improvements.
