"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, MapPin, Search } from "lucide-react"

// implemnt google map api 

const events = [
  {
    id: 1,
    title: "Genfel",
    description: "Join us for a time of prayer and fellowship as we lift up our community and world.",
    date: "Every Friday",
    time: "7:00 PM - 9:00 PM",
    location: "SLT-1",
    address: "Sci-tech, UWI Mona",
    image: "/placeholder.svg?height=200&width=400",
    category: "fellowship",
  },
  {
    id: 2,
    title: "Annual Blue Mountain Hike",
    description: "Volunteer with us as we serve our local community through various outreach projects.",
    date: "To be announce",
    time: "To be announce",
    location: "To be announce",
    address: "To be announce",
    image: "/placeholder.svg?height=200&width=400",
    category: "retreat",
  },
  {
    id: 3,
    title: "Annual Retreat",
    description: "A weekend of spiritual renewal, fellowship, and growth in a beautiful mountain setting.",
    date: "To be announce",
    time: "To be announce",
    location: "To be announce",
    address: "To be announce",
    image: "/placeholder.svg?height=200&width=400",
    category: "retreat",
  },
  {
    id: 4,
    title: "Singspiration",
    description: "A special Bible study series for young adults focusing on faith in the modern world.",
    date: "To be announce",
    time: "To be announce",
    location: "To be announce",
    address: "To be announce",
    image: "/placeholder.svg?height=200&width=400",
    category: "service",
  },
  {
    id: 5,
    title: "Chapel Weekend",
    description: "Bring your favorite dish and join us for food, fellowship, and fun for the whole family.",
    date: "To be announce",
    time: "To be announce",
    location: "To be announce",
    address: "To be announce",
    image: "/placeholder.svg?height=200&width=400",
    category: "service",
  },
  {
    id: 6,
    title: "All Night Prayer & Fasting",
    description: "Learn about holistic health principles and practical wellness strategies for abundant living.",
    date: "To be announce",
    time: "To be announce",
    location: "To be announce",
    address: "To be announce",
    image: "/placeholder.svg?height=200&width=400",
    category: "prayer",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [setSelectedEvent] = useState<(typeof events)[0] | null>(null)

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
                <TabsTrigger value="retreat">Retreat</TabsTrigger>
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
      </div>
    </div>
  )
}

