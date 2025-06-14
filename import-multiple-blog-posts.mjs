import dotenv from 'dotenv';
import contentful from 'contentful-management';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

// Configuration
const SPACE_ID = '0h86hqm4vko1';
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = 'master';

// Blog post files to import
const BLOG_POST_FILES = [
  'example-blog-post.json',
  'example-blog-post-2.json',
  'example-blog-post-3.json',
  'example-blog-post-4.json'
];

async function importMultipleBlogPosts() {
  try {
    console.log('🚀 Starting multiple blog posts import...');
    
    // Validate token
    if (!MANAGEMENT_TOKEN) {
      console.error('❌ CONTENTFUL_MANAGEMENT_TOKEN not found in environment variables!');
      process.exit(1);
    }
    
    // Initialize client
    const client = contentful.createClient({
      accessToken: MANAGEMENT_TOKEN
    });

    // Get space and environment
    const space = await client.getSpace(SPACE_ID);
    const environment = await space.getEnvironment(ENVIRONMENT_ID);
    console.log(`✅ Connected to Contentful space: ${space.name}`);

    // Check if content type exists
    try {
      await environment.getContentType('blogPost');
      console.log('✅ Blog Post content type found');
    } catch (error) {
      console.error('❌ Blog Post content type not found. Please run create-blog-content-type.mjs first');
      process.exit(1);
    }

    const results = [];
    
    // Import each blog post file
    for (const fileName of BLOG_POST_FILES) {
      try {
        console.log(`\n📖 Processing ${fileName}...`);
        
        // Check if file exists
        if (!fs.existsSync(fileName)) {
          console.log(`⚠️  File ${fileName} not found, skipping...`);
          continue;
        }
        
        // Read the blog post data
        const blogPostData = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        
        // Prepare entry data (remove featuredImage for now)
        const entryData = {
          fields: {
            ...blogPostData.fields
          }
        };

        // Remove featuredImage field for now
        delete entryData.fields.featuredImage;
        
        // Create the entry
        console.log(`📝 Creating blog post entry for "${entryData.fields.title['en-US']}"...`);
        const entry = await environment.createEntry('blogPost', entryData);
        console.log(`✅ Entry created with ID: ${entry.sys.id}`);

        // Publish the entry
        console.log('🚀 Publishing entry...');
        const publishedEntry = await entry.publish();
        console.log('✅ Entry published successfully!');
        
        results.push({
          file: fileName,
          entryId: publishedEntry.sys.id,
          title: publishedEntry.fields.title['en-US'],
          slug: publishedEntry.fields.slug['en-US'],
          status: 'success'
        });
        
      } catch (fileError) {
        console.error(`❌ Error processing ${fileName}:`);
        console.error('Message:', fileError.message);
        
        // Handle common errors
        if (fileError.message.includes('already exists') || fileError.message.includes('unique')) {
          console.error(`💡 Slug already exists in ${fileName}. Consider updating the slug.`);
        }
        
        results.push({
          file: fileName,
          status: 'error',
          error: fileError.message
        });
      }
    }
    
    // Print summary
    console.log('\n🎉 Import Summary:');
    console.log('==================');
    
    const successful = results.filter(r => r.status === 'success');
    const failed = results.filter(r => r.status === 'error');
    
    console.log(`✅ Successfully imported: ${successful.length} posts`);
    console.log(`❌ Failed to import: ${failed.length} posts`);
    
    if (successful.length > 0) {
      console.log('\n📝 Successfully imported posts:');
      successful.forEach(result => {
        console.log(`  • ${result.title} (${result.slug})`);
        console.log(`    Entry ID: ${result.entryId}`);
        console.log(`    View: https://app.contentful.com/spaces/${SPACE_ID}/entries/${result.entryId}`);
      });
    }
    
    if (failed.length > 0) {
      console.log('\n❌ Failed imports:');
      failed.forEach(result => {
        console.log(`  • ${result.file}: ${result.error}`);
      });
    }
    
  } catch (error) {
    console.error('\n❌ Fatal error occurred:');
    console.error('Message:', error.message);
    process.exit(1);
  }
}

// Run the script
importMultipleBlogPosts(); 