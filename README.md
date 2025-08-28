# Cross-Platform Migration Test

This project tests using Next.js middleware to route traffic between a legacy PHP site and a new Vercel deployment.

## Setup

1. **Configure Edge Config**: Update `.vercel/edge-config.json` with your actual domains
2. **Deploy to Vercel**: The middleware only runs in production
3. **Set up Edge Config**: In Vercel dashboard, create an Edge Config store and upload the JSON

## Configuration

- `legacyPhpDomain`: Your GoDaddy PHP site domain
- `vercelDomain`: Your Vercel deployment domain  
- `trafficVercelPercent`: Percentage of traffic to route to Vercel (0-100)

## Testing

The middleware will attempt to use `NextResponse.rewrite()` to external domains. If this fails, it will log errors and fallback to serving from Vercel.

Check browser dev tools for:
- `platform_assignment` cookie
- Console logs showing routing decisions
- Network requests to see actual routing behavior
