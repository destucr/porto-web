import { makeRouteHandler } from '@keystatic/next/route-handler';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import config from '../../../../keystatic.config';

export const dynamic = 'force-dynamic';

// For Cloudflare Workers, we need to create the handler dynamically
// to access runtime secrets via getCloudflareContext()
async function createHandler() {
  // Try to get Cloudflare context for runtime secrets
  let env: Record<string, string | undefined> = {};

  try {
    const cfContext = await getCloudflareContext();
    env = cfContext.env as Record<string, string | undefined>;
  } catch {
    // Fallback to process.env for local development
    env = process.env as Record<string, string | undefined>;
  }

  const keystatic_secret = env.KEYSTATIC_SECRET || process.env.KEYSTATIC_SECRET;
  const client_id = env.KEYSTATIC_GITHUB_CLIENT_ID || process.env.KEYSTATIC_GITHUB_CLIENT_ID || process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID;
  const client_secret = env.KEYSTATIC_GITHUB_CLIENT_SECRET || process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;

  if (keystatic_secret || process.env.NODE_ENV === 'development') {
    return makeRouteHandler({
      config,
      clientId: client_id,
      clientSecret: client_secret,
      secret: keystatic_secret,
    });
  }

  return {
    GET: () => new Response('Not found', { status: 404 }),
    POST: () => new Response('Not found', { status: 404 }),
  };
}

export async function GET(req: Request) {
  const handler = await createHandler();
  return handler.GET(req);
}

export async function POST(req: Request) {
  const handler = await createHandler();
  return handler.POST(req);
}
