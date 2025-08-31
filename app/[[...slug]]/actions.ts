'use server'

import { get } from "@vercel/edge-config";

type ABReleases = {
  threshold: number;
  overrideDelay: number;
  active: boolean;
};

export async function getABReleases(): Promise<ABReleases | null> {
  try {
    const abReleases = await get<ABReleases>("abReleases");
    return abReleases || null;
  } catch (error) {
    console.error('Failed to fetch ABReleases:', error);
    return null;
  }
}