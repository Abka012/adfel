"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, ImageIcon, MapPin, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewEventPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    address: "",
    category: "fellowship",
    isRecurring: false,
    recurringPattern: "weekly",
    status: "draft",
    featuredImage: null as File | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEventData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setEventData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setEventData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEventData((prev) => ({ ...prev, featuredImage: e.target.files![0] }))
    }
  }

  const handleSubmit = (e: React.FormEvent, saveAsDraft = false) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, this would call an API to save the event
    const dataToSubmit = {
      ...eventData,
      status: saveAsDraft ? "draft" : "active",
    }

    console.log("Submitting event data:", dataToSubmit)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)

      toast({
        title: saveAsDraft ? "Draft saved" : "Event published",
        description: saveAsDraft
          ? "Your event has been saved as a draft."
          : "Your event has been published successfully.",
      })

      router.push("/dashboard/events")
    }, 1000)
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Create New Event</h2>
      </div>

      <form onSubmit={(e) => handleSubmit(e, false)}>
        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">
              <CalendarDays className="mr-2 h-4 w-4" />
              Event Details
            </TabsTrigger>
            <TabsTrigger value="location">
              <MapPin className="mr-2 h-4 w-4" />
              Location
            </TabsTrigger>
            <TabsTrigger value="schedule">
              <Clock className="mr-2 h-4 w-4" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="media">
              <ImageIcon className="mr-2 h-4 w-4" />
              Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Event Information</CardTitle>
                <CardDescription>Enter the basic details about your event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter event title"
                    value={eventData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter event description"
                    value={eventData.description}
                    onChange={handleInputChange}
                    rows={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={eventData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prayer">Prayer</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="study">Study</SelectItem>
                      <SelectItem value="fellowship">Fellowship</SelectItem>
                      <SelectItem value="retreat">Retreat</SelectItem>
                      <SelectItem value="health">Health & Wellness</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle>Event Location</CardTitle>
                <CardDescription>Specify where the event will take place</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location Name</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., ADFEL Community Center"
                    value={eventData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="Enter full address"
                    value={eventData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="rounded-md border p-4">
                  <div className="mb-2 font-medium">Map Location</div>
                  <div className="h-[200px] rounded-md bg-muted flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Google Maps integration would appear here</p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    In a production environment, you would be able to pin the exact location on a map
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Event Schedule</CardTitle>
                <CardDescription>Set the date, time, and recurrence pattern</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={eventData.date}
                      onChange={handleInputChange}
                      required={!eventData.isRecurring}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={eventData.time}
                      onChange={handleInputChange}
                      required={!eventData.isRecurring}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isRecurring"
                    checked={eventData.isRecurring}
                    onCheckedChange={(checked) => handleSwitchChange("isRecurring", checked)}
                  />
                  <Label htmlFor="isRecurring">This is a recurring event</Label>
                </div>
                {eventData.isRecurring && (
                  <div className="space-y-2">
                    <Label htmlFor="recurringPattern">Recurrence Pattern</Label>
                    <RadioGroup
                      value={eventData.recurringPattern}
                      onValueChange={(value) => handleSelectChange("recurringPattern", value)}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="daily" />
                        <Label htmlFor="daily">Daily</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekly" id="weekly" />
                        <Label htmlFor="weekly">Weekly</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly">Monthly</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="custom" id="custom" />
                        <Label htmlFor="custom">Custom</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="recurringDescription">Display Date/Time As</Label>
                  <Input
                    id="recurringDescription"
                    name="date"
                    placeholder="e.g., Every Wednesday, 7:00 PM - 8:30 PM"
                    value={eventData.date}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    For recurring events, enter how the date/time should be displayed to users
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>Event Media</CardTitle>
                <CardDescription>Upload images and other media for the event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="featuredImage">Featured Image</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-32 w-48 rounded-md border bg-muted flex items-center justify-center">
                      {eventData.featuredImage ? (
                        <p className="text-sm">Image selected</p>
                      ) : (
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <Input id="featuredImage" type="file" accept="image/*" onChange={handleFileChange} />
                      <p className="text-xs text-muted-foreground">Recommended size: 1200 x 600 pixels</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <Card>
            <CardHeader>
              <CardTitle>Event Status</CardTitle>
              <CardDescription>Set the visibility status of this event</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={eventData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active">Active - Visible to all users</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="draft" id="draft" />
                  <Label htmlFor="draft">Draft - Only visible to administrators</Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/dashboard/events")} type="button">
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={(e) => handleSubmit(e, true)} disabled={isSubmitting} type="button">
                  Save as Draft
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Saving..." : "Publish Event"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </Tabs>
      </form>
    </div>
  )
}

