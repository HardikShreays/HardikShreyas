# Hardik Shreyas - Portfolio

A modern, animated developer portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Ultra-modern, minimal, and premium UI with glassmorphism effects
- **Smooth Animations**: Elegant animations powered by Framer Motion
- **Responsive**: Fully responsive design that works on all devices
- **Performance Optimized**: Built with Next.js 14+ App Router for optimal performance
- **SEO Friendly**: Comprehensive metadata and SEO best practices

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository** (or navigate to the project directory)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind directives
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page component
├── components/
│   ├── About.tsx            # About section with skills
│   ├── ContactForm.tsx      # Contact form component
│   ├── ExperienceTimeline.tsx # Experience timeline
│   ├── Footer.tsx            # Footer component
│   ├── Hero.tsx             # Hero section with 3D effects
│   ├── Navbar.tsx           # Navigation bar
│   ├── ProjectCard.tsx      # Individual project card
│   ├── ProjectsGrid.tsx     # Projects grid layout
│   └── ScrollingSectionWrapper.tsx # Scroll reveal wrapper
├── data/
│   ├── experience.ts        # Experience data
│   └── projects.ts          # Projects data
└── public/                  # Static assets
```

## 🎨 Customization

### Update Personal Information

1. **Name and Title**: Edit `components/Hero.tsx`
2. **About Section**: Edit `components/About.tsx`
3. **Projects**: Update `data/projects.ts`
4. **Experience**: Update `data/experience.ts`
5. **Contact Email**: Update `components/ContactForm.tsx` and `components/Footer.tsx`
6. **Social Links**: Update links in `components/Footer.tsx` and `components/ContactForm.tsx`

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component-specific styles use Tailwind utility classes

### Images

- Project images are currently using Unsplash placeholders
- Replace image URLs in `data/projects.ts` with your own images
- Add images to `public/` folder and reference them as `/image-name.jpg`

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic functionality. If you want to add a contact form backend, create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

### Next.js Image Configuration

External image domains are configured in `next.config.js`. Add your image domains if needed.

## 📝 Notes

- The contact form currently logs to console. Integrate with your backend API for production use.
- Resume link points to `/resume.pdf` - add your resume file to the `public/` folder.
- Social media links are placeholders - update with your actual profiles.

## 🎯 Performance Tips

- Images are optimized using Next.js Image component
- Animations use GPU acceleration for smooth performance
- Code splitting is handled automatically by Next.js

## 🗂 Content (Sanity CMS)

Projects and experience are edited in a Sanity Studio embedded at **`/studio`** —
no separate deploy.

**Setup** (the site runs fine without this; it falls back to the checked-in data
in `data/`):

1. Create a project at [sanity.io/manage](https://sanity.io/manage).
2. Copy `.env.local.example` to `.env.local` and fill in the project ID.
3. Add your deployed URL under **API → CORS origins** in the Sanity dashboard,
   plus `http://localhost:3000` for local editing.
4. Run `npm run dev` and open `/studio`.

Published edits appear within 60s (ISR), no redeploy needed. If Sanity is
unreachable or the dataset is empty, the site renders `data/*.ts` instead.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Design inspiration from Linear.app, Vercel, and Apple
- Icons from [Lucide](https://lucide.dev/)
- Images from [Unsplash](https://unsplash.com/)

---

Built with ❤️ by Hardik Shreyas





