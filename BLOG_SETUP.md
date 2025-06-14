# GSA Blog Setup Guide

## Overview
This guide will help you set up the blog system with Contentful CMS integration for easy content management.

## Prerequisites
1. A Contentful account (sign up at https://www.contentful.com/)
2. Node.js and npm installed
3. GSA website project cloned locally

## Contentful Setup

### Step 1: Create a Contentful Space
1. Log in to your Contentful dashboard
2. Create a new space or use an existing one
3. Note down your Space ID

### Step 2: Create Content Model
Create a new content type called "Blog Post" with the following fields:

#### Required Fields:
- **Title** (Short text)
  - Field ID: `title`
  - Required: Yes
  - Unique: No

- **Slug** (Short text)
  - Field ID: `slug`
  - Required: Yes
  - Unique: Yes
  - Help text: "URL-friendly version of the title"

- **Excerpt** (Long text)
  - Field ID: `excerpt`
  - Required: Yes
  - Help text: "Brief description of the post"

- **Content** (Rich text)
  - Field ID: `content`
  - Required: Yes

- **Featured Image** (Media - Single file)
  - Field ID: `featuredImage`
  - Required: No
  - Accepted file types: Images only

- **Author** (Short text)
  - Field ID: `author`
  - Required: Yes

- **Publish Date** (Date & time)
  - Field ID: `publishDate`
  - Required: Yes

- **Category** (Short text)
  - Field ID: `category`
  - Required: Yes
  - Help text: "e.g., Technology, Business, Innovation"

#### Optional Fields:
- **Tags** (Short text, multiple values)
  - Field ID: `tags`
  - Required: No

- **Read Time** (Integer)
  - Field ID: `readTime`
  - Required: No
  - Help text: "Estimated reading time in minutes"

- **Featured** (Boolean)
  - Field ID: `featured`
  - Required: No
  - Help text: "Mark as featured post"

### Step 3: Get API Keys
1. Go to Settings > API keys in your Contentful space
2. Create a new API key or use an existing one
3. Copy the following values:
   - Space ID
   - Content Delivery API access token

### Step 4: Configure Environment Variables
Create a `.env.local` file in your project root with:

```env
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
```

## Usage

### Creating Blog Posts
1. Log in to your Contentful dashboard
2. Go to Content > Add entry > Blog Post
3. Fill in all required fields:
   - **Title**: The main title of your blog post
   - **Slug**: URL-friendly version (e.g., "my-first-post")
   - **Excerpt**: Brief summary for the blog listing page
   - **Content**: Full blog post content (supports rich text, images, etc.)
   - **Featured Image**: Main image for the post
   - **Author**: Author name
   - **Publish Date**: When the post should be published
   - **Category**: Choose from: Technology, Business, Innovation, Digital Marketing, Software Development, IT Services
4. Optionally add tags and set read time
5. Check "Featured" if you want it to appear in featured sections
6. Publish the entry

### Blog URLs
- Main blog page: `/blog`
- Individual posts: `/blog/[slug]`

### Categories
The blog supports the following categories:
- Technology
- Business
- Innovation
- Digital Marketing
- Software Development
- IT Services

## Features

### Admin Benefits
- **Easy Content Management**: Update blog posts directly from Contentful dashboard
- **Rich Text Editor**: Full formatting options, embedded images, links
- **Media Management**: Upload and organize images
- **Draft System**: Save drafts and publish when ready
- **Multi-user Support**: Team members can collaborate on content
- **Content Scheduling**: Set publish dates for future posts
- **Preview Mode**: Preview changes before publishing

### User Experience
- **Responsive Design**: Works on all devices
- **Fast Loading**: Optimized images and content delivery
- **SEO Friendly**: Proper meta tags and structured data
- **Social Sharing**: Built-in sharing buttons
- **Related Posts**: Automatic suggestions based on categories
- **Category Filtering**: Filter posts by category
- **Search Functionality**: (can be added later)

## Design Features
- Matches GSA website design language
- Consistent color scheme (blue-purple gradients)
- Professional layout with cards and animations
- Hero section with overlay text
- Responsive grid layout
- Hover effects and smooth transitions

## Troubleshooting

### Common Issues
1. **Posts not showing**: Check if they are published in Contentful
2. **Images not loading**: Verify image URLs and formats
3. **Build errors**: Ensure all required fields are filled in Contentful

### Environment Issues
- Make sure `.env.local` file exists and has correct values
- Restart development server after changing environment variables
- Check Contentful API limits and usage

## Development

### Adding New Features
- Blog components are in `src/app/blog/`
- Contentful configuration is in `lib/contentful.ts`
- Styling uses Tailwind CSS classes

### Customization
- Modify categories in `src/app/blog/page.tsx`
- Update styling in component files
- Add new fields to Contentful content model and update TypeScript interfaces

## Support
For issues with:
- Contentful: Check their documentation at https://www.contentful.com/developers/docs/
- Next.js: Visit https://nextjs.org/docs
- This implementation: Contact the development team

## Next Steps
1. Set up Contentful space and content model
2. Configure environment variables
3. Create your first blog post
4. Test the blog functionality
5. Add more advanced features as needed (search, comments, etc.) 