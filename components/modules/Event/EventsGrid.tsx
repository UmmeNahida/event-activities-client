/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import EventCard from "./EventCard";

// interface EventGridProps {
//   events: EventType[],
//   loading:boolean
// }

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
      {events.map((event:any,inx:number) => (
        <EventCard key={inx} event={event}></EventCard>
      ))}
    </div>
  );
}
