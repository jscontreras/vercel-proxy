'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function CookieManager() {
  let initialValue = 'false'
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';')
    const gbChoiceCookie = cookies.find(cookie => cookie.trim().startsWith('gb_choice='))
    initialValue = gbChoiceCookie ? gbChoiceCookie.split('=')[1].trim() : 'false'
  }

  const [cookieValue, setCookieValue] = useState(initialValue || 'true')
  const [displayValue, setDisplayValue] = useState(initialValue || 'Not set')

  const setCookie = (value: string) => {
    // Set cookie with 30 days expiration
    const expires = new Date()
    expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000))
    document.cookie = `gb_choice=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
    //setDisplayValue(value)
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const clearCookie = () => {
    // Clear cookie by setting expiration to past date
    document.cookie = 'gb_choice=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    //setDisplayValue('Not set')
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const handleSetCookie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCookie(cookieValue)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cookie Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label className="text-sm font-medium">gb_choice Cookie Value:</Label>
            <p className="text-lg font-mono bg-muted p-2 rounded mt-1">
              {displayValue}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cookie Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSetCookie} className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">Set gb_choice Cookie:</Label>
              <RadioGroup value={cookieValue} onValueChange={setCookieValue}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="true" />
                  <Label htmlFor="true">True</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="false" />
                  <Label htmlFor="false">False</Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full">
              Set Cookie
            </Button>
          </form>

          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={clearCookie}
          >
            Clear Cookie
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
