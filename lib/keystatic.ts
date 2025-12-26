import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.config';

// We force 'local' storage for the reader because we want to read the 
// bundled content from the filesystem, not from GitHub API.
const reader = createReader(process.cwd(), {
  ...config,
  storage: { kind: 'local' },
});

export async function getPosts() {
  const posts = await reader.collections.posts.all();
  return posts.map(post => ({
    slug: post.slug,
    title: post.entry.title,
    date: post.entry.date,
    excerpt: post.entry.excerpt,
    tags: post.entry.tags || [],
  }));
}

export async function getPost(slug: string) {
  const post = await reader.collections.posts.read(slug);
  if (!post) return null;

  return {
    slug,
    entry: {
      ...post,
      tags: Array.isArray(post.tags) ? post.tags : [],
    },
  };
}

export async function getProjects() {
  const projects = await reader.collections.projects.all();

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
      title: project.entry.title,
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
}

export async function getProject(slug: string) {
  const project = await reader.collections.projects.read(slug, {
    resolveLinkedFiles: true,
  });
  if (!project) return null;

  return {
    slug,
    entry: {
      ...project,
      tags: Array.isArray(project.tags) ? project.tags : [],
    },
  };
}
