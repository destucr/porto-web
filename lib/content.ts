import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Markdoc from '@markdoc/markdoc';
import { blogPosts as fallbackPosts, projects as fallbackProjects } from './data';

const POSTS_DIR = path.join(process.cwd(), 'content/posts');
const PROJECTS_DIR = path.join(process.cwd(), 'content/projects');

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
  try {
    if (!fs.existsSync(POSTS_DIR)) {
        // Only return fallback if directory doesn't exist
        return (fallbackPosts as Post[]).map(post => ({
            ...post,
            title: post.title || 'Untitled Post',
        }));
    }
    
    const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.mdoc') || file.endsWith('.md'));
    
    const posts = files.map(file => {
      const filePath = path.join(POSTS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      const slug = path.basename(file, path.extname(file));
      
      return {
        slug,
        title: data.title || 'Untitled Post',
        date: data.date ? new Date(data.date).toISOString() : '',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
      };
    });
    
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading posts:', error);
    return (fallbackPosts as Post[]).map(post => ({
        ...post,
        title: post.title || 'Untitled Post',
    }));
  }
}

export async function getPost(slug: string) {
  try {
    let filePath = path.join(POSTS_DIR, `${slug}.mdoc`);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(POSTS_DIR, `${slug}.md`);
    }
    
    let data, content;

    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const parsed = matter(fileContent);
        data = parsed.data;
        content = parsed.content;
    } else {
        const fallback = (fallbackPosts as Post[]).find(p => p.slug === slug);
        if (!fallback) return null;
        data = fallback;
        content = fallback.content;
    }

    return {
      slug,
      entry: {
        title: data.title,
        date: data.date ? new Date(data.date).toISOString() : '',
        excerpt: data.excerpt,
        tags: data.tags || [],
        content: async () => ({ node: Markdoc.parse(content) }),
      },
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export async function getProjects() {
   const order = [
    'tiny-app-baby-heartbeat-listener',
    'telly-bisindo-sign-language-learning',
    'solari-running-companion',
    'gtfs-web',
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
        details: project.details || project.content || '',
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

  try {
    if (!fs.existsSync(PROJECTS_DIR)) {
         return formatProjects(fallbackProjects);
    }

    const files = fs.readdirSync(PROJECTS_DIR).filter(file => file.endsWith('.mdoc') || file.endsWith('.md'));
    
    const projects = files.map(file => {
      const filePath = path.join(PROJECTS_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const slug = path.basename(file, path.extname(file));
      
      return {
        id: slug,
        slug: slug,
        title: data.title,
        description: data.description,
        image: data.image,
        tags: data.tags,
        githubUrl: data.githubUrl,
        appStoreUrl: data.appStoreUrl,
        videoUrl: data.videoUrl,
        screenshots: data.screenshots,
        details: content,
      };
    });

    return formatProjects(projects);

  } catch (error) {
    console.error('Error reading projects:', error);
    return formatProjects(fallbackProjects);
  }
}

export async function getProject(slug: string) {
    try {
        let filePath = path.join(PROJECTS_DIR, `${slug}.mdoc`);
        if (!fs.existsSync(filePath)) {
          filePath = path.join(PROJECTS_DIR, `${slug}.md`);
        }
        
        let data, content;
    
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const parsed = matter(fileContent);
            data = parsed.data;
            content = parsed.content;
        } else {
             const fallback = (fallbackProjects as Project[]).find(p => 
                p.id === slug || 
                p.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '') === slug
              );
              if (!fallback) return null;
              data = fallback;
              content = fallback.details; // details is string in fallback
        }
        
        return {
          slug,
          entry: {
            title: data.title,
            description: data.description,
            image: data.image,
            tags: Array.isArray(data.tags) ? data.tags : [],
            githubUrl: data.githubUrl,
            appStoreUrl: data.appStoreUrl,
            videoUrl: data.videoUrl,
            screenshots: Array.isArray(data.screenshots) ? data.screenshots : [],
            details: content, // string
          },
        };
      } catch (error) {
        console.error('Error fetching project:', error);
        return null;
      }
}
