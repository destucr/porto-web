import { blogPosts as fallbackPosts, projects as fallbackProjects } from './data';
import Markdoc from '@markdoc/markdoc';

const isProd = process.env.NODE_ENV === 'production';

// Only initialize reader in development
const getReader = () => {
  if (isProd) return null;
  const { createReader } = require('@keystatic/core/reader');
  const config = require('../keystatic.config').default;
  return createReader(process.cwd(), {
    ...config,
    storage: { kind: 'local' },
  });
};

const reader = getReader();

export async function getPosts() {
  if (isProd) {
    return fallbackPosts.map(post => ({
      ...post,
      title: post.title || 'Untitled Post',
    }));
  }

  try {
    const posts = await reader!.collections.posts.all();
    if (posts.length === 0) return fallbackPosts;
    
    return posts.map(post => ({
      slug: post.slug,
      title: post.entry.title || 'Untitled Post',
      date: post.entry.date,
      excerpt: post.entry.excerpt,
      tags: post.entry.tags || [],
    }));
  } catch (error) {
    console.error('Error fetching posts from Keystatic:', error);
    return fallbackPosts;
  }
}

export async function getPost(slug: string) {
  if (isProd) {
    const fallback = fallbackPosts.find(p => p.slug === slug);
    if (fallback) {
      return { 
        slug, 
        entry: { 
          ...fallback, 
          content: async () => ({ node: Markdoc.parse(fallback.content) }) 
        } 
      };
    }
    return null;
  }

  try {
    const post = await reader!.collections.posts.read(slug);
    if (!post) {
      const fallback = fallbackPosts.find(p => p.slug === slug);
      if (fallback) {
        return { 
          slug, 
          entry: { 
            ...fallback, 
            content: async () => ({ node: Markdoc.parse(fallback.content) }) 
          } 
        };
      }
      return null;
    }

    return {
      slug,
      entry: {
        ...post,
        tags: Array.isArray(post.tags) ? post.tags : [],
      },
    };
  } catch (error) {
    console.error('Error fetching post from Keystatic:', error);
    return null;
  }
}

export async function getProjects() {
  const order = [
    'tiny-app-baby-heartbeat-listener',
    'telly-bisindo-sign-language-learning',
    'solari-running-companion',
    'snorkeling-booking-app',
    'p2p-lending-app-fraud-prevention'
  ];

  const formatProjects = (projs: any[]) => {
    return projs
      .map(project => ({
        id: project.id || project.slug,
        slug: project.slug || project.id,
        title: project.title || 'Untitled Project',
        description: project.description,
        image: project.image || '',
        tags: Array.isArray(project.tags) ? project.tags : [],
        githubUrl: project.githubUrl,
        appStoreUrl: project.appStoreUrl,
        videoUrl: project.videoUrl,
        screenshots: Array.isArray(project.screenshots) ? project.screenshots : [],
      }))
      .sort((a, b) => {
        const aIsIOS = a.tags.some((tag: string) => tag.toLowerCase() === 'ios');
        const bIsIOS = b.tags.some((tag: string) => tag.toLowerCase() === 'ios');
        
        if (aIsIOS && !bIsIOS) return -1;
        if (!aIsIOS && bIsIOS) return 1;

        const indexA = order.indexOf(a.slug);
        const indexB = order.indexOf(b.slug);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0;
      });
  };

  if (isProd) {
    return formatProjects(fallbackProjects);
  }

  try {
    const projects = await reader!.collections.projects.all();
    
    if (projects.length === 0) {
      return formatProjects(fallbackProjects);
    }

    return formatProjects(projects.map(p => ({ ...p.entry, slug: p.slug })));
  } catch (error) {
    console.error('Error fetching projects from Keystatic:', error);
    return formatProjects(fallbackProjects);
  }
}

export async function getProject(slug: string) {
  if (isProd) {
    const fallback = fallbackProjects.find(p => 
      p.id === slug || 
      p.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '') === slug
    );
    if (fallback) return { slug, entry: { ...fallback, tags: fallback.tags as readonly string[] } };
    return null;
  }

  try {
    const project = await reader!.collections.projects.read(slug, {
      resolveLinkedFiles: true,
    });
    
    if (!project) {
      const fallback = fallbackProjects.find(p => 
        p.id === slug || 
        p.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '') === slug
      );
      if (fallback) return { slug, entry: { ...fallback, tags: fallback.tags as readonly string[] } };
      return null;
    }

    return {
      slug,
      entry: {
        ...project,
        tags: Array.isArray(project.tags) ? project.tags : [],
      },
    };
  } catch (error) {
    console.error('Error fetching project from Keystatic:', error);
    return null;
  }
}
