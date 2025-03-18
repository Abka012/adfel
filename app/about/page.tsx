import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Users, BookOpen } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container px-4 py-12 md:px-6 md:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About ADFEL</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Learn more about our mission, values, and the community we serve.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div>
            <Image
              src="/placeholder.svg?height=500&width=600"
              width={600}
              height={500}
              alt="ADFEL Community"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Our Story</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                ADFEL (Adventist Fellowship) was founded in 1985 by a small group of dedicated Seventh-day Adventist
                members who saw the need for a community organization focused on fellowship, service, and spiritual
                growth. What began as a small gathering has grown into a vibrant community with hundreds of active
                members and alumni.
              </p>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Over the decades, we have remained committed to our founding principles while adapting to meet the
                changing needs of our community. Today, ADFEL continues to be a place where people can connect, grow in
                their faith, and make a positive impact in the world.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                ADFEL exists to foster spiritual growth, build meaningful connections, and empower members to serve
                their communities through Christ-centered fellowship and outreach.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Our Values</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <Card>
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <BookOpen className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    <h3 className="mt-4 font-medium">Faith</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Grounded in Biblical teachings and Adventist principles
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <Users className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    <h3 className="mt-4 font-medium">Community</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Building meaningful relationships and supporting one another
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <Heart className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    <h3 className="mt-4 font-medium">Service</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Sharing God's love through compassionate action
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="leadership" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="beliefs">Beliefs</TabsTrigger>
            </TabsList>
            <TabsContent value="leadership" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Our Leadership Team</h2>
                <p className="text-center text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                  Our dedicated leadership team brings diverse experiences and a shared commitment to serving our
                  community.
                </p>
                <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-3">
                  {[
                    {
                      name: "Raniel Smith",
                      role: "ADFEL President",
                      bio: "Short bio",
                      image: "/placeholder.svg?height=300&width=300",
                    },
                    {
                      name: "Danielle Lewis",
                      role: "UWI Campus President",
                      bio: "Short bio",
                      image: "/placeholder.svg?height=300&width=300",
                    },
                    {
                      name: "Alexander Rose",
                      role: "UTECH Campus President",
                      bio: "Short bio",
                      image: "/placeholder.svg?height=300&width=300",
                    }
                  ].map((leader, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className="relative h-24 w-24 rounded-full overflow-hidden">
                            <Image
                              src={leader.image || "/placeholder.svg"}
                              alt={leader.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="mt-4 font-medium">{leader.name}</h3>
                          <p className="text-sm text-blue-600 dark:text-blue-400">{leader.role}</p>
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{leader.bio}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="history" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Our History</h2>
                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="relative border-l border-gray-200 dark:border-gray-800 pl-8 ml-4">
                    <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 top-1 dark:bg-blue-400"></div>
                    <div>
                      <h3 className="text-lg font-bold">1985: Foundation</h3>
                      <p className="mt-2 text-gray-500 dark:text-gray-400">
                        ADFEL was founded by a group of 12 Seventh-day Adventist members who wanted to create a space
                        for fellowship and community service.
                      </p>
                    </div>
                  </div>
                  <div className="relative border-l border-gray-200 dark:border-gray-800 pl-8 ml-4">
                    <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 top-1 dark:bg-blue-400"></div>
                    <div>
                      <h3 className="text-lg font-bold">1990: Growth and Expansion</h3>
                      <p className="mt-2 text-gray-500 dark:text-gray-400">
                        The organization expanded its programs to include youth ministries and community outreach
                        initiatives, growing to over 50 active members.
                      </p>
                    </div>
                  </div>
                  <div className="relative border-l border-gray-200 dark:border-gray-800 pl-8 ml-4">
                    <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 top-1 dark:bg-blue-400"></div>
                    <div>
                      <h3 className="text-lg font-bold">2000: New Community Center</h3>
                      <p className="mt-2 text-gray-500 dark:text-gray-400">
                        ADFEL opened its first dedicated community center, providing a permanent home for meetings,
                        events, and service programs.
                      </p>
                    </div>
                  </div>
                  <div className="relative border-l border-gray-200 dark:border-gray-800 pl-8 ml-4">
                    <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 top-1 dark:bg-blue-400"></div>
                    <div>
                      <h3 className="text-lg font-bold">2010: 25th Anniversary</h3>
                      <p className="mt-2 text-gray-500 dark:text-gray-400">
                        ADFEL celebrated 25 years of service with a special anniversary event and the launch of a
                        scholarship program for young members.
                      </p>
                    </div>
                  </div>
                  <div className="relative border-l border-gray-200 dark:border-gray-800 pl-8 ml-4">
                    <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 top-1 dark:bg-blue-400"></div>
                    <div>
                      <h3 className="text-lg font-bold">Present Day</h3>
                      <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Today, ADFEL continues to grow and adapt, serving hundreds of members and reaching thousands in
                        our community through various programs and initiatives.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="beliefs" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Our Beliefs</h2>
                <p className="text-center text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                  As a Seventh-day Adventist organization, we hold to the fundamental beliefs of the Adventist church
                  while emphasizing community, service, and spiritual growth.
                </p>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Scripture",
                      description:
                        "We believe the Bible is God's inspired Word and the authoritative revealer of doctrines.",
                    },
                    {
                      title: "Salvation",
                      description:
                        "We believe in salvation through faith in Jesus Christ and His sacrifice on our behalf.",
                    },
                    {
                      title: "Sabbath",
                      description: "We observe the seventh-day Sabbath as a day of rest, worship, and ministry.",
                    },
                    {
                      title: "Second Coming",
                      description: "We look forward to the soon return of Jesus Christ as promised in Scripture.",
                    },
                    {
                      title: "Wholistic Living",
                      description:
                        "We believe in caring for our bodies as temples of the Holy Spirit through healthy living.",
                    },
                    {
                      title: "Service",
                      description:
                        "We are committed to serving others as an expression of God's love in our communities.",
                    },
                  ].map((belief, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h3 className="font-medium">{belief.title}</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{belief.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    For a complete statement of Seventh-day Adventist beliefs, please visit the official church website.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-16 rounded-lg bg-blue-50 p-8 dark:bg-blue-950/30">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Join Our Community</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Whether you're looking for spiritual growth, meaningful connections, or opportunities to serve, we welcome
              you to become part of the ADFEL family.
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row justify-center">
              <Link href="/events">
                <Button className="bg-blue-600 hover:bg-blue-700">Upcoming Events</Button>
              </Link>
              <Link href="/donate">
                <Button
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-100 dark:border-blue-800 dark:hover:bg-blue-950"
                >
                  Support Our Mission
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

