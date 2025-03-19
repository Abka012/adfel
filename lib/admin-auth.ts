"use client"

import { useState, useEffect } from "react"

// Define the user type
interface AdminUser {
  id: string
  email: string
  name: string
  role: string
}

// Define the authentication context
export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [user, setUser] = useState<AdminUser | null>(null)

  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = () => {
      try {
        const adminAuth = localStorage.getItem("adminAuth")
        if (adminAuth) {
          const parsed = JSON.parse(adminAuth)
          setIsAuthenticated(true)
          setUserRole(parsed.role || "editor")
          setUser({
            id: parsed.id || "1",
            email: parsed.email || "",
            name: parsed.name || "",
            role: parsed.role || "editor",
          })
        } else {
          setIsAuthenticated(false)
          setUserRole(null)
          setUser(null)
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        setIsAuthenticated(false)
        setUserRole(null)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // In a real application, this would make an API call to authenticate the user
    // For demo purposes, we'll use hardcoded credentials

    // Mock admin credentials
    const mockAdmins = [
      { id: "1", email: "admin@adfel.org", password: "admin123", role: "admin", name: "Admin User" },
      { id: "2", email: "editor@adfel.org", password: "editor123", role: "editor", name: "Editor User" },
    ]

    const admin = mockAdmins.find((admin) => admin.email === email && admin.password === password)

    if (admin) {
      // Store auth info in localStorage (in a real app, use secure cookies or JWT)
      localStorage.setItem(
        "adminAuth",
        JSON.stringify({
          id: admin.id,
          email: admin.email,
          role: admin.role,
          name: admin.name,
          timestamp: new Date().toISOString(),
        }),
      )

      setIsAuthenticated(true)
      setUserRole(admin.role)
      setUser({
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      })

      return { success: true }
    } else {
      return { success: false, error: "Invalid email or password" }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("adminAuth")
    setIsAuthenticated(false)
    setUserRole(null)
    setUser(null)
  }

  return {
    isAuthenticated,
    isLoading,
    userRole,
    user,
    login,
    logout,
  }
}

