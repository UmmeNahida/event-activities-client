"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Star } from "lucide-react";
import { useState } from "react";
import { flattenBy } from "@tanstack/react-table";

// 🔹 Dummy Past Events Data
const pastEvents = [
  {
    id: 1,
    title: "Startup Summit 2024",
    date: "2024-10-12",
    location: "Dhaka",
    type: "Business",
    attended: true,
    reviewed: true,
  },
  {
    id: 2,
    title: "UI/UX Workshop",
    date: "2024-09-05",
    location: "Rajshahi",
    type: "Design",
    attended: true,
    reviewed: false,
  },
  {
    id: 3,
    title: "Music Night",
    date: "2024-08-18",
    location: "Chittagong",
    type: "Music",
    attended: false,
    reviewed: false,
  },
];

const defaultValue = {
    id: 3,
    title: "Music Night",
    date: "2024-08-18",
    location: "Chittagong",
    type: "Music",
    attended: false,
    reviewed: false,
  }


export default function PastEventsTable() {

  const [open,setOpen] = useState(false);

  const handleEventDetails = async(id:number)=>{
    const event = pastEvents.find((e)=> e.id == id)
    
  }

  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Past Events</h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-sm text-muted-foreground text-left">
                <th className="py-3">Event</th>
                <th>Date</th>
                <th>Location</th>
                <th>type</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pastEvents.map((event) => (
                <tr key={event.id} className="border-b last:border-none">
                  <td className="py-3 font-medium">{event.title}</td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td>{event.type}</td>
                  <td>
                    {event.attended ? (
                      <Badge variant="secondary">Attended</Badge>
                    ) : (
                      <Badge variant="outline">Missed</Badge>
                    )}
                  </td>
                  <td className="text-right space-x-2">
                    <Button onClick={()=>handleEventDetails(event.id)} size="icon" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {/* {!event.reviewed && event.attended && (
                      <Button size="icon" variant="default">
                        <Star className="w-4 h-4" />
                      </Button>
                    )} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {pastEvents.map((event) => (
            <div key={event.id} className="border rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">{event.title}</h3>
                {event.attended ? (
                  <Badge variant="secondary">Attended</Badge>
                ) : (
                  <Badge variant="outline">Missed</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">📅 {event.date}</p>
              <p className="text-sm">📍 {event.location}</p>
              <p className="text-sm">🏷️ {event.type}</p>

              <div className="flex gap-2 pt-2">
                <Button onClick={()=>handleEventDetails(event.id)} size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" /> Details
                </Button>
                {/* {!event.reviewed && event.attended && (
                  <Button size="sm" className="flex-1">
                    <Star className="w-4 h-4 mr-1" /> Review
                  </Button>
                )} */}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
