# Public Assets Folder

Place your static assets here:

## Profile Picture
- **File name:** `profile.jpg` (or `.png`, `.webp`, etc.)
- **Location:** `/public/profile.jpg`
- **Used in:** About section
- **Recommended size:** 512x512px or larger (square image works best)

## Resume
- **File name:** `resume.pdf`
- **Location:** `/public/resume.pdf`
- **Used in:** Hero section "View Resume" button
- **Format:** PDF file

## How to add files:

1. **For Profile Picture:**
   - Add your photo as `profile.jpg` (or `.png`, `.webp`) in this folder
   - Supported formats: JPG, PNG, WebP
   - The image will be automatically optimized by Next.js Image component

2. **For Resume:**
   - Add your resume as `resume.pdf` in this folder
   - The file will be accessible at `/resume.pdf` and can be downloaded

## File Structure:
```
public/
  ├── profile.jpg    (your profile picture)
  ├── resume.pdf     (your resume)
  └── README.md      (this file)
```

## Notes:
- Files in the `public` folder are served from the root path `/`
- Example: `public/profile.jpg` → accessible at `/profile.jpg`
- Example: `public/resume.pdf` → accessible at `/resume.pdf`
- These files are publicly accessible, so don't put sensitive information here

