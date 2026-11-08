// Upvote count for Keypause on Product Hunt. Read from Product Hunt's public
// badge image, which carries the number. Returns null on any failure, so the
// page simply leaves the line out.
const POST_ID = '1304967';

export async function getKeypauseUpvotes(): Promise<number | null> {
  try {
    const bucket = Math.floor(Date.now() / 600000) * 600000;
    const res = await fetch(
      `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${POST_ID}&theme=light&t=${bucket}`,
      { next: { revalidate: 600 }, signal: AbortSignal.timeout(3000) }
    );
    if (!res.ok) return null;
    const svg = await res.text();
    const match = svg.match(/<tspan[^>]*y="27"[^>]*>(\d+)</);
    return match ? Number(match[1]) : null;
  } catch {
    return null;
  }
}
