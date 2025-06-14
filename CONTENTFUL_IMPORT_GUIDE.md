# Contentful Import Guide for GSA Website

This guide will help you quickly set up your Contentful space using the provided JSON files for content model and sample content.

## 📁 Files Created

- `public/Blog/gsa-blog-content-model.json` - Complete content model definition
- `public/Blog/sample-blog-content.json` - Sample blog posts for testing
- `.env.local` - Environment variables (you need to add your credentials)

## 🚀 Quick Setup Steps

### Step 1: Set Up Your Environment Variables

1. Open your `.env.local` file in the project root
2. Replace the placeholder values with your actual Contentful credentials:

```env
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_actual_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_actual_access_token_here
```

**Where to find these values:**
- Log into your Contentful dashboard
- Go to Settings → API keys
- Copy your Space ID and Content Delivery API access token

### Step 2: Import Content Model (Method 1 - Manual)

1. **Log into Contentful Dashboard**
2. **Go to Content Model section**
3. **Click "Add content type"**
4. **Copy the content model JSON:**
   - Open `public/Blog/gsa-blog-content-model.json`
   - Copy the entire content
5. **Use Contentful's Import Feature:**
   - In Contentful, go to Settings → Import/Export
   - Choose "Import" and paste the JSON content

### Step 3: Import Content Model (Method 2 - CLI)

If you prefer using Contentful CLI:

```bash
# Install Contentful CLI
npm install -g contentful-cli

# Login to Contentful
contentful login

# Import the content model
contentful space import --space-id YOUR_SPACE_ID --content-file public/Blog/gsa-blog-content-model.json
```

### Step 4: Create Sample Content

**Option A: Manual Creation**
1. Go to Content → Add entry → Blog Post
2. Use the sample data from `public/Blog/sample-blog-content.json` as reference
3. Fill in the fields manually

**Option B: Import Sample Content**
1. In Contentful dashboard, go to Settings → Import/Export
2. Import the `sample-blog-content.json` file

## 📋 Content Model Fields Explained

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| **title** | Text | ✅ | Blog post title (10-100 chars) |
| **slug** | Text | ✅ | URL-friendly identifier |
| **excerpt** | Text | ✅ | Brief summary (50-300 chars) |
| **content** | Rich Text | ✅ | Main blog content |
| **featuredImage** | Asset | ❌ | Main image (800x400 to 2000x1200px) |
| **author** | Text | ✅ | Author name |
| **publishDate** | Date | ✅ | Publication date |
| **tags** | Array | ❌ | Keywords (max 10) |
| **readTime** | Integer | ❌ | Reading time in minutes |
| **category** | Text | ✅ | One of: Technology, Business, Innovation, Digital Marketing, Software Development, IT Services |
| **featured** | Boolean | ❌ | Mark as featured post |
| **metaTitle** | Text | ❌ | SEO title (max 60 chars) |
| **metaDescription** | Text | ❌ | SEO description (max 160 chars) |

## 🎯 Content Model Features

### ✅ Built-in Validations
- **Title**: 10-100 characters
- **Slug**: Unique, URL-friendly format
- **Excerpt**: 50-300 characters
- **Featured Image**: Proper dimensions (800x400 to 2000x1200)
- **Category**: Restricted to predefined values
- **Tags**: Maximum 10 tags, 2-30 characters each
- **Read Time**: 1-60 minutes
- **Meta fields**: SEO-optimized lengths

### ✅ Rich Text Support
- Headings (H1-H6)
- Bold, italic, underline, code formatting
- Lists (ordered/unordered)
- Blockquotes
- Horizontal rules
- Embedded assets and entries
- Hyperlinks

### ✅ SEO Ready
- Meta title and description fields
- Structured data support
- URL-friendly slugs

## 🧪 Testing Your Setup

1. **Restart your development server:**
   ```bash
   npm run dev
   ```

2. **Visit your blog page:**
   ```
   http://localhost:3000/blog
   ```

3. **Check for:**
   - Blog posts loading correctly
   - Category filtering working
   - Individual post pages accessible
   - Featured posts displaying

## 🔧 Troubleshooting

### Common Issues:

**❌ "Expected parameter accessToken" error**
- Check your `.env.local` file
- Ensure environment variables are set correctly
- Restart your development server

**❌ No posts showing**
- Verify posts are **published** in Contentful (not just saved)
- Check that content model ID is exactly `blogPost`
- Ensure field IDs match exactly

**❌ Images not loading**
- Check image URLs in Contentful
- Ensure images are published
- Verify image dimensions meet requirements

**❌ Category filtering not working**
- Ensure category values match exactly (case-sensitive)
- Check that categories are set in your posts

## 📝 Content Creation Workflow

### For Content Creators:

1. **Log into Contentful**
2. **Go to Content → Add entry → Blog Post**
3. **Fill in required fields:**
   - Title (compelling headline)
   - Slug (auto-generated from title)
   - Excerpt (engaging summary)
   - Content (full article with rich formatting)
   - Author name
   - Publish date
   - Category (select from dropdown)
4. **Optional fields:**
   - Featured image (recommended)
   - Tags (for better organization)
   - Read time (auto-calculated if not set)
   - Featured checkbox (for homepage display)
   - SEO meta fields
5. **Click "Publish"** (not just Save)

### Content Guidelines:

- **Title**: Clear, descriptive, SEO-friendly
- **Excerpt**: Compelling summary that encourages reading
- **Content**: Well-structured with headings, lists, and formatting
- **Images**: High-quality, relevant, properly sized
- **Tags**: Relevant keywords for discoverability
- **Category**: Choose the most appropriate primary category

## 🚀 Going Live

When ready for production:

1. **Add environment variables to your hosting platform**
2. **Deploy your application**
3. **Test all functionality in production**
4. **Set up content publishing workflow for your team**

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify your Contentful setup matches the specifications
3. Ensure all environment variables are correctly set
4. Check the browser console for error messages

---

**🎉 Congratulations!** Your GSA blog is now powered by Contentful CMS with a professional content management workflow! 