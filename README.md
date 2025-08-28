# Next.js A/B Testing with Edge Middleware and Vercel Edge Config

This project demonstrates how to implement A/B testing in a Next.js application using Edge Middleware and Vercel Edge Config. The middleware acts as a traffic-splitting reverse proxy, directing users to different versions of the site based on a configuration stored in Edge Config.

## How it works

The `middleware.ts` file contains the logic for the A/B test. Here's a breakdown of its functionality:

1.  **Fetch Configuration**: On every request, the middleware fetches the A/B testing configuration from Vercel Edge Config. The configuration is expected to be an object with the following structure:
    ```json
    {
      "abReleases": {
        "threshold": 0.2,
        "active": false
      }
    }
    ```

2.  **Check for Active Test**: It checks if the `active` property in the configuration is `true`. If it's `false`, the middleware does nothing and the user proceeds to the default version of the site.

3.  **Traffic Splitting**: If the test is active, the middleware inspects the request for a cookie named `gb_choice`.
    *   If the cookie is present, its value determines which version of the site the user sees.
    *   If the cookie is not present, the middleware assigns a value (`true` or `false`) based on the `threshold` from the configuration. For example, a `threshold` of `0.2` means there's a 20% chance of the cookie being set to `true`. The cookie is then set in the user's browser for subsequent requests.

4.  **Reverse Proxy**:
    *   If the `gb_choice` cookie is `true`, the middleware rewrites the request to a different site, whose URL is specified in the `PROXIED_SITE_URL` environment variable. This effectively acts as a reverse proxy.
    *   If the `gb_choice` cookie is `false`, the user sees the default version of the site.

## Getting Started

### Prerequisites

- Node.js
- pnpm
- A Vercel account and project with Edge Config set up.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```

### Configuration

1.  Create a `.env.local` file in the root of the project.
2.  Add your Vercel Edge Config connection string and the URL for the proxied site:
    ```
    EDGE_CONFIG="<your-edge-config-connection-string>"
    PROXIED_SITE_URL="<https://your-proxied-site.com>"
    ```
3.  Set up your Edge Config store on Vercel with the `abReleases` key and the appropriate JSON object.

### Running the application

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.
