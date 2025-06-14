import dotenv from 'dotenv';
import contentful from 'contentful-management';

dotenv.config({ path: '.env.local' });

// Configuration
const SPACE_ID = '0h86hqm4vko1';
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = 'master';

const blogPostFields = [
  {
    id: 'title',
    name: 'Title',
    type: 'Symbol',
    required: true,
    validations: [
      {
        size: {
          min: 10,
          max: 100
        }
      }
    ]
  },
  {
    id: 'slug',
    name: 'Slug',
    type: 'Symbol',
    required: true,
    validations: [
      {
        unique: true
      },
      {
        size: {
          min: 5,
          max: 100
        }
      },
      {
        regexp: {
          pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
        }
      }
    ]
  },
  {
    id: 'excerpt',
    name: 'Excerpt',
    type: 'Text',
    required: true,
    validations: [
      {
        size: {
          min: 50,
          max: 300
        }
      }
    ]
  },
  {
    id: 'content',
    name: 'Content',
    type: 'RichText',
    required: true,
    validations: [
      {
        enabledMarks: ['bold', 'italic', 'underline', 'code']
      },
      {
        enabledNodeTypes: [
          'heading-1', 'heading-2', 'heading-3', 'heading-4', 'heading-5', 'heading-6',
          'ordered-list', 'unordered-list', 'hr', 'blockquote',
          'embedded-entry-block', 'embedded-asset-block',
          'hyperlink', 'entry-hyperlink', 'asset-hyperlink'
        ]
      }
    ]
  },
  {
    id: 'featuredImage',
    name: 'Featured Image',
    type: 'Link',
    linkType: 'Asset',
    required: false,
    validations: [
      {
        linkMimetypeGroup: ['image']
      },
      {
        assetImageDimensions: {
          width: { min: 800, max: 2000 },
          height: { min: 400, max: 1200 }
        }
      }
    ]
  },
  {
    id: 'author',
    name: 'Author',
    type: 'Symbol',
    required: true,
    validations: [
      {
        size: {
          min: 2,
          max: 50
        }
      }
    ]
  },
  {
    id: 'publishDate',
    name: 'Publish Date',
    type: 'Date',
    required: true
  },
  {
    id: 'tags',
    name: 'Tags',
    type: 'Array',
    required: false,
    items: {
      type: 'Symbol',
      validations: [
        {
          size: {
            min: 2,
            max: 30
          }
        }
      ]
    },
    validations: [
      {
        size: {
          max: 10
        }
      }
    ]
  },
  {
    id: 'readTime',
    name: 'Read Time',
    type: 'Integer',
    required: false,
    validations: [
      {
        range: {
          min: 1,
          max: 60
        }
      }
    ]
  },
  {
    id: 'category',
    name: 'Category',
    type: 'Symbol',
    required: true,
    validations: [
      {
        in: [
          'Technology',
          'Business',
          'Innovation',
          'Digital Marketing',
          'Software Development',
          'IT Services'
        ]
      }
    ]
  },
  {
    id: 'featured',
    name: 'Featured',
    type: 'Boolean',
    required: false
  },
  {
    id: 'metaTitle',
    name: 'Meta Title',
    type: 'Symbol',
    required: false,
    validations: [
      {
        size: {
          max: 60
        }
      }
    ]
  },
  {
    id: 'metaDescription',
    name: 'Meta Description',
    type: 'Text',
    required: false,
    validations: [
      {
        size: {
          max: 160
        }
      }
    ]
  }
];

async function createBlogContentType() {
  try {
    console.log('🚀 Starting content type creation...');
    
    // Debug: Check if token is loaded
    console.log('Token loaded:', MANAGEMENT_TOKEN ? '✅ Yes' : '❌ No');
    
    // Validate token
    if (!MANAGEMENT_TOKEN) {
      console.error('❌ CONTENTFUL_MANAGEMENT_TOKEN not found in environment variables!');
      console.error('Make sure your .env.local file contains:');
      console.error('CONTENTFUL_MANAGEMENT_TOKEN=your_token_here');
      process.exit(1);
    }
    
    // Initialize client
    const client = contentful.createClient({
      accessToken: MANAGEMENT_TOKEN
    });

    // Get space
    const space = await client.getSpace(SPACE_ID);
    console.log(`✅ Connected to space: ${space.name}`);

    // Get environment
    const environment = await space.getEnvironment(ENVIRONMENT_ID);
    console.log(`✅ Connected to environment: ${ENVIRONMENT_ID}`);

    let contentType;
    
    try {
      // Check if content type already exists
      contentType = await environment.getContentType('blogPost');
      console.log('⚠️  Content type "blogPost" already exists. Updating...');
      
      // Update existing content type
      contentType.name = 'Blog Post';
      contentType.description = 'Blog posts for GSA website with rich content and metadata';
      contentType.displayField = 'title';
      contentType.fields = blogPostFields;
      
      contentType = await contentType.update();
      console.log('✅ Content type updated successfully');
      
    } catch (error) {
      if (error.name === 'NotFound') {
        console.log('📝 Creating new content type...');
        
        // Create new content type
        contentType = await environment.createContentTypeWithId('blogPost', {
          name: 'Blog Post',
          description: 'Blog posts for GSA website with rich content and metadata',
          displayField: 'title',
          fields: blogPostFields
        });
        console.log('✅ Content type created successfully');
      } else {
        throw error;
      }
    }

    // Publish the content type
    await contentType.publish();
    console.log('✅ Content type published successfully');
    
    console.log('\n🎉 Blog Post content type is ready!');
    console.log('📝 You can now create blog post entries in Contentful');
    console.log(`🔗 Visit: https://app.contentful.com/spaces/${SPACE_ID}/entries`);
    
  } catch (error) {
    console.error('\n❌ Error occurred:');
    console.error('Message:', error.message);
    
    if (error.details) {
      console.error('Details:', JSON.stringify(error.details, null, 2));
    }
    
    if (error.message.includes('The access token you sent could not be found')) {
      console.error('\n💡 Please check your Management Token:');
      console.error('1. Go to https://app.contentful.com/spaces/0h86hqm4vko1/api/cma_tokens');
      console.error('2. Create a new Content Management Token');
      console.error('3. Update your .env.local file');
    }
    
    process.exit(1);
  }
}

// Run the script
createBlogContentType();