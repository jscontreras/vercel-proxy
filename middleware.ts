import { type NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

type ABReleases = {
  threshold: number;
  overrideDelay: number;
  active: boolean;
};

export async function middleware(req: NextRequest) {
  const abReleases = await get<ABReleases>("abReleases");
  console.log('abReleases', abReleases);

  // If is not active, then resolve to this site
  if (!abReleases?.active) {
    console.log('abReleases is not active');
    return NextResponse.next();
  }

  let gbChoice = req.cookies.get("gb_choice")?.value;
  const response = NextResponse.next();

  // If the cookie is not set then assign value based on threshold
  if (!gbChoice) {
    const randomNumber = Math.random();
    gbChoice = randomNumber < abReleases.threshold ? "true" : "false";
    // gb_choice::threshold::timestamp
    response.cookies.set("gb_choice", `${gbChoice}::${abReleases.threshold}::${Date.now()}`);
  }

  // Extract the values from the already set cookie
  const [gbChoiceValue, threshold, timestamp] = gbChoice?.split("::");

  // Only check the overriden if the threshold is different and the timestamp is older than the override delay
  const isOverridden = threshold !== `${abReleases.threshold}` && Date.now() - parseInt(timestamp) > abReleases.overrideDelay * 1000;
  // If the cookie is overridden, then assign value based on threshold and set the cookie
  if (isOverridden) {
    const randomNumber = Math.random();
    gbChoice = randomNumber < abReleases.threshold ? "true" : "false";
    response.cookies.set("gb_choice", `${gbChoice}::${abReleases.threshold}::${Date.now()}`, {
      httpOnly: true,
      secure: true,
    });
  }

  // If the cookie value is true, then rewrite to the proxied site
  if (gbChoiceValue === "true") {
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
