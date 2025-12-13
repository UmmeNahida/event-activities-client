"use client"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge, Calendar, CheckCircle, ChevronLeft, Clock, Heart, Info, MapPin, Share2, Star, Ticket, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = { params: { eventId: string } };

const eventData = {
  id: "1",
  title: "Summer Music Festival 2024",
  image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80",
  date: "June 15, 2024",
  time: "6:00 PM - 11:30 PM",
  location: "Central Park, New York",
  fullAddress: "Central Park, 830 5th Ave, New York, NY 10065",
  category: "Music",
  price: "Starts from $45",
  isPaid: true,
  attendees: 1247,
  capacity: 2000,
  host: {
    name: "John Doe",
    image: "https://i.pravatar.cc/150?img=12",
    bio: "Event organizer with 5+ years of experience in music festivals",
    rating: 4.8,
    eventsHosted: 23,
    verified: true,
  },
  description:
    "Join us for the ultimate summer music experience! This year's Summer Music Festival features headlining performances from world-renowned artists, local talent showcases, and unforgettable moments under the stars. With multiple stages, diverse genres, and an electric atmosphere, this is the event of the season you don't want to miss.",
  highlights: [
    "5+ hours of live music performances",
    "Multiple stages featuring different genres",
    "Food trucks and beverage stations",
    "VIP lounge access available",
    "Meet and greet opportunities with artists",
    "Photo booth and interactive installations",
  ],
  included: [
    "Festival entry pass",
    "Access to all stages and performances",
    "Event program and map",
    "Complimentary water refill stations",
  ],
  tags: ["Music", "Festival", "Outdoor", "Live Performance"],
}

const EventDetailsPage =  ({ params }: Props) => {
  const { eventId } = params;
  const router = useRouter()
  return (
        <div className="min-h-screen bg-background">
      {/* <Navbar userRole="guest" /> */}

      <div className="pt-20">
        {/* Hero Image */}
        <div className="relative h-[400px] md:h-[500px] w-full">
          <Image
            src={eventData.image}
            alt={eventData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

          {/* Back Button */}
          <div className="absolute top-6 left-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.back()}
              className="bg-white/90 hover:bg-white text-foreground backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </div>

          {/* Actions */}
          <div className="absolute top-6 right-6 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white/90 hover:bg-white backdrop-blur-sm"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              // onClick={() => setBookmarked(!bookmarked)}
              className="bg-white/90 hover:bg-white backdrop-blur-sm"
            >
              <Heart
                className={`w-4 h-4 fill-red-500 text-red-500`}
              />
            </Button>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container mx-auto">
              <Badge className="mb-3 bg-primary text-primary-foreground">
                {eventData.category}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                {eventData.title}
              </h1>
              <div className="flex items-center gap-2 text-white/90">
                <Users className="w-4 h-4" />
                <span className="text-sm">
                  {eventData.attendees} attending • {eventData.capacity} capacity
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Event Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Info Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-xl p-5 space-y-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">{eventData.date}</p>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-5 space-y-2">
                  <Clock className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-semibold">{eventData.time}</p>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-5 space-y-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{eventData.location}</p>
                  </div>
                </div>
              </div>

              {/* About Event */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Info className="w-6 h-6 text-primary" />
                  About This Event
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {eventData.description}
                </p>
              </div>

              {/* Event Highlights */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="text-2xl font-bold">Event Highlights</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {eventData.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's Included */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="text-2xl font-bold">What&apos;s Included</h2>
                <ul className="space-y-2">
                  {eventData.included.map((item: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location Details */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <h2 className="text-2xl font-bold">Location</h2>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold mb-1">{eventData.location}</p>
                    <p className="text-sm text-muted-foreground">
                      {eventData.fullAddress}
                    </p>
                  </div>
                </div>
                {/* Placeholder for map */}
                <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-muted-foreground" />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {eventData.tags.map((tag: string, index: number) => (
                  <Badge
                    key={index}
                    // variant="secondary"
                    className="rounded-full px-4 py-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Price Card */}
                <div className="bg-card border-2 border-border rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Price</p>
                      <p className="text-3xl font-bold text-primary">{eventData.price}</p>
                    </div>
                    <Ticket className="w-10 h-10 text-primary" />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Attendees</span>
                      <span className="font-medium">
                        {eventData.attendees} / {eventData.capacity}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${(eventData.attendees / eventData.capacity) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg font-semibold">
                    {eventData.isPaid ? "Get Tickets" : "Register Now"}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    You won&apos;t be charged yet
                  </p>
                </div>

                {/* Host Card */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-lg">Hosted by</h3>
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Image
                        src={eventData.host.image}
                        alt={eventData.host.name}
                        width={56}
                        height={56}
                        className="rounded-full"
                      />
                      {eventData.host.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                          <CheckCircle className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{eventData.host.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 fill-primary text-primary" />
                        <span>{eventData.host.rating}</span>
                        <span>•</span>
                        <span>{eventData.host.eventsHosted} events</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{eventData.host.bio}</p>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </div>

                {/* Share */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-3">
                  <h3 className="font-bold">Share this event</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="flex-1">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="flex-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="flex-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  )
}

export default EventDetailsPage