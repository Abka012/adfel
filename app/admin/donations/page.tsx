"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, CreditCard, Download, Edit, Heart, Search, Settings, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Sample donation data
const donations = [
  {
    id: "DON-1234",
    donor: "John Smith",
    email: "john.smith@example.com",
    amount: 250.0,
    date: "2025-03-15",
    paymentMethod: "Credit Card",
    status: "completed",
  },
  {
    id: "DON-1235",
    donor: "Sarah Johnson",
    email: "sarah.j@example.com",
    amount: 100.0,
    date: "2025-03-14",
    paymentMethod: "PayPal",
    status: "completed",
  },
  {
    id: "DON-1236",
    donor: "Michael Chen",
    email: "mchen@example.com",
    amount: 500.0,
    date: "2025-03-12",
    paymentMethod: "Credit Card",
    status: "completed",
  },
  {
    id: "DON-1237",
    donor: "Rebecca Williams",
    email: "rwilliams@example.com",
    amount: 75.0,
    date: "2025-03-10",
    paymentMethod: "PayPal",
    status: "completed",
  },
  {
    id: "DON-1238",
    donor: "David Rodriguez",
    email: "drodriguez@example.com",
    amount: 150.0,
    date: "2025-03-08",
    paymentMethod: "Credit Card",
    status: "completed",
  },
  {
    id: "DON-1239",
    donor: "Anonymous",
    email: "anonymous@example.com",
    amount: 1000.0,
    date: "2025-03-05",
    paymentMethod: "Bank Transfer",
    status: "pending",
  },
]

export default function DonationsManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("donations")
  const { toast } = useToast()

  // Filter donations based on search term
  const filteredDonations = donations.filter((donation) => {
    return (
      donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // Calculate total donations
  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0)

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your payment settings have been updated successfully.",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Donations Management</h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDonations.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime donations received</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Donors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Unique donors this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Donation</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125.75</div>
            <p className="text-xs text-muted-foreground">Average donation amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Goal</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">$3,750 of $5,000 monthly goal</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="donations">
            <Heart className="mr-2 h-4 w-4" />
            Donations
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Payment Settings
          </TabsTrigger>
          <TabsTrigger value="goals">
            <BarChart3 className="mr-2 h-4 w-4" />
            Donation Goals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="donations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Donation Records</CardTitle>
              <CardDescription>View and manage all donations received</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search donations..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Donor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDonations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center">
                          No donations found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDonations.map((donation) => (
                        <TableRow key={donation.id}>
                          <TableCell className="font-medium">{donation.id}</TableCell>
                          <TableCell>
                            <div>{donation.donor}</div>
                            <div className="text-xs text-muted-foreground">{donation.email}</div>
                          </TableCell>
                          <TableCell>${donation.amount.toFixed(2)}</TableCell>
                          <TableCell>{new Date(donation.date).toLocaleDateString()}</TableCell>
                          <TableCell>{donation.paymentMethod}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                donation.status === "completed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : donation.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Settings</CardTitle>
              <CardDescription>Configure your payment processing options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    <div className="font-medium">Stripe</div>
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">Connected</div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="stripe-public-key">Public Key</Label>
                    <Input id="stripe-public-key" type="text" value="pk_test_•••••••••••••••••••••••••" readOnly />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="stripe-secret-key">Secret Key</Label>
                    <Input id="stripe-secret-key" type="password" value="sk_test_•••••••••••••••••••••••••" readOnly />
                  </div>
                  <Button variant="outline" size="sm">
                    Update Keys
                  </Button>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5">P</div>
                    <div className="font-medium">PayPal</div>
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">Connected</div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="paypal-client-id">Client ID</Label>
                    <Input id="paypal-client-id" type="text" value="client_id_•••••••••••••••••••••••••" readOnly />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="paypal-secret">Client Secret</Label>
                    <Input
                      id="paypal-secret"
                      type="password"
                      value="client_secret_•••••••••••••••••••••••••"
                      readOnly
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    Update Keys
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings}>Save Payment Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Donation Goals</CardTitle>
              <CardDescription>Set and track fundraising goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Monthly Operations</div>
                  <div className="text-sm text-green-600 dark:text-green-400">Active</div>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>$3,750 raised of $5,000 goal</span>
                    <span>75%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-blue-600 dark:bg-blue-400" style={{ width: "75%" }}></div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Goal
                    </Button>
                    <Button variant="outline" size="sm">
                      View Donations
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Youth Center Renovation</div>
                  <div className="text-sm text-green-600 dark:text-green-400">Active</div>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>$12,500 raised of $50,000 goal</span>
                    <span>25%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-blue-600 dark:bg-blue-400" style={{ width: "25%" }}></div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Goal
                    </Button>
                    <Button variant="outline" size="sm">
                      View Donations
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="w-full">Create New Donation Goal</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

