import { makeRouteHandler } from '@keystatic/next/route-handler';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import config from '../../../../keystatic.config';

export const dynamic = 'force-dynamic';

async function createHandler() {
  let env: Record<string, string | undefined> = {};

  try {
    const cfContext = await getCloudflareContext();
    env = cfContext.env as Record<string, string | undefined>;
  } catch {
    env = process.env as Record<string, string | undefined>;
  }

  // Use the same keys Keystatic expects
  const keystatic_secret = env.KEYSTATIC_SECRET || process.env.KEYSTATIC_SECRET;
  const client_id = env.KEYSTATIC_GITHUB_CLIENT_ID || process.env.KEYSTATIC_GITHUB_CLIENT_ID || process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID;
  const client_secret = env.KEYSTATIC_GITHUB_CLIENT_SECRET || process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;

  // In production, we MUST have the secret and client info
  // In development, Keystatic handles local storage without these
  return makeRouteHandler({
    config,
    clientId: client_id,
    clientSecret: client_secret,
    secret: keystatic_secret,
  });
}

export async function GET(req: Request) {
  const handler = await createHandler();
  return handler.GET(req);
}

export async function POST(req: Request) {
  const handler = await createHandler();
  return handler.POST(req);
}