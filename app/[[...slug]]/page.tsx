import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { CookieManager } from '@/components/cookie-manager'

interface PageProps {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params
  const cookieStore = await cookies()
  const gbChoice = cookieStore.get('gb_choice')

  const slugPath = slug ? slug.join('/') : 'root'
  const currentPath = slug ? `/${slug.join('/')}` : '/'
  const variantLabel = process.env.VARIANT_LABEL || 'Variant A'

  const getBannerClasses = () => {
    let bannerClasses = 'w-full text-center py-4 text-4xl font-bold rounded-lg mb-8'
    bannerClasses += ' bg-blue-400 text-black'
    return bannerClasses
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className={getBannerClasses()}>
        {variantLabel}
      </div>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Dynamic Route Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Current Slug:</Label>
              <p className="text-lg font-mono bg-muted p-2 rounded mt-1">
                {slugPath}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium">gb_choice Cookie Value:</Label>
              <p className="text-lg font-mono bg-muted p-2 rounded mt-1">
                {gbChoice?.value || 'Not set'}
              </p>
            </div>
          </CardContent>
        </Card>

        <CookieManager />

        <Card>
          <CardHeader>
            <CardTitle>Navigation Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Try these URLs to test the dynamic routing:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><code className="bg-muted px-1 rounded">/test</code></li>
                <li><code className="bg-muted px-1 rounded">/products/123</code></li>
                <li><code className="bg-muted px-1 rounded">/blog/2024/my-post</code></li>
                <li><code className="bg-muted px-1 rounded">/any/nested/path/you/want</code></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
