"use client";
import Image from "next/image";
import Link from "next/link";

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
        <Link
          key={event.id}
          href={`/events/${event.id}`}
          className="border rounded-xl shadow hover:shadow-lg transition p-4"
        >
          <div className="relative h-40 w-full mb-3 rounded-lg overflow-hidden">
            <Image
              src={event.image || "/placeholder.png"}
              alt={event.name}
              fill
              className="object-cover"
            />
          </div>

          <h3 className="font-semibold text-lg">{event.name}</h3>
          <p className="text-sm text-muted-foreground">{event.type}</p>

          <div className="flex items-center justify-between mt-3 text-sm">
            <span>📍 {event.location}</span>
            <span>💰 {event.fee} BDT</span>
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            {new Date(event.date).toLocaleDateString()}
          </p>
        </Link>
      ))}
    </div>
  );
}
