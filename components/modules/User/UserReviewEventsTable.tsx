"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LocateIcon, LocationEdit, Map, MapIcon, MapPin, Star } from "lucide-react";

// 🔹 Dummy Reviewed Events Data (based on your schema)
const reviewedEvents = [
  {
    id: "59f4385b-3fb4-44d5-a8d9-1aa4a2b661f2",
    name: "City Sports Meetup",
    type: "sports",
    location: "Convention Center, San Francisco",
    date: "2025-12-14T17:07:00.000Z",
    fee: 50,
    rating: 4,
    review: "Well organized event. Enjoyed a lot!",
    host: {
      id: "e5d69f6b-92b4-441f-a2cb-386b4d82e181",
      name: "Ebadul Haque",
      image:
        "https://res.cloudinary.com/dwzrn00z3/image/upload/v1765723396/file-1765723394979-411624104.jpg",
    },
  },
  {
    id: "aa94385b-3fb4-44d5-a8d9-1aa4a2b61234",
    name: "Tech Community Talk",
    type: "technology",
    location: "Dhaka",
    date: "2025-11-20T10:00:00.000Z",
    fee: 0,
    rating: 5,
    review: "Excellent speakers and great networking opportunity.",
    host: {
      id: "bb569f6b-92b4-441f-a2cb-386b4d821111",
      name: "Nahid Hasan",
      image: "https://i.pravatar.cc/150?img=32",
    },
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

export default function UserReviewedEventsTable() {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Reviewed Events</h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-sm text-muted-foreground text-left">
                <th className="py-3">Event</th>
                <th>Host</th>
                <th>Date</th>
                <th>Rating</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {reviewedEvents.map((event) => (
                <tr key={event.id} className="border-b last:border-none">
                  <td className="py-3 space-y-2.5">
                    <p className="font-medium">{event.name}</p>
                    <p className="text-sm flex items-center gap-x-1 text-muted-foreground">
                      <span className="text-blue-500 text-sm"><MapPin/></span> {event.location}
                    </p>
                    <Badge variant="secondary" className="mt-1">
                      {event.type}
                    </Badge>
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={event.host.image} />
                        <AvatarFallback>
                          {event.host.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{event.host.name}</span>
                    </div>
                  </td>

                  <td className="text-sm">
                    {new Date(event.date).toLocaleDateString()}
                  </td>

                  <td>
                    <StarRating rating={event.rating} />
                  </td>

                  <td className="max-w-xs text-sm text-muted-foreground">
                    {event.review}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {reviewedEvents.map((event) => (
            <div key={event.id} className="border rounded-2xl p-4 space-y-3">
              <div>
                <h3 className="font-semibold">{event.name}</h3>
                <p className="text-sm text-muted-foreground">📍 {event.location}</p>
              </div>

              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={event.host.image} />
                  <AvatarFallback>
                    {event.host.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">Host: {event.host.name}</span>
              </div>

              <div className="flex justify-between items-center">
                <StarRating rating={event.rating} />
                <span className="text-xs text-muted-foreground">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">{event.review}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
