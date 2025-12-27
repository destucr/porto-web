import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'Destu Portfolio Admin',
    },
    navigation: {
      'Content Management': ['posts', 'projects'],
    },
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title' }),
        date: fields.date({ label: 'Date' }),
        excerpt: fields.text({ label: 'Excerpt' }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts',
            },
          },
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: props => props.value }
        ),
      },
    }),
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'content/projects/*',
      format: { contentField: 'details' },
      schema: {
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description', multiline: true }),
        image: fields.text({ label: 'Thumbnail URL' }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        githubUrl: fields.text({ label: 'GitHub URL' }),
        appStoreUrl: fields.text({ label: 'App Store URL' }),
        details: fields.markdoc({
          label: 'Detailed Description',
          options: {
            image: {
              directory: 'public/images/projects',
              publicPath: '/images/projects',
            },
          },
        }),
        videoUrl: fields.text({ label: 'Video URL' }),
      },
    }),
  },
});
