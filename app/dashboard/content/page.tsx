"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Home, Newspaper, Info, Edit, Eye } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function ContentManagementPage() {
  const [activeTab, setActiveTab] = useState("homepage")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call to save content
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Changes saved",
        description: "Your content changes have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Content Management</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save All Changes"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="homepage">
            <Home className="mr-2 h-4 w-4" />
            Homepage
          </TabsTrigger>
          <TabsTrigger value="announcements">
            <Newspaper className="mr-2 h-4 w-4" />
            Announcements
          </TabsTrigger>
          <TabsTrigger value="mission">
            <Info className="mr-2 h-4 w-4" />
            Mission & Values
          </TabsTrigger>
          <TabsTrigger value="pages">
            <FileText className="mr-2 h-4 w-4" />
            Pages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="homepage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>Edit the main hero section content on the homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="heading">Heading</Label>
                  <Input id="heading" className="mt-1" defaultValue="Welcome to ADFEL" />
                </div>
                <div>
                  <Label htmlFor="subheading">Subheading</Label>
                  <Input
                    id="subheading"
                    className="mt-1"
                    defaultValue="Strengthening faith, building community, and serving others through Christ-centered fellowship."
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Hero Image</Label>
                  <div className="mt-1 flex items-center gap-4">
                    <div className="h-20 w-32 rounded-md border bg-muted"></div>
                    <Button variant="outline" size="sm">
                      Change Image
                    </Button>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label>Call to Action Buttons</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Button Text" defaultValue="Upcoming Events" />
                      <Input placeholder="Button URL" defaultValue="/events" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Button Text" defaultValue="Support Our Mission" />
                      <Input placeholder="Button URL" defaultValue="/donate" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Featured Sections</CardTitle>
                <CardDescription>Manage the featured content sections on the homepage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <div className="flex items-center justify-between p-4">
                      <div className="font-medium">Mission Section</div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border">
                    <div className="flex items-center justify-between p-4">
                      <div className="font-medium">Community Section</div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border">
                    <div className="flex items-center justify-between p-4">
                      <div className="font-medium">Call to Action Section</div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add New Section
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Optimize your homepage for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input id="meta-title" className="mt-1" defaultValue="ADFEL - Seven Day Adventist Club" />
                </div>
                <div>
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    className="mt-1"
                    rows={3}
                    defaultValue="Strengthening faith, building community, and serving others through Christ-centered fellowship."
                  />
                </div>
                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    className="mt-1"
                    defaultValue="Adventist, faith, community, fellowship, service"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">Separate keywords with commas</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Announcements</CardTitle>
                <CardDescription>Manage announcements displayed on the homepage</CardDescription>
              </div>
              <Button>Add New Announcement</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Weekly Prayer Meeting",
                    description: "Join us every Wednesday at 7 PM for our community prayer session.",
                    date: "Every Wednesday",
                    status: "Active",
                  },
                  {
                    title: "Community Service Day",
                    description: "Volunteer with us as we serve our local community next weekend.",
                    date: "June 15, 2025",
                    status: "Active",
                  },
                  {
                    title: "Annual Retreat Registration",
                    description: "Registration for our annual spiritual retreat is now open.",
                    date: "Registration closes July 1",
                    status: "Active",
                  },
                  {
                    title: "Holiday Schedule",
                    description: "Special service times during the upcoming holiday season.",
                    date: "December 2025",
                    status: "Draft",
                  },
                ].map((announcement, index) => (
                  <div key={index} className="rounded-md border">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <div className="font-medium">{announcement.title}</div>
                        <div className="text-sm text-muted-foreground">{announcement.date}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            announcement.status === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          {announcement.status}
                        </div>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="border-t p-4">
                      <p className="text-sm text-muted-foreground">{announcement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mission" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mission Statement</CardTitle>
              <CardDescription>Edit the organization's mission statement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mission-statement">Mission Statement</Label>
                  <Textarea
                    id="mission-statement"
                    className="mt-1"
                    rows={4}
                    defaultValue="ADFEL exists to foster spiritual growth, build meaningful connections, and empower members to serve their communities through Christ-centered fellowship and outreach."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Core Values</CardTitle>
              <CardDescription>Manage the organization's core values</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Faith",
                    description: "Grounded in Biblical teachings and Adventist principles",
                  },
                  {
                    title: "Community",
                    description: "Building meaningful relationships and supporting one another",
                  },
                  {
                    title: "Service",
                    description: "Sharing God's love through compassionate action",
                  },
                ].map((value, index) => (
                  <div key={index} className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <Input defaultValue={value.title} className="w-full" />
                      <Button variant="ghost" size="icon" className="ml-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea className="mt-2" rows={2} defaultValue={value.description} />
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Add New Value
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Website Pages</CardTitle>
                <CardDescription>Manage content for all website pages</CardDescription>
              </div>
              <Button>Create New Page</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Home",
                    url: "/",
                    lastUpdated: "2 days ago",
                  },
                  {
                    title: "About",
                    url: "/about",
                    lastUpdated: "1 week ago",
                  },
                  {
                    title: "Events",
                    url: "/events",
                    lastUpdated: "3 days ago",
                  },
                  {
                    title: "Donate",
                    url: "/donate",
                    lastUpdated: "5 days ago",
                  },
                  {
                    title: "Contact",
                    url: "/contact",
                    lastUpdated: "2 weeks ago",
                  },
                ].map((page, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md border p-4">
                    <div>
                      <div className="font-medium">{page.title}</div>
                      <div className="text-sm text-muted-foreground">{page.url}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">Last updated: {page.lastUpdated}</div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Link href={`/dashboard/content/edit?page=${page.url}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

