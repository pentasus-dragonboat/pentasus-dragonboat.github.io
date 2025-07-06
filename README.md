# PENTASUS Dragon Boat Team Website


## TODO
- [x] Modularize components
- [ ] Add more team members
- [ ] Improve documentation
- [ ] Optimize images fallback handling
- [ ] Optimize team/admin same member handling

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


## Project Structure

```plaintext
pentasus-dragon-boat/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── components/
│   ├── common/                          
│   │   ├── ProfileSection/
│   │   │   ├── ProfileSection.tsx      
│   │   │   └── ProfileCard.tsx         
│   │   ├── SectionHeader/
│   │   │   ├── SectionHeader.tsx       
│   │   │   └── DecorativeShapes.tsx    
│   │   ├── SmartImage/
│   │   │   ├── SmartProfileImage.tsx  
│   │   │   └── index.ts               
│   │   ├── DevTools/
│   │   │   └── DevTools.tsx            
│   │   └── index.ts                    
│   ├── modals/                         
│   │   ├── ImageModal.tsx              
│   │   └── NewsModal.tsx               
│   ├── sections/                       
│   │   ├── AthletesSection.tsx         
│   │   └── AdminSection.tsx            
│   ├── Navigation.tsx                 
│   ├── HeroSection.tsx               
│   ├── NewsSection.tsx                 
│   ├── SponsorsSection.tsx             
│   ├── ContactSection.tsx            
│   ├── Footer.tsx                      
│   └── Logo.tsx                      
├── content/                           
│   ├── news/
│   │   ├── 2025-01-10-partnership-expansion.md
│   │   ├── 2025-02-15-championship-victory.md
│   │   └── 2025-11-28-elite-training-program.md
│   ├── team.yml
│   ├── admin.yml
│   ├── site.yml
│   └── sponsors.yml
├── lib/
│   ├── content/                        
│   │   ├── types.ts                    
│   │   ├── loaders.ts                  
│   │   ├── processors.ts               
│   │   ├── siteConfig.ts               
│   │   └── index.ts                    
│   ├── theme/                        
│   │   ├── detection.ts                
│   │   ├── styles.ts                   
│   │   ├── layout.ts                 
│   │   └── index.ts                    
│   ├── utils/                         
│   │   ├── image.ts                    
│   │   ├── profile.ts                  
│   │   ├── formatting.ts              
│   │   └── index.ts                    
│   └── markdown.ts                     
├── pages/
│   ├── news/
│   │   └── [slug].tsx                  
│   ├── _app.tsx                        
│   └── index.tsx                       
├── public/                            
│   └── images/
│       ├── alumni/
│       ├── hero/
│       └── news/
├── styles/                             
│   └── globals.css
├── config/                             
│   └── styling.yml                     
├── .gitignore                          
├── .nojekyll                         
├── LICENSE                          
├── next.config.js                    
├── next-env.d.ts                       
├── package.json                       
├── package-lock.json                   
├── postcss.config.js                  
├── tailwind.config.js                  
└── tsconfig.json                       
```


## License

MIT License - see [LICENSE](LICENSE) file for details.

