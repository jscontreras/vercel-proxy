import { type NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
  // Set for the legacy site
  if (process.env.ENABLE_PROXY === 'disabled') {
    return NextResponse.next();
  }

  const url = new URL(req.url);
  url.hostname = 'v0pocs.tc-vercel.dev';
  url.port = ''; // Ensure the port is ignored
  url.protocol = 'https';
  return await NextResponse.rewrite(url.toString());
}
