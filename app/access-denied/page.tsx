import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

export default function AccessDeniedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mx-auto max-w-md text-center">
        <ShieldAlert className="mx-auto h-16 w-16 text-red-500 dark:text-red-400" />
        <h1 className="mt-6 text-3xl font-bold">Access Denied</h1>
        <p className="mt-4 text-muted-foreground">
          You don't have permission to access this area. If you believe this is an error, please contact your
          administrator.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

