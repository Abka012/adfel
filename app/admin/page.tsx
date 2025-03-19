import Link from "next/link"
import { BarChart3, CalendarDays, FileText, Heart, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Next event in 3 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Donations</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,325</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Website Visitors</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,482</div>
            <p className="text-xs text-muted-foreground">+7% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Donation Overview</CardTitle>
            <CardDescription>Monthly donation trends for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full rounded-md border">
              {/* Chart would go here - using placeholder */}
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Donation chart visualization would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  icon: <CalendarDays className="h-4 w-4" />,
                  title: "New event created",
                  description: "Community Service Day on June 15",
                  timestamp: "2 hours ago",
                },
                {
                  icon: <Heart className="h-4 w-4" />,
                  title: "Donation received",
                  description: "$250 from John Smith",
                  timestamp: "5 hours ago",
                },
                {
                  icon: <FileText className="h-4 w-4" />,
                  title: "Content updated",
                  description: "Homepage mission statement edited",
                  timestamp: "Yesterday",
                },
                {
                  icon: <Users className="h-4 w-4" />,
                  title: "New member registered",
                  description: "Sarah Johnson joined ADFEL",
                  timestamp: "2 days ago",
                },
                {
                  icon: <BarChart3 className="h-4 w-4" />,
                  title: "Monthly report generated",
                  description: "May 2025 activity summary",
                  timestamp: "3 days ago",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">{item.icon}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/events/new">
              <Button variant="outline" className="w-full justify-start">
                <CalendarDays className="mr-2 h-4 w-4" />
                Create New Event
              </Button>
            </Link>
            <Link href="/admin/content">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Update Homepage Content
              </Button>
            </Link>
            <Link href="/admin/donations">
              <Button variant="outline" className="w-full justify-start">
                <Heart className="mr-2 h-4 w-4" />
                View Donation Records
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next 3 scheduled events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Weekly Prayer Meeting",
                date: "Tomorrow, 7:00 PM",
                location: "ADFEL Community Center",
              },
              {
                title: "Youth Bible Study",
                date: "Friday, 6:30 PM",
                location: "ADFEL Youth Center",
              },
              {
                title: "Community Service Day",
                date: "June 15, 9:00 AM",
                location: "City Park",
              },
            ].map((event, index) => (
              <div key={index} className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.date}</p>
                <p className="text-xs text-muted-foreground">{event.location}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Website and services health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "Website",
                status: "Operational",
                indicator: "bg-green-500",
              },
              {
                name: "Database",
                status: "Operational",
                indicator: "bg-green-500",
              },
              {
                name: "Payment Processing",
                status: "Operational",
                indicator: "bg-green-500",
              },
              {
                name: "Email Service",
                status: "Operational",
                indicator: "bg-green-500",
              },
              {
                name: "Backup System",
                status: "Last backup: 6 hours ago",
                indicator: "bg-green-500",
              },
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${service.indicator}`} />
                  <p className="text-sm font-medium">{service.name}</p>
                </div>
                <p className="text-xs text-muted-foreground">{service.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

