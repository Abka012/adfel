"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, CreditCard, DollarSign, Building, Users } from "lucide-react"

// Load Stripe outside of a component's render to avoid recreating the Stripe object on every render
// Replace with your own publishable key from the Stripe dashboard
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "your_stripe_publishable_key")

function CheckoutForm({ amount, customAmount, donationFrequency }: {
  amount: string,
  customAmount: string,
  donationFrequency: string
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [email, setEmail] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState("")

  // Calculate the actual amount to charge
  const finalAmount = amount === "custom" ? customAmount : amount

  useEffect(() => {
    // Create a payment intent as soon as the amount changes
    if (finalAmount && parseFloat(finalAmount) > 0) {
      // In a real application, you would call your API to create a payment intent
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(finalAmount) * 100, // Convert to cents for Stripe
          currency: "usd",
          frequency: donationFrequency
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret)
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err)
          setError("Error preparing payment. Please try again.")
        })
    }
  }, [finalAmount, donationFrequency])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError(null)

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      setIsProcessing(false)
      return
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      setError("Something went wrong with your card information.")
      setIsProcessing(false)
      return
    }

    // Execute the payment
    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: cardholderName,
          email: email,
        },
      },
    })

    if (paymentError) {
      setError(paymentError.message || "Payment failed. Please try again.")
      setIsProcessing(false)
    } else if (paymentIntent.status === "succeeded") {
      // Payment successful!
      alert("Thank you for your donation! Your payment was processed successfully.")
      // You could redirect to a success page or update UI as needed
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="card-name">Name on Card</Label>
        <Input
          id="card-name"
          placeholder="John Doe"
          required
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email for Receipt</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Card Details</Label>
        <div className="rounded-md border border-gray-200 p-3 dark:border-gray-800">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}

      <Button
        type="submit"
        className="w-full"
        disabled={isProcessing || !stripe || !finalAmount || parseFloat(finalAmount) <= 0}
      >
        {isProcessing
          ? "Processing..."
          : `Donate $${finalAmount || "0"}`}
      </Button>
    </form>
  )
}

function PayPalCheckout({ amount, customAmount, donationFrequency }: {
  amount: string,
  customAmount: string,
  donationFrequency: string
}) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Calculate the actual amount to charge
  const finalAmount = amount === "custom" ? customAmount : amount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError(null)

    try {
      // In a real application, you would redirect to PayPal or use their SDK
      // This is a simplified example that would be replaced with actual PayPal integration
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: finalAmount,
          currency: "USD",
          frequency: donationFrequency,
          payer: {
            email_address: email,
            name: {
              given_name: name.split(" ")[0],
              surname: name.split(" ").slice(1).join(" ")
            }
          }
        }),
      })

      const data = await response.json()

      if (data.id) {
        // Redirect to PayPal approval URL
        window.location.href = data.links.find((link: any) => link.rel === "approve").href
      } else {
        throw new Error("Failed to create PayPal order")
      }
    } catch (err) {
      console.error("PayPal error:", err)
      setError("Error processing PayPal payment. Please try again.")
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="paypal-name">Full Name</Label>
        <Input
          id="paypal-name"
          placeholder="John Doe"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="paypal-email">PayPal Email</Label>
        <Input
          id="paypal-email"
          type="email"
          placeholder="your@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}

      <Button
        type="submit"
        className="w-full bg-[#0070ba] hover:bg-[#005ea6]"
        disabled={isProcessing || !finalAmount || parseFloat(finalAmount) <= 0}
      >
        {isProcessing
          ? "Processing..."
          : `Donate $${finalAmount || "0"} with PayPal`}
      </Button>
    </form>
  )
}

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState<string>("50")
  const [customAmount, setCustomAmount] = useState<string>("")
  const [paymentMethod, setPaymentMethod] = useState<string>("card")
  const [donationFrequency, setDonationFrequency] = useState<string>("one-time")

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
                <div className="space-y-6">
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
                    <Tabs
                      defaultValue="one-time"
                      className="w-full"
                      value={donationFrequency}
                      onValueChange={setDonationFrequency}
                    >
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
                          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.067 7.301C20.067 10.248 18.207 12.098 15.293 12.098H13.535C13.288 12.098 13.077 12.28 13.043 12.524L12.478 16.306L12.067 18.783C12.043 18.941 12.166 19.086 12.326 19.086H14.142C14.356 19.086 14.541 18.929 14.57 18.717L14.594 18.586L14.955 16.404L14.984 16.239C15.014 16.026 15.198 15.869 15.412 15.869H15.716C17.96 15.869 19.687 14.764 20.17 12.169C20.377 11.04 20.258 10.078 19.652 9.391C19.486 9.206 19.283 9.047 19.047 8.916C19.452 8.408 19.741 7.772 19.85 7.014C19.863 7.14 19.874 7.266 19.883 7.393C19.89 7.514 19.894 7.636 19.894 7.759C19.893 7.606 19.884 7.453 19.884 7.301H20.067V7.301Z" fill="#1593C0" />
                            <path d="M19.047 8.917C19.283 9.048 19.486 9.207 19.653 9.392C20.259 10.079 20.377 11.041 20.17 12.17C19.687 14.765 17.96 15.87 15.717 15.87H15.412C15.198 15.87 15.014 16.027 14.985 16.24L14.955 16.405L14.594 18.587L14.57 18.718C14.541 18.93 14.356 19.087 14.142 19.087H12.326C12.166 19.087 12.043 18.942 12.066 18.784L12.862 14.011L13.043 12.525C13.077 12.28 13.288 12.099 13.535 12.099H15.293C18.207 12.099 20.067 10.248 20.067 7.302H19.884C19.884 7.454 19.893 7.607 19.893 7.76C19.893 8.193 19.837 8.594 19.735 8.962C19.526 8.941 19.292 8.926 19.047 8.917Z" fill="#0E82A0" />
                            <path d="M13.043 12.525L12.862 14.011L12.066 18.784C12.043 18.942 12.166 19.087 12.326 19.087H14.142C14.356 19.087 14.541 18.93 14.57 18.718L14.594 18.587L14.955 16.405L14.985 16.24C15.014 16.027 15.198 15.87 15.412 15.87H15.717C17.96 15.87 19.687 14.765 20.17 12.17C20.377 11.041 20.259 10.079 19.653 9.392C19.486 9.207 19.283 9.048 19.047 8.917C18.811 8.786 18.542 8.683 18.247 8.604C17.979 8.532 17.689 8.477 17.377 8.44C17.155 8.414 16.921 8.4 16.679 8.395C16.633 8.394 16.586 8.394 16.539 8.393H10.654C10.44 8.393 10.247 8.519 10.192 8.708L8.691 16.313C8.671 16.442 8.77 16.56 8.9 16.56H11.069L11.836 12.099H13.535C13.288 12.099 13.077 12.28 13.043 12.525Z" fill="#001F60" />
                            <path d="M10.193 8.708C10.248 8.518 10.44 8.392 10.654 8.392H16.539C16.586 8.393 16.633 8.393 16.679 8.394C16.921 8.398 17.155 8.413 17.377 8.439C17.689 8.476 17.979 8.531 18.247 8.603C18.542 8.682 18.81 8.785 19.047 8.916C19.292 8.925 19.526 8.94 19.735 8.961C19.837 8.593 19.893 8.192 19.893 7.759C19.894 7.636 19.89 7.514 19.883 7.393C19.875 7.267 19.864 7.14 19.85 7.014C19.801 6.629 19.714 6.258 19.588 5.914C19.305 5.163 18.828 4.535 18.159 4.095C17.417 3.607 16.442 3.333 15.323 3.333H10.818C10.603 3.333 10.411 3.46 10.356 3.649L7.358 18.783C7.335 18.941 7.457 19.086 7.617 19.086H9.829L10.654 14.358L10.193 8.708Z" fill="#0070E0" />
                          </svg>
                          PayPal
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "card" && (
                    <Elements stripe={stripePromise}>
                      <CheckoutForm
                        amount={donationAmount}
                        customAmount={customAmount}
                        donationFrequency={donationFrequency}
                      />
                    </Elements>
                  )}

                  {paymentMethod === "paypal" && (
                    <PayPalCheckout
                      amount={donationAmount}
                      customAmount={customAmount}
                      donationFrequency={donationFrequency}
                    />
                  )}
                </div>
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
