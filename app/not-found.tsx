export const dynamic = "force-dynamic";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
          {/* Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>

          {/* Text */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Page not found
            </h1>
            <p className="text-sm text-muted-foreground">
              Sorry, the page you’re looking for doesn’t exist or has been moved.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/events">Browse Events</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
