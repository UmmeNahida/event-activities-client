"use client";
import Image from "next/image";
import Link from "next/link";
import EventCard from "./EventCard";

export default function EventsGrid({ events, loading }: any) {
  if (loading) {
    return <p className="text-center py-10">Loading events...</p>;
  }

  if (!events?.length) {
    return (
      <p className="text-center py-10 text-muted-foreground">
        No events found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event: any) => (
        <EventCard event={event}></EventCard>
      ))}
    </div>
  );
}
