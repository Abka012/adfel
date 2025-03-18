"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, MapPin, Search } from "lucide-react"

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
    coordinates: { lat: 34.052235, lng: -118.243683 },
    image: "/placeholder.svg?height=200&width=400",
    category: "prayer",
  },
  {
    id: 2,
    title: "Community Service Day",
    description: "Volunteer with us as we serve our local community through various outreach projects.",
    date: "June 15, 2025",
    time: "9:00 AM - 2:00 PM",
    location: "City Park",
    address: "456 Community Lane, Hopeville, CA 90210",
    coordinates: { lat: 34.053235, lng: -118.253683 },
    image: "/placeholder.svg?height=200&width=400",
    category: "service",
  },
  {
    id: 3,
    title: "Annual Spiritual Retreat",
    description: "A weekend of spiritual renewal, fellowship, and growth in a beautiful mountain setting.",
    date: "July 20-22, 2025",
    time: "Begins Friday 6:00 PM",
    location: "Mountain View Retreat Center",
    address: "789 Mountain Road, Pine Valley, CA 92062",
    coordinates: { lat: 34.054235, lng: -118.263683 },
    image: "/placeholder.svg?height=200&width=400",
    category: "retreat",
  },
  {
    id: 4,
    title: "Youth Bible Study",
    description: "A special Bible study series for young adults focusing on faith in the modern world.",
    date: "Every Friday",
    time: "6:30 PM - 8:00 PM",
    location: "ADFEL Youth Center",
    address: "123 Faith Avenue, Hopeville, CA 90210",
    coordinates: { lat: 34.052235, lng: -118.243683 },
    image: "/placeholder.svg?height=200&width=400",
    category: "study",
  },
  {
    id: 5,
    title: "Family Fellowship Potluck",
    description: "Bring your favorite dish and join us for food, fellowship, and fun for the whole family.",
    date: "Last Sunday of each month",
    time: "  fellowship, and fun for the whole family.",
    date: "Last Sunday of each month",
    time: "12:00 PM - 2:00 PM",
    location: "ADFEL Community Hall",
    address: "123 Faith Avenue, Hopeville, CA 90210",
    coordinates: { lat: 34.052235, lng: -118.243683 },
    image: "/placeholder.svg?height=200&width=400",
    category: "fellowship",
  },
  {
    id: 6,
    title: "Health & Wellness Seminar",
    description: "Learn about holistic health principles and practical wellness strategies for abundant living.",
    date: "June 30, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "ADFEL Community Center",
    address: "123 Faith Avenue, Hopeville, CA 90210",
    coordinates: { lat: 34.052235, lng: -118.243683 },
    image: "/placeholder.svg?height=200&width=400",
    category: "health",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null)

  // Filter events based on search term and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Upcoming Events</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Join us for these upcoming events and activities. Connect with our community and grow in faith together.
          </p>
        </div>

        <div className="mt-8 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search events..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs
              defaultValue="all"
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="w-full sm:w-auto"
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="prayer">Prayer</TabsTrigger>
                <TabsTrigger value="service">Service</TabsTrigger>
                <TabsTrigger value="study">Study</TabsTrigger>
                <TabsTrigger value="fellowship">Fellowship</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={400}
                  height={200}
                  className="h-48 w-full object-cover"
                />
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <CalendarDays className="mr-1 h-4 w-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="mr-1 h-4 w-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="mr-1 h-4 w-4" />
                      {event.location}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-400">{event.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setSelectedEvent(event)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <h3 className="mt-2 text-lg font-semibold">No events found</h3>
              <p className="mb-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-950">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                <Button variant="ghost" size="icon" onClick={() => setSelectedEvent(null)}>
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </Button>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Image
                    src={selectedEvent.image || "/placeholder.svg"}
                    alt={selectedEvent.title}
                    width={500}
                    height={300}
                    className="rounded-lg object-cover"
                  />
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <CalendarDays className="mr-2 h-5 w-5" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Clock className="mr-2 h-5 w-5" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <MapPin className="mr-2 h-5 w-5" />
                      <span>{selectedEvent.location}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedEvent.address}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">About this event</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">{selectedEvent.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Location</h3>
                    <div className="mt-2 h-[200px] rounded-lg bg-gray-100 dark:bg-gray-800">
                      {/* Google Maps would be integrated here in a real application */}
                      <div className="flex h-full items-center justify-center">
                        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                          Google Maps integration would display the location here.
                          <br />
                          {selectedEvent.address}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">Register</Button>
                    <Button variant="outline" className="flex-1">
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

