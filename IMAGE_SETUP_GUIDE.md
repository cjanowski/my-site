# Photo Gallery Setup Guide

I've created two new sections for your website: **Thor (Best Friend)** and **Family**. Here's how to add your photos:

## Directory Structure

Your images should be placed in these directories:
```
public/
├── images/
│   ├── bestfriend/
│   │   ├── thor1.jpg
│   │   ├── thor2.jpg
│   │   ├── thor3.jpg
│   │   ├── thor4.jpg
│   │   ├── thor5.jpg
│   │   └── thor6.jpg
│   └── family/
│       ├── family1.jpg
│       ├── family2.jpg
│       ├── family3.jpg
│       ├── family4.jpg
│       ├── family5.jpg
│       ├── family6.jpg
│       ├── family7.jpg
│       ├── family8.jpg
│       └── family9.jpg
```

## How to Add Your Photos

### Step 1: Prepare Your Images
1. **Thor Photos**: Rename your Thor photos to `thor1.jpg`, `thor2.jpg`, etc.
2. **Family Photos**: Rename your family photos to `family1.jpg`, `family2.jpg`, etc.
3. **Recommended formats**: JPG, JPEG, PNG, or WebP
4. **Recommended size**: 1200-2000px on the longest side for best quality

### Step 2: Copy Images to Correct Locations
```bash
# Navigate to your project directory
cd /Users/coryjanowski/Projects/coryjanowski-site

# Copy Thor photos (replace /path/to/your/thor/photos with actual path)
cp /path/to/your/thor/photos/* public/images/bestfriend/

# Copy family photos (replace /path/to/your/family/photos with actual path)
cp /path/to/your/family/photos/* public/images/family/
```

### Step 3: Update Image Arrays (if needed)
If you have more or fewer photos than the default setup, edit these files:

**For Thor photos** (`src/components/Thor.tsx`):
```typescript
const thorImages = [
  '/images/bestfriend/thor1.jpg',
  '/images/bestfriend/thor2.jpg',
  '/images/bestfriend/thor3.jpg',
  // Add more as needed
]
```

**For Family photos** (`src/components/Family.tsx`):
```typescript
const familyImages = [
  '/images/family/family1.jpg',
  '/images/family/family2.jpg',
  '/images/family/family3.jpg',
  // Add more as needed
]
```

## Features Included

### Thor Section
- **Slideshow**: Auto-advancing slideshow with manual controls
- **Thumbnail navigation**: Click any thumbnail to jump to that photo
- **Auto-play toggle**: Pause/play the slideshow
- **Responsive design**: Works on all screen sizes
- **Fun facts section**: Customizable information about Thor

### Family Section
- **Grid layout**: Beautiful masonry-style photo grid
- **Lightbox**: Click any photo to view in full-screen lightbox
- **Navigation**: Arrow keys and buttons to navigate in lightbox
- **Responsive grid**: Adapts to different screen sizes
- **Family values section**: Customizable content about family

## Customization

### Update Thor's Information
Edit `src/components/Thor.tsx` around lines 180-200 to customize:
- Favorite activities
- Special traits
- Description text

### Update Family Information
Edit `src/components/Family.tsx` around lines 120-150 to customize:
- Family values
- Description text
- Section content

### Change Photo Descriptions
You can add captions or alt text by modifying the image arrays to include objects:
```typescript
const thorImages = [
  { src: '/images/bestfriend/thor1.jpg', caption: 'Thor at the park' },
  { src: '/images/bestfriend/thor2.jpg', caption: 'Playing fetch' },
  // ...
]
```

## Navigation
The new tabs "Thor" and "Family" have been added to your navigation menu and will smoothly scroll to the respective sections.

## Testing
After adding your images, run:
```bash
npm run dev
```

Then visit `http://localhost:3000` and scroll down to see your new photo galleries!

## Troubleshooting
- **Images not showing**: Check file paths and ensure images are in the correct directories
- **Slow loading**: Consider optimizing image sizes (recommended: under 500KB each)
- **Layout issues**: Ensure image aspect ratios are reasonable (not extremely wide or tall)
