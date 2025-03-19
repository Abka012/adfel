"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, CalendarDays, FileText, Heart, Home, LayoutDashboard, Menu, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

// Hook to check if user is authorized to access admin dashboard
const useAdminAuth = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // In a real application, this would check session cookies, JWT tokens, or call an API
    // to verify the user is authenticated and has admin privileges
    const checkAuth = async () => {
      try {
        // Simulate checking authentication from existing mechanism
        // This could be replaced with a fetch to an auth endpoint
        const userAuth = localStorage.getItem("userAuth") || sessionStorage.getItem("userAuth")

        if (userAuth) {
          const parsed = JSON.parse(userAuth)
          // Check if user has admin role
          if (parsed.roles && (parsed.roles.includes("admin") || parsed.roles.includes("editor"))) {
            setIsAuthorized(true)
            setUserRole(parsed.roles.includes("admin") ? "admin" : "editor")
          } else {
            setIsAuthorized(false)
            // Redirect to access denied page
            router.push("/access-denied")
          }
        } else {
          setIsAuthorized(false)
          // Redirect to home page or login
          router.push("/")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setIsAuthorized(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  return { isAuthorized, isLoading, userRole }
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  title: string
  isActive?: boolean
  isDisabled?: boolean
  requiredRole?: string
  userRole?: string | null
}

function NavItem({ href, icon, title, isActive, isDisabled, requiredRole, userRole }: NavItemProps) {
  // Check if user has permission to see this nav item
  const hasPermission = !requiredRole || (userRole && (userRole === "admin" || requiredRole === "editor"))

  if (!hasPermission) return null

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        isDisabled && "pointer-events-none opacity-60",
      )}
    >
      {icon}
      {title}
    </Link>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isAuthorized, isLoading, userRole } = useAdminAuth()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  // If still loading auth state, show loading indicator
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-center">
          <h2 className="text-xl font-semibold">Loading dashboard...</h2>
          <p className="text-muted-foreground">Please wait</p>
        </div>
      </div>
    )
  }

  // If not authorized, the router will redirect, but we'll show a message just in case
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

  const navigation = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
      requiredRole: null, // Everyone can see this
    },
    {
      title: "Content",
      href: "/dashboard/content",
      icon: <FileText className="h-4 w-4" />,
      requiredRole: null,
    },
    {
      title: "Events",
      href: "/dashboard/events",
      icon: <CalendarDays className="h-4 w-4" />,
      requiredRole: null,
    },
    {
      title: "Donations",
      href: "/dashboard/donations",
      icon: <Heart className="h-4 w-4" />,
      requiredRole: "admin", // Only admin can access
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 className="h-4 w-4" />,
      requiredRole: "admin",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-4 w-4" />,
      requiredRole: "admin",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Top navigation bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 sm:max-w-xs">
            <nav className="flex flex-col gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                <Home className="h-5 w-5" />
                <span>ADFEL Dashboard</span>
              </Link>
              <div className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <NavItem
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    title={item.title}
                    isActive={pathname === item.href}
                    requiredRole={item.requiredRole}
                    userRole={userRole}
                  />
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
          <Home className="h-5 w-5" />
          <span className="hidden md:inline-block">ADFEL Dashboard</span>
        </Link>
        <div className="flex-1"></div>
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="sm">
            View Website
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Logged in as:</span>{" "}
            <span className="font-medium">{userRole === "admin" ? "Administrator" : "Editor"}</span>
          </div>
        </div>
      </header>

      {/* Main content area with sidebar */}
      <div className="flex flex-1">
        {/* Sidebar navigation (desktop) */}
        <aside className="hidden w-64 border-r md:block">
          <ScrollArea className="h-[calc(100vh-64px)] py-4">
            <div className="px-4 py-2">
              <nav className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <NavItem
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    title={item.title}
                    isActive={pathname === item.href}
                    requiredRole={item.requiredRole}
                    userRole={userRole}
                  />
                ))}
              </nav>
            </div>
          </ScrollArea>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

