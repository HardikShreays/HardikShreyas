# DotLoader Component Integration

## Overview

The DotLoader component has been successfully integrated into the portfolio project following shadcn/ui conventions.

## Project Structure

The project now follows the shadcn/ui structure:

```
├── components/
│   └── ui/              # shadcn/ui components directory
│       ├── dot-loader.tsx
│       └── demo.tsx
├── lib/
│   └── utils.ts          # Utility functions (cn helper)
└── ...
```

## Why `/components/ui` Folder?

The `/components/ui` folder is the standard location for shadcn/ui components. This structure:

1. **Follows shadcn/ui conventions** - All shadcn components are placed in this directory
2. **Maintains consistency** - Makes it easy to identify reusable UI components
3. **Enables easy component management** - Components can be easily added/removed via shadcn CLI
4. **Separates concerns** - Distinguishes UI primitives from feature-specific components

## Dependencies Installed

The following dependencies were added to support the DotLoader component:

- `clsx` - Utility for constructing className strings conditionally
- `tailwind-merge` - Utility to merge Tailwind CSS classes without conflicts

## Files Created

### 1. `/lib/utils.ts`
Contains the `cn` utility function that combines `clsx` and `tailwind-merge` for optimal className handling.

### 2. `/components/ui/dot-loader.tsx`
The main DotLoader component that renders an animated dot grid based on frame data.

**Props:**
- `frames`: Array of number arrays representing active dots per frame
- `dotClassName`: Custom classes for individual dots
- `isPlaying`: Controls animation playback (default: true)
- `duration`: Frame duration in milliseconds (default: 100)
- `repeatCount`: Number of repetitions (-1 for infinite)
- `onComplete`: Callback when animation completes
- Standard div props for styling

### 3. `/components/ui/demo.tsx`
Demo component showcasing the DotLoader with a "Playing" status indicator.

## Integration Location

The DotLoader demo has been integrated into the Hero section as a floating status indicator in the top-right corner (visible on desktop screens).

**Location:** `components/Hero.tsx`

## Usage Example

```tsx
import { DotLoader } from "@/components/ui/dot-loader";

const frames = [
  [14, 7, 0, 8, 6, 13, 20],
  [14, 7, 13, 20, 16, 27, 21],
  // ... more frames
];

<DotLoader
  frames={frames}
  className="gap-0.5"
  dotClassName="bg-white/15 [&.active]:bg-white w-1.5 h-1.5"
  duration={100}
  isPlaying={true}
/>
```

## Customization

### Styling Dots

Use the `dotClassName` prop to style individual dots:

```tsx
<DotLoader
  frames={frames}
  dotClassName="bg-gray-400/20 [&.active]:bg-purple-500 rounded-full"
/>
```

### Animation Control

```tsx
const [isPlaying, setIsPlaying] = useState(true);

<DotLoader
  frames={frames}
  isPlaying={isPlaying}
  duration={150}
  repeatCount={5}
  onComplete={() => console.log('Animation complete')}
/>
```

## Tailwind Configuration

The Tailwind config has been updated to include the `lib` folder in the content paths:

```typescript
content: [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './lib/**/*.{js,ts,jsx,tsx,mdx}', // Added
],
```

## TypeScript Support

Full TypeScript support is included:
- Type-safe props
- Proper type inference
- ComponentProps extension for div props

## Next Steps

To add more shadcn/ui components:

1. Use the shadcn CLI: `npx shadcn@latest add [component-name]`
2. Or manually copy components to `/components/ui`
3. Ensure `@/lib/utils` is imported for the `cn` utility

## Notes

- The component uses client-side rendering (`"use client"`)
- Animation is handled via setInterval for frame updates
- The component is fully responsive and works on all screen sizes
- The demo component is hidden on mobile devices (md:block) to maintain clean design




