import { getCloudflareContext } from '@opennextjs/cloudflare';
import KeystaticApp from "../keystatic";

export default async function Page() {
  let clientId = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID || process.env.KEYSTATIC_GITHUB_CLIENT_ID;

  try {
    const cf = await getCloudflareContext();
    const env = cf.env as Record<string, string | undefined>;
    clientId = env.KEYSTATIC_GITHUB_CLIENT_ID || env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID || clientId;
  } catch {
    // Fallback for local development
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.process = window.process || { env: {} }; 
                   window.process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID = "${clientId || ''}";`,
        }}
      />
      <KeystaticApp />
    </>
  );
}