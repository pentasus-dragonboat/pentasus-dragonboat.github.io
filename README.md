# PENTASUS Dragon Boat Team Website



```plaintext
pentasus-dragon-boat/
├── .github/
│   └── workflows/
│       └── deploy.yml              # (Optional) GitHub Actions for auto-deployment
├── components/
│   ├── Navigation.tsx              # Navigation bar component
│   ├── HeroSection.tsx            # Hero/landing section
│   ├── AthletesSection.tsx        # Team members display
│   ├── AdminSection.tsx           # Admin team display
│   ├── NewsSection.tsx            # News articles grid
│   ├── NewsModal.tsx              # News detail modal
│   ├── SponsorsSection.tsx        # Sponsors grid
│   ├── ContactSection.tsx         # Contact/CTA section
│   └── Footer.tsx                 # Footer component
├── content/
│   ├── news/
│   │   ├── 2024-12-15-regional-championship.md
│   │   ├── 2024-11-28-elite-training.md
│   │   └── 2024-11-10-partnership.md
│   ├── team.yml                  # Athletes data
│   ├── admin.yml                 # Admin team data
│   ├── site.yml                 
│   └── sponsors.yml              # Sponsors data
├── lib/
│   ├── markdown.ts               # Markdown processing utility
│   └── content.ts                # Content loading functions
├── pages/
│   ├── _app.tsx                  # Next.js app wrapper
│   └── index.tsx                 # Main homepage
├── public/
│   ├── images/                
│   │   ├── alumni             # universities logo on the bottom, fudan.png, tongji.png, shanghaicai.png
│   │   ├── hero              
│   │   └── news
│   └── .nojekyll                 # GitHub Pages Jekyll bypass
├── styles/
│   └── globals.css               # Global Tailwind CSS styles
├── .gitignore                    # Git ignore file
├── next.config.js                # Next.js configuration
├── next-env.d.ts
├── package.json                  # NPM dependencies & scripts
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js
└── tsconfig.json                 # TypeScript configuration
```

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pentasus-dragonboat/pentasus-dragonboat.github.io.git
   cd pentasus-dragonboat.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## Theme Configuration

The website automatically switches themes based on the hero background image setting in `content/site.yml`:

```yaml
hero:
  # Minimalist Mode: Set image path
  backgroundImage: "/images/hero/hero.jpg"
  
  # Cartoon Mode: Leave empty
  # backgroundImage: ""
```

## Content Management

### Team Members
Edit `content/team.yml` and `content/admin.yml`:
```yaml
- id: 1
  name: "John Doe"
  role: "Captain"
  motto: "Excellence through teamwork"
  image: "/images/athletes/john.jpg"  # Optional
  dicebear:  # Fallback avatar
    avatar: "John"
    avatarBg: "fd79a8"
    avatarEyes: "a29bfe"
```

### News Articles
Add markdown files to `content/news/`:
```markdown
---
title: "Championship Victory"
date: "2024-12-15"
category: "Achievement"
featured: true
images:
  - "/images/news/victory.jpg"
---

Your article content here...
```

### Site Configuration
Modify `content/site.yml` for global settings, navigation, and contact information.

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run export   # Export static files
npm run deploy   # Build and deploy to GitHub Pages
```

## Deployment

### GitHub Pages (Automatic)

1. **Update `next.config.js`** with your repo name:
   ```js
   const repo = 'pentasus-dragonboat.github.io';
   ```

2. **Deploy**:
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages** in repository settings pointing to `gh-pages` branch.

## Project Structure

```
pentasus-dragon-boat/
├── components/          # React components
├── content/            # Content files (YAML/Markdown)
│   ├── news/          # News articles
│   ├── team.yml       # Athletes data
│   ├── admin.yml      # Admin team data
│   ├── site.yml       # Site configuration
│   └── sponsors.yml   # Sponsors data
├── lib/               # Utilities and content loading
├── pages/             # Next.js pages
├── public/            # Static assets
├── styles/            # Global styles
└── utils/             # Helper functions
```

## Adding Content

### New Team Member
1. Add photo to `public/images/athletes/`
2. Update `content/team.yml` with member details

### New News Article
1. Create `content/news/YYYY-MM-DD-title.md`
2. Add images to `public/images/news/`
3. The article will automatically appear on the homepage

### New Sponsor
1. Add logo to `public/images/sponsors/`
2. Update `content/sponsors.yml`

## Support

For questions or issues, please open a GitHub issue or contact the development team.

## License

MIT License - see [LICENSE](LICENSE) file for details.

