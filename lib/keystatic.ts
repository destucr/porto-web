import { blogPosts as fallbackPosts, projects as fallbackProjects } from './data';
import Markdoc from '@markdoc/markdoc';
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../keystatic.config';

const isProd = process.env.NODE_ENV === 'production';

// Only initialize reader in development
const getReader = () => {
  if (isProd) return null;
  return createReader(process.cwd(), {
    ...keystaticConfig,
    storage: { kind: 'local' },
  });
};

const reader = getReader();

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: readonly string[];
  content: string;
}

interface Project {
  id: string;
  slug?: string;
  title: string;
  description: string;
  image: string;
  tags: readonly string[];
  githubUrl: string;
  appStoreUrl: string;
  videoUrl: string;
  screenshots: readonly string[];
  details: string;
}

export async function getPosts() {
  if (isProd) {
    return (fallbackPosts as Post[]).map(post => ({
      ...post,
      title: post.title || 'Untitled Post',
    }));
  }

  try {
    const posts = await reader!.collections.posts.all();
    if (posts.length === 0) return fallbackPosts as Post[];
    
    return posts.map(post => ({
      slug: post.slug,
      title: post.entry.title || 'Untitled Post',
      date: post.entry.date || '',
      excerpt: post.entry.excerpt || '',
      tags: post.entry.tags || [],
    }));
  } catch (error) {
    console.error('Error fetching posts from Keystatic:', error);
    return fallbackPosts as Post[];
  }
}

export async function getPost(slug: string) {
  if (isProd) {
    const fallback = (fallbackPosts as Post[]).find(p => p.slug === slug);
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
      const fallback = (fallbackPosts as Post[]).find(p => p.slug === slug);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatProjects = (projs: any[]) => {
    return projs
      .map(project => ({
        id: (project.id || project.slug || '') as string,
        slug: (project.slug || project.id || '') as string,
        title: project.title || 'Untitled Project',
        description: project.description || '',
        image: project.image || '',
        tags: Array.isArray(project.tags) ? (project.tags as readonly string[]) : [],
        githubUrl: project.githubUrl || '',
        appStoreUrl: project.appStoreUrl || '',
        videoUrl: project.videoUrl || '',
        screenshots: Array.isArray(project.screenshots) ? (project.screenshots as readonly string[]) : [],
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return formatProjects(projects.map(p => ({ ...p.entry, slug: p.slug })) as any[]);
  } catch (error) {
    console.error('Error fetching projects from Keystatic:', error);
    return formatProjects(fallbackProjects);
  }
}

export async function getProject(slug: string) {
  if (isProd) {
    const fallback = (fallbackProjects as Project[]).find(p => 
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
      const fallback = (fallbackProjects as Project[]).find(p => 
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