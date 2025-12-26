import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.config';
import { blogPosts as fallbackPosts, projects as fallbackProjects } from './data';
import Markdoc from '@markdoc/markdoc';

// We force 'local' storage for the reader because we want to read the 
// bundled content from the filesystem, not from GitHub API.
const reader = createReader(process.cwd(), {
  ...config,
  storage: { kind: 'local' },
});

export async function getPosts() {
  try {
    const posts = await reader.collections.posts.all();
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
  try {
    const post = await reader.collections.posts.read(slug);
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
  try {
    const projects = await reader.collections.projects.all();
    
    if (projects.length === 0) {
      return fallbackProjects.map(p => ({
        ...p,
        slug: p.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, ''),
        tags: p.tags as readonly string[]
      }));
    }

    const order = [
      'tiny-app-baby-heartbeat-listener',
      'snorkeling-booking-app',
      'p2p-lending-app-fraud-prevention',
      'telly-bisindo-sign-language-learning',
      'solari-running-companion'
    ];

    return projects
      .map(project => ({
        id: project.slug,
        slug: project.slug,
        title: project.entry.title || 'Untitled Project',
        description: project.entry.description,
        image: project.entry.image || '',
        tags: Array.isArray(project.entry.tags) ? project.entry.tags : [],
        githubUrl: project.entry.githubUrl,
        appStoreUrl: project.entry.appStoreUrl,
        videoUrl: project.entry.videoUrl,
      }))
      .sort((a, b) => {
        const indexA = order.indexOf(a.slug);
        const indexB = order.indexOf(b.slug);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0;
      });
  } catch (error) {
    console.error('Error fetching projects from Keystatic:', error);
    return fallbackProjects.map(p => ({
      ...p,
      slug: p.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, ''),
      tags: p.tags as readonly string[]
    }));
  }
}

export async function getProject(slug: string) {
  try {
    const project = await reader.collections.projects.read(slug, {
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
