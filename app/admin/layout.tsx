"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  CalendarDays,
  FileText,
  Heart,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useAdminAuth } from "@/lib/admin-auth"

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
  const hasPermission = !requiredRole || (userRole && (userRole === "admin" || userRole === requiredRole))

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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isAuthenticated, isLoading, userRole, logout } = useAdminAuth()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const router = useRouter()

  // If still loading auth state, show minimal layout
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-center">
          <h2 className="text-xl font-semibold">Loading admin panel...</h2>
          <p className="text-muted-foreground">Please wait</p>
        </div>
      </div>
    )
  }

  // If not authenticated and not on login page, redirect to login
  if (!isAuthenticated && pathname !== "/admin/login") {
    router.push("/admin/login")
    return null
  }

  // If on login page, show only the login content
  if (pathname === "/admin/login") {
    return <div className="min-h-screen">{children}</div>
  }

  const navigation = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-4 w-4" />,
      requiredRole: null, // Everyone can see this
    },
    {
      title: "Content",
      href: "/admin/content",
      icon: <FileText className="h-4 w-4" />,
      requiredRole: null,
    },
    {
      title: "Events",
      href: "/admin/events",
      icon: <CalendarDays className="h-4 w-4" />,
      requiredRole: null,
    },
    {
      title: "Donations",
      href: "/admin/donations",
      icon: <Heart className="h-4 w-4" />,
      requiredRole: "admin", // Only admin can access
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-4 w-4" />,
      requiredRole: "admin", // Only admin can access
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart3 className="h-4 w-4" />,
      requiredRole: "admin",
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-4 w-4" />,
      requiredRole: "admin",
    },
  ]

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

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
              <Link href="/admin" className="flex items-center gap-2 text-lg font-semibold">
                <Home className="h-5 w-5" />
                <span>ADFEL Admin</span>
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
        <Link href="/admin" className="flex items-center gap-2 text-lg font-semibold">
          <Home className="h-5 w-5" />
          <span className="hidden md:inline-block">ADFEL Admin</span>
        </Link>
        <div className="flex-1"></div>
        <Link href="/" className="mr-4">
          <Button variant="ghost" size="sm">
            View Website
          </Button>
        </Link>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Log out</span>
        </Button>
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

