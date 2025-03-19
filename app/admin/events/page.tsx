"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, Edit, Eye, Filter, MapPin, Plus, Search, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

// Sample event data
const events = [
  {
    id: 1,
    title: "Weekly Prayer Meeting",
    description: "Join us for a time of prayer and fellowship as we lift up our community and world.",
    date: "Every Wednesday",
    time: "7:00 PM - 8:30 PM",
    location: "ADFEL Community Center",
    address: "123 Faith Avenue, Hopeville, CA 90210",
    category: "prayer",
    status: "active",
  },
  {
    id: 2,
    title: "Community Service Day",
    description: "Volunteer with us as we serve our local community through various outreach projects.",
    date: "June 15, 2025",
    time: "9:00 AM - 2:00 PM",
    location: "City Park",
    address: "456 Community Lane, Hopeville, CA 90210",
    category: "service",
    status: "active",
  },
  {
    id: 3,
    title: "Annual Spiritual Retreat",
    description: "A weekend of spiritual renewal, fellowship, and growth in a beautiful mountain setting.",
    date: "July 20-22, 2025",
    time: "Begins Friday 6:00 PM",
    location: "Mountain View Retreat Center",
    address: "789 Mountain Road, Pine Valley, CA 92062",
    category: "retreat",
    status: "active",
  },
  {
    id: 4,
    title: "Youth Bible Study",
    description: "A special Bible study series for young adults focusing on faith in the modern world.",
    date: "Every Friday",
    time: "6:30 PM - 8:00 PM",
    location: "ADFEL Youth Center",
    address: "123 Faith Avenue, Hopeville, CA 90210",
    category: "study",
    status: "active",
  },
  {
    id: 5,
    title: "Family Fellowship Potluck",
    description: "Bring your favorite dish and join us for food, fellowship, and fun for the whole family.",
    date: "Last Sunday of each month",
    time: "12:00 PM - 2:00 PM",
    location: "ADFEL Community Hall",
    address: "123 Faith Avenue, Hopeville, CA 90210",
    category: "fellowship",
    status: "active",
  },
  {
    id: 6,
    title: "Health & Wellness Seminar",
    description: "Learn about holistic health principles and practical wellness strategies for abundant living.",
    date: "June 30, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "ADFEL Community Center",
    address: "123 Faith Avenue, Hopeville, CA 90210",
    category: "health",
    status: "draft",
  },
]

export default function EventsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const { toast } = useToast()

  // Filter events based on search term and active tab
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && event.status === "active") ||
      (activeTab === "draft" && event.status === "draft") ||
      activeTab === event.category
    return matchesSearch && matchesTab
  })

  const handleDeleteClick = (eventId: number) => {
    setSelectedEventId(eventId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    // In a real app, this would call an API to delete the event
    console.log(`Deleting event with ID: ${selectedEventId}`)
    setDeleteDialogOpen(false)

    // Show success toast
    toast({
      title: "Event deleted",
      description: "The event has been successfully deleted.",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Events Management</h2>
        <Link href="/admin/events/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Event
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search events..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem onClick={() => setActiveTab("all")}>All Events</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("active")}>Active Events</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("draft")}>Draft Events</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("prayer")}>Prayer Events</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("service")}>Service Events</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("study")}>Study Events</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveTab("fellowship")}>Fellowship Events</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
          <TabsTrigger value="all" className="rounded-md px-3 py-1 text-sm">
            All
          </TabsTrigger>
          <TabsTrigger value="active" className="rounded-md px-3 py-1 text-sm">
            Active
          </TabsTrigger>
          <TabsTrigger value="draft" className="rounded-md px-3 py-1 text-sm">
            Draft
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Events ({filteredEvents.length})</CardTitle>
              <CardDescription>Manage your upcoming and recurring events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEvents.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <h3 className="mt-2 text-lg font-semibold">No events found</h3>
                    <p className="mb-4 mt-1 text-sm text-muted-foreground">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setActiveTab("all")
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <div key={event.id} className="rounded-md border">
                      <div className="flex flex-col justify-between p-4 sm:flex-row sm:items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{event.title}</span>
                            <span
                              className={`rounded-full px-2 py-1 text-xs ${
                                event.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                              }`}
                            >
                              {event.status === "active" ? "Active" : "Draft"}
                            </span>
                          </div>
                          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <CalendarDays className="mr-1 h-4 w-4" />
                              {event.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              {event.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 sm:mt-0">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-1 h-4 w-4" />
                            Preview
                          </Button>
                          <Link href={`/admin/events/edit/${event.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="mr-1 h-4 w-4" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-950/30 dark:hover:text-red-300"
                            onClick={() => handleDeleteClick(event.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="border-t p-4">
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

