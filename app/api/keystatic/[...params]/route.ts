import { makeRouteHandler } from '@keystatic/next/route-handler';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import config from '../../../../keystatic.config';

export const dynamic = 'force-dynamic';

async function createHandler() {
  let env: Record<string, string | undefined> = {};
  let usingCloudflare = false;

  try {
    const cfContext = await getCloudflareContext();
    env = cfContext.env as Record<string, string | undefined>;
    usingCloudflare = true;
  } catch {
    env = process.env as Record<string, string | undefined>;
  }

  // Retrieve secrets from Cloudflare environment
  const keystatic_secret = env.KEYSTATIC_SECRET || process.env.KEYSTATIC_SECRET;
  const client_id = env.KEYSTATIC_GITHUB_CLIENT_ID || env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID || process.env.KEYSTATIC_GITHUB_CLIENT_ID || process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID;
  const client_secret = env.KEYSTATIC_GITHUB_CLIENT_SECRET || process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;

  console.log("Debug Keystatic Env:", {
    using_cloudflare: usingCloudflare,
    has_keystatic_secret: !!keystatic_secret,
    has_client_id: !!client_id,
    has_client_secret: !!client_secret,
    client_id_val: client_id ? client_id.substring(0, 5) + "..." : "missing",
    mode: process.env.NODE_ENV
  });

  // IMPORTANT: Ensure the config object on the server matches the storage mode 
  // actually being used in production. This prevents mismatches during OAuth.
  const mergedConfig = {
    ...config,
    storage: (client_id && client_secret) 
      ? {
          kind: 'github' as const,
          repo: { owner: 'destucr', name: 'porto-web' as const },
        }
      : config.storage
  };

  return makeRouteHandler({
    config: mergedConfig,
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
