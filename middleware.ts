import { type NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

type ABReleases = {
  threshold: number;
  active: boolean;
};

export async function middleware(req: NextRequest) {
  const abReleases = await get<ABReleases>("abReleases");
  console.log('abReleases', abReleases);

  if (!abReleases?.active) {
    console.log('abReleases is not active');
    return NextResponse.next();
  }

  let gbChoice = req.cookies.get("gb_choice")?.value;
  const response = NextResponse.next();

  if (!gbChoice) {
    const randomNumber = Math.random();
    gbChoice = randomNumber < abReleases.threshold ? "true" : "false";
    response.cookies.set("gb_choice", gbChoice);
  }

  if (gbChoice === "true") {
    const url = new URL(req.url);
    const proxiedSiteUrl = process.env.PROXIED_SITE_URL;

    if (proxiedSiteUrl) {
      const proxiedUrl = new URL(proxiedSiteUrl);
      url.hostname = proxiedUrl.hostname;
      url.port = proxiedUrl.port;
      url.protocol = proxiedUrl.protocol;
      return NextResponse.rewrite(url, response);
    }
  }

  return response;
}
