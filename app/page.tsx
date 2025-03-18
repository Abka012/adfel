import Link from "next/link"
import Image from "next/image"
import { CalendarDays, ChevronRight, Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Welcome to ADFEL</h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Strengthening faith, building community, and serving others through Christ-centered fellowship.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/events">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Upcoming Events
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/donate">
                  <Button
                    variant="outline"
                    className="border-blue-200 hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-800"
                  >
                    Support Our Mission
                    <Heart className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="/placeholder.svg?height=400&width=500"
              width={500}
              height={400}
              alt="ADFEL Community"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-12 md:py-16 lg:py-20 bg-blue-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Mission</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  ADFEL is dedicated to fostering spiritual growth, community service, and fellowship among Seventh-day
                  Adventist members and alumni.
                </p>
              </div>
              <ul className="grid gap-2">
                <li className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="ml-3 text-gray-700 dark:text-gray-300">
                    Building a supportive community of faith
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Heart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="ml-3 text-gray-700 dark:text-gray-300">Serving those in need with compassion</span>
                </li>
                <li className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <CalendarDays className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="ml-3 text-gray-700 dark:text-gray-300">
                    Creating opportunities for spiritual growth
                  </span>
                </li>
              </ul>
            </div>
            <Image
              src="/placeholder.svg?height=400&width=600"
              width={600}
              height={400}
              alt="ADFEL Mission"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join Our Community</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Become a part of ADFEL and connect with like-minded individuals on a journey of faith.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  Learn more about ADFEL
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

