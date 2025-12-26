import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

export const dynamic = 'force-dynamic';

const handler = (process.env.KEYSTATIC_SECRET || process.env.NODE_ENV === 'development')
  ? makeRouteHandler({
      config,
      clientId: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID || process.env.KEYSTATIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
      secret: process.env.KEYSTATIC_SECRET,
    })
  : { GET: () => new Response('Not found', { status: 404 }), POST: () => new Response('Not found', { status: 404 }) };

export const { GET, POST } = handler;
