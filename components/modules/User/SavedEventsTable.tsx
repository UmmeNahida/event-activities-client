"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";

// 🔹 Dummy Data
const savedEvents = [
  {
    id: 1,
    title: "Tech Conference 2025",
    date: "2025-02-12",
    location: "Dhaka",
    category: "Technology",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Music Festival",
    date: "2025-03-05",
    location: "Chittagong",
    category: "Music",
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Startup Meetup",
    date: "2024-12-20",
    location: "Sylhet",
    category: "Business",
    status: "Completed",
  },
];

export default function SavedEventsTable() {
  const [events, setEvents] = useState(savedEvents);

  const handleRemove = (id: number) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Saved Events</h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left text-sm text-muted-foreground">
                <th className="py-3">Event</th>
                <th>Date</th>
                <th>Location</th>
                <th>Category</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b last:border-none">
                  <td className="py-3 font-medium">{event.title}</td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td>{event.category}</td>
                  <td>
                    <Badge variant={event.status === "Upcoming" ? "default" : "secondary"}>
                      {event.status}
                    </Badge>
                  </td>
                  <td className="text-right space-x-2">
                    <Button size="icon" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleRemove(event.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border rounded-2xl p-4 space-y-2"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{event.title}</h3>
                <Badge variant={event.status === "Upcoming" ? "default" : "secondary"}>
                  {event.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">📅 {event.date}</p>
              <p className="text-sm">📍 {event.location}</p>
              <p className="text-sm">🏷️ {event.category}</p>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" /> View
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleRemove(event.id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
