import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// Check if Contentful environment variables are available
const isContentfulConfigured = () => {
  // Check both server-side and client-side environment variables
  const serverSide = !!(process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN);
  const clientSide = !!(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID && process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN);
  return serverSide || clientSide;
};

// Create client only if properly configured
const client = isContentfulConfigured() 
  ? createClient({
      space: process.env.CONTENTFUL_SPACE_ID || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
    })
  : null;

export interface BlogPost {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    content: Document;
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    author: string;
    publishDate: string;
    tags?: string[];
    readTime?: number;
    category: string;
    featured?: boolean;
  };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!client) {
    console.warn('Contentful not configured. Please set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN (or NEXT_PUBLIC_ versions) environment variables.');
    return [];
  }
  
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
    });
    
    return entries.items as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!client) {
    console.warn('Contentful not configured. Please set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN environment variables.');
    return null;
  }
  
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    });
    
    if (entries.items.length > 0) {
      return entries.items[0] as unknown as BlogPost;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  if (!client) {
    console.warn('Contentful not configured. Please set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN environment variables.');
    return [];
  }
  
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.category': category,
    });
    
    return entries.items as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
}

export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  if (!client) {
    console.warn('Contentful not configured. Please set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN environment variables.');
    return [];
  }
  
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      'fields.featured': true,
      limit,
    });
    
    return entries.items as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    return [];
  }
}

// Export helper function to check if Contentful is configured
export { isContentfulConfigured };

export default client; 