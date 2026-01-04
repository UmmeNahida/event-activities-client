"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  CalendarDays,
  MapPin,
  Users,
  DollarSign,
  Flag,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useState } from "react";
import { addReview } from "@/services/participants/participants-service";
import { toast } from "sonner";
import { createReport } from "@/services/report/report";
import { EventDetails as EventDetailsType } from "@/types/event-details.interface";
import ParticipantsModal from "../modals/ParticipantsModal";

const fakeEvent = {
  id: "93f6ceb3-0814-4bc1-8569-b793a59db4d6",
  name: "Basketball Championship 2025",
  type: "Sports",
  description:
    "A fun and competitive swimming event for all age groups.",
  location: "Los Angeles",
  image:
    "https://res.cloudinary.com/dwzrn00z3/image/upload/v1765825854/file-1765825851095-720719944.jpg",
  date: "2025-12-17T16:00:00.000Z",
  time: "22:00",
  minParticipants: 55,
  maxParticipants: 150000,
  participantCount: 50001,
  fee: 500,
  status: "OPEN",

  participants: [
    {
      id: "d3266d81-2f9e-4a62-b8c8-1f3abfbbdf8d",
      userId: "014bb2db-7de3-4247-8645-e65022a108ac",
      eventId: "5b825f8d-830c-4572-82d0-6856d08cd179",
      paid: false,
      joinedAt: "2025-12-16T18:32:24.019Z",
      user: {
        id: "014bb2db-7de3-4247-8645-e65022a108ac",
        name: "Ayesha Jahan",
        image:
          "https://res.cloudinary.com/dwzrn00z3/image/upload/v1765828939/file-1765828936641-147058489.jpg",
        location: "Dhaka, Bangladesh",
        hobbies: ["Reading", "Cooking", "Hiking"],
        interests: ["Swimming", "Traveling", "Photography"],
      },
    },
    {
      id: "d3266d81-2f9e-4a62-b8c8-1f3abfbbdf",
      userId: "014bb2db-7de3-4247-8645-e65022a108ac",
      eventId: "5b825f8d-830c-4572-82d0-6856d08cd179",
      paid: false,
      joinedAt: "2025-12-16T18:32:24.019Z",
      user: {
        id: "014bb2db-7de3-4247-8645-e65022a108ac",
        name: "Ayesha Jahan",
        image:
          "https://res.cloudinary.com/dwzrn00z3/image/upload/v1765828939/file-1765828936641-147058489.jpg",
        location: "Dhaka, Bangladesh",
        hobbies: ["Reading", "Cooking", "Hiking"],
        interests: ["Swimming", "Traveling", "Photography"],
      },
    },
    {
      id: "d3266d81-2f9e-4a62-b8c8-1f3abfbbdf8",
      userId: "014bb2db-7de3-4247-8645-e65022a108ac",
      eventId: "5b825f8d-830c-4572-82d0-6856d08cd179",
      paid: false,
      joinedAt: "2025-12-16T18:32:24.019Z",
      user: {
        id: "014bb2db-7de3-4247-8645-e65022a108ac",
        name: "Ayesha Jahan",
        image:
          "https://res.cloudinary.com/dwzrn00z3/image/upload/v1765828939/file-1765828936641-147058489.jpg",
        location: "Dhaka, Bangladesh",
        hobbies: ["Reading", "Cooking", "Hiking"],
        interests: ["Swimming", "Traveling", "Photography"],
      },
    },
    {
      id: "d3266d81-2f9e-4a62",
      userId: "014bb2db-7de3-4247-8645-e65022a108ac",
      eventId: "5b825f8d-830c-4572-82d0-6856d08cd179",
      paid: false,
      joinedAt: "2025-12-16T18:32:24.019Z",
      user: {
        id: "014bb2db-7de3-4247-8645-e65022a108ac",
        name: "Ayesha Jahan",
        image:
          "https://res.cloudinary.com/dwzrn00z3/image/upload/v1765828939/file-1765828936641-147058489.jpg",
        location: "Dhaka, Bangladesh",
        hobbies: ["Reading", "Cooking", "Hiking"],
        interests: ["Swimming", "Traveling", "Photography"],
      },
    },
    {
      id: "d3266d81-2f9e-4a62-b8c8-1f3abfb",
      userId: "014bb2db-7de3-4247-8645-e65022a108ac",
      eventId: "5b825f8d-830c-4572-82d0-6856d08cd179",
      paid: false,
      joinedAt: "2025-12-16T18:32:24.019Z",
      user: {
        id: "014bb2db-7de3-4247-8645-e65022a108ac",
        name: "Ayesha Jahan",
        image:
          "https://res.cloudinary.com/dwzrn00z3/image/upload/v1765828939/file-1765828936641-147058489.jpg",
        location: "Dhaka, Bangladesh",
        hobbies: ["Reading", "Cooking", "Hiking"],
        interests: ["Swimming", "Traveling", "Photography"],
      },
    },
    {
      id: "d3266d81-2f9e-4a62-b8c8-1f3ab",
      userId: "014bb2db-7de3-4247-8645-e65022a108ac",
      eventId: "5b825f8d-830c-4572-82d0-6856d08cd179",
      paid: false,
      joinedAt: "2025-12-16T18:32:24.019Z",
      user: {
        id: "014bb2db-7de3-4247-8645-e65022a108ac",
        name: "Ayesha Jahan",
        image:
          "https://res.cloudinary.com/dwzrn00z3/image/upload/v1765828939/file-1765828936641-147058489.jpg",
        location: "Dhaka, Bangladesh",
        hobbies: ["Reading", "Cooking", "Hiking"],
        interests: ["Swimming", "Traveling", "Photography"],
      },
    },
    {
      id: "d3266d81-2f9e-4a62-b8c8-1f3",
      userId: "014bb2db-7de3-4247-8645-e65022a108ac",
      eventId: "5b825f8d-830c-4572-82d0-6856d08cd179",
      paid: false,
      joinedAt: "2025-12-16T18:32:24.019Z",
      user: {
        id: "014bb2db-7de3-4247-8645-e65022a108ac",
        name: "Ayesha Jahan",
        image:
          "https://res.cloudinary.com/dwzrn00z3/image/upload/v1765828939/file-1765828936641-147058489.jpg",
        location: "Dhaka, Bangladesh",
        hobbies: ["Reading", "Cooking", "Hiking"],
        interests: ["Swimming", "Traveling", "Photography"],
      },
    },
  ],

  host: {
    id: "16e5f2b3-13ce-4f58-9ef4-b308eec4cf40",
    name: "Fatiha Jahan",
    image:
      "https://res.cloudinary.com/dwzrn00z3/image/upload/v1765818099/file-1765818096783-315475286.jpg",
    bio: "Professional sports event organizer with 8+ years of experience.",
    location: "California, USA",
    socials: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
    },
  },
};

export default function EventDetails({
  events,
}: {
  events: EventDetailsType;
}) {
  const [openParticipants, setOpenParticipants] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmitReview = async () => {
    const payload = {
      eventId: events.id,
      rating,
      comment: review,
    };

    const giveReview = await addReview(payload);

    if (giveReview.id) {
      toast.success("Thanks for your review");
    }
    setReview("");
    setRating(0);
  };

  const handleReport = async () => {
    if (!reason.trim()) {
      toast.error("Please describe the issue");
      return;
    }

    const payload = {
      targetUserId: events.host.id,
      targetEventId: events.id,
      reason,
    };

    const res = await createReport(payload);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    setReason(""); // clear textarea
  };

  return (
    <div className="container mx-auto mt-24 max-w-6xl px-4 py-8 space-y-8">
      {/* Event Banner */}
      <Card className="overflow-hidden">
        <div className="relative h-80 w-full">
          <Image
            src={events?.image || fakeEvent.image}
            alt={events?.name || fakeEvent.name}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl md:text-3xl">
                {events?.name || fakeEvent.name}
              </CardTitle>
              <CardDescription className="mt-2 flex flex-wrap gap-4">
                <span className="flex items-center gap-1">
                  <CalendarDays size={16} />{" "}
                  {new Date(
                    events?.date || fakeEvent.date
                  ).toDateString()}{" "}
                  • {events?.time || fakeEvent.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={16} />{" "}
                  {events?.location || fakeEvent.location}
                </span>
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              {events?.status || fakeEvent.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            {events?.description || fakeEvent.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Users size={16} />{" "}
              {events?.participantCount || fakeEvent.participantCount}
              /{events?.maxParticipants || fakeEvent.maxParticipants}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <DollarSign size={16} /> Fee: ৳
              {events?.fee || fakeEvent.fee}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star size={16} /> Type:{" "}
              {events?.type || fakeEvent.type}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Participants</CardTitle>
          <Button
            onClick={() => setOpenParticipants(true)}
            variant="outline"
            size="sm"
          >
            View all participants
          </Button>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-3">
            {events.participants.slice(0, 6).map((p) => (
              <Avatar key={p.id}>
                <AvatarImage src={p.user.image} />
                <AvatarFallback>
                  {p.user.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            ))}

            {events.participantCount > 6 && (
              <span className="text-sm text-muted-foreground">
                +{events.participantCount - 6} more
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Host Info */}
      <Card>
        <CardHeader>
          <CardTitle>Hosted By</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={events.host.image || fakeEvent.host.image}
            />
            <AvatarFallback>
              {fakeEvent.host.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <p className="text-lg font-semibold">
              {events.host.name || fakeEvent.host.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {events.host.bio || fakeEvent.host.bio}
            </p>
            <p className="text-sm flex items-center gap-1">
              <MapPin size={14} />{" "}
              {events.host.location || fakeEvent.host.location}
            </p>
            <div className="flex gap-3 pt-2">
              <a href={fakeEvent.host.socials.facebook}>
                <Facebook size={18} />
              </a>
              <a href={fakeEvent.host.socials.twitter}>
                <Twitter size={18} />
              </a>
              <a href={fakeEvent.host.socials.instagram}>
                <Instagram size={18} />
              </a>
              <a href={fakeEvent.host.socials.instagram}>
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Section */}
      <Card>
        <CardHeader>
          <CardTitle>Leave a Review</CardTitle>
          <CardDescription>
            Your feedback helps others
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={22}
                onClick={() => setRating(star)}
                className={`cursor-pointer ${
                  rating >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <Textarea
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Button onClick={handleSubmitReview}>Submit Review</Button>
        </CardContent>
      </Card>

      {/* Report Section */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <Flag size={18} /> Report Event
          </CardTitle>
          <CardDescription>
            If this event violates rules, report it
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe the issue..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <Button
            variant="destructive"
            onClick={handleReport}
            disabled={!reason.trim()}
          >
            Submit Report
          </Button>
        </CardContent>
      </Card>

      {/* participants modal */}
      <ParticipantsModal
        open={openParticipants}
        onClose={() => setOpenParticipants(false)}
        eventId={events.id}
      />
    </div>
  );
}
