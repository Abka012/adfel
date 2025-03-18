"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, CreditCard, DollarSign, Building, Users } from "lucide-react"

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState<string>("50")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // In a real application, you would process the payment here
    // using Stripe, PayPal, or another payment processor

    setTimeout(() => {
      setIsProcessing(false)
      // Show success message or redirect
      alert("Thank you for your donation! This is a demo, no actual payment was processed.")
    }, 1500)
  }

  const handleAmountChange = (value: string) => {
    setDonationAmount(value)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomAmount(value)
      setDonationAmount("custom")
    }
  }

  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Support Our Mission</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Your generous donations help us strengthen our community, support our ministries, and spread God's love.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-950/30">
              <h2 className="mb-4 text-2xl font-bold">Why Donate?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Heart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Support Community Outreach</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Supporting us also supports global mission-minded young people, who participate in evangelistic efforts, mission trips, and local outreach, actively fulfilling the Great Commission and making a real difference.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Youth Programs</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Your donation helps nurture young people in their faith, providing Bible-based programs, mentorship, and character-building activities that guide them to become Christ-centered leaders in their churches and communities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium">Facility Maintenance</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Help us maintain and improve our facilities so we can continue to be a safe, welcoming space where young people can grow spiritually, build lifelong friendships, and develop valuable life skills.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Image
                src="/placeholder.svg?height=300&width=600"
                width={600}
                height={300}
                alt="Community outreach"
                className="rounded-lg object-cover"
              />
            </div>
          </div>

          <div>
            <Card className="border-blue-100 dark:border-blue-900/30">
              <CardHeader>
                <CardTitle>Make a Donation</CardTitle>
                <CardDescription>Your contribution makes a difference in our community</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDonationSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Donation Amount</Label>
                    <RadioGroup
                      value={donationAmount}
                      onValueChange={handleAmountChange}
                      className="grid grid-cols-3 gap-2"
                    >
                      {["25", "50", "100", "250", "500", "custom"].map((amount) => (
                        <div
                          key={amount}
                          className={cn(
                            "flex items-center justify-center rounded-md border border-gray-200 p-3 dark:border-gray-800",
                            donationAmount === amount &&
                            "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30",
                          )}
                        >
                          <RadioGroupItem value={amount} id={`amount-${amount}`} className="sr-only" />
                          <Label htmlFor={`amount-${amount}`} className="cursor-pointer text-sm font-medium">
                            {amount === "custom" ? "Custom" : `$${amount}`}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    {donationAmount === "custom" && (
                      <div className="mt-2 flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <Input
                          type="text"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          placeholder="Enter amount"
                          className="ml-1"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Donation Frequency</Label>
                    <Tabs defaultValue="one-time" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="one-time">One-time</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-2">
                      <div
                        className={cn(
                          "flex items-center rounded-md border border-gray-200 p-3 dark:border-gray-800",
                          paymentMethod === "card" &&
                          "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30",
                        )}
                      >
                        <RadioGroupItem value="card" id="payment-card" />
                        <Label htmlFor="payment-card" className="ml-2 flex cursor-pointer items-center">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Credit / Debit Card
                        </Label>
                      </div>
                      <div
                        className={cn(
                          "flex items-center rounded-md border border-gray-200 p-3 dark:border-gray-800",
                          paymentMethod === "paypal" &&
                          "border-blue-600 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30",
                        )}
                      >
                        <RadioGroupItem value="paypal" id="payment-paypal" />
                        <Label htmlFor="payment-paypal" className="ml-2 flex cursor-pointer items-center">
                          <Image
                            src="/placeholder.svg?height=16&width=16"
                            width={16}
                            height={16}
                            alt="PayPal"
                            className="mr-2 h-4 w-4"
                          />
                          PayPal
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Name on Card</Label>
                        <Input id="card-name" placeholder="John Doe" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" required />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Receipt</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>

                  <Button type="submit" className="w-full" disabled={isProcessing}>
                    {isProcessing
                      ? "Processing..."
                      : `Donate $${donationAmount === "custom" ? customAmount || "0" : donationAmount}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to conditionally join class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

