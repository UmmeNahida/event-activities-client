/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";
import { IJoinedEventResponse } from "@/types/passed-event.interface";
import { dateFormatter } from "@/components/shared/DateFormatter";
import { EventDetailsModal } from "../modals/EventDetailsModal";
import { toast } from "sonner";
// import { unsaveEventAction } from "@/services/savedEvents/savedEventActions";

export default function SavedEventsTable({
  saveEvents,
}: {
  saveEvents: IJoinedEventResponse;
}) {
  const [events, setEvents] = useState(saveEvents.data)
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleView = (event: any) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleRemove = async(id: string) => {
    setEvents((prev: any[]) => prev.filter((item) => item.id !== id));
    // const eventDelete = await unsaveEventAction(id)
    // if(!eventDelete.success){
    //   toast.error(eventDelete.message || "Event unsave hase been failed")
    // }
    toast.success( "Event has been unsave successfully")
  };

  return (
    <div>
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-4">
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
                {events.map((item: any) => {
                  const { formattedDate, formattedTime } =
                    dateFormatter(item.event.date);

                  return (
                    <tr
                      key={item.id}
                      className="border-b last:border-none"
                    >
                      <td className="py-3 font-medium">
                        {item.event.name}
                      </td>

                      <td className="text-sm">
                        <p>{formattedDate}</p>
                        <p className="text-muted-foreground">
                          {formattedTime}
                        </p>
                      </td>

                      <td>{item.event.location}</td>
                      <td>{item.event.type}</td>

                      <td>
                        <Badge
                          variant={
                            item.event.status === "OPEN"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {item.event.status}
                        </Badge>
                      </td>

                      <td className="text-right space-x-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleView(item.event)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleRemove(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {saveEvents.data.map((item: any) => {
              const { formattedDate, formattedTime } = dateFormatter(
                item.event.date
              );

              return (
                <div
                  key={item.id}
                  className="border rounded-2xl p-4 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">
                      {item.event.name}
                    </h3>

                    <Badge
                      variant={
                        item.event.status === "OPEN"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {item.event.status}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    📅 {formattedDate}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ⏰ {formattedTime}
                  </p>
                  <p className="text-sm">📍 {item.event.location}</p>
                  <p className="text-sm">🏷️ {item.event.type}</p>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleRemove(item.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Remove
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <EventDetailsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        event={selectedEvent}
      />
    </div>
  );
}
