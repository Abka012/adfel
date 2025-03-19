"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { checkAdminAuth } from "@/lib/auth-utils"

interface AuthCheckProps {
  children: React.ReactNode
  redirectTo?: string
}

export default function AuthCheck({ children, redirectTo = "/" }: AuthCheckProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { isAuthorized } = await checkAdminAuth()
      setIsAuthorized(isAuthorized)

      if (!isAuthorized && redirectTo) {
        router.push(redirectTo)
      }
    }

    checkAuth()
  }, [router, redirectTo])

  // Still checking authorization
  if (isAuthorized === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-center">
          <h2 className="text-xl font-semibold">Checking authorization...</h2>
          <p className="text-muted-foreground">Please wait</p>
        </div>
      </div>
    )
  }

  // Not authorized
  if (!isAuthorized) {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <Alert className="max-w-md">
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You don't have permission to access this area. If you believe this is an error, please contact your
            administrator.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  // Authorized
  return <>{children}</>
}

