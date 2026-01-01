/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, Eye, Trash2, Edit } from "lucide-react";
import UpdateEventModal from "./UpdateEventModal";
import ManagementTable, { Column } from "@/components/shared/ManagementTable";
import { toast } from "sonner";
import Image from "next/image";

// ================= types =================
export type HostEvent = {
    id: string;
    name: string;
    date: string; // ISO
    time: string;
    location: string;
    participantCount: number;
    image: string;
    fee: number;
    description: string;
    status: string;
    type:string;
    minParticipants: number;
    maxParticipants: number;
    participants: any[];
};

 const eventDetails = {
        id: "3",
        name: "Basketball Championship",
        image: "https://i.ibb.co.com/KVKynTg/download-2.jpg",
        date: "August 5, 2024 • 3:00 PM",
        location: "Sports Arena, Los Angeles",
        type: "Sports",
        fee: 30,
        // host: {
        //     name: "Mike Johnson",
        //     avatar: "https://i.pravatar.cc/150?img=33",
        // }
    }

// ================= props =================
type HostEventsTableProps = {
    events: HostEvent[];
};

export default function HostEventsTable({ events }: HostEventsTableProps) {
  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(eventDetails);
  const [selectedEvent, setSelectedEvent] = useState<HostEvent | null>(null);

  /* ---------------- handlers ---------------- */

  const handleEdit = (event: HostEvent) => {
    setEditingEvent(event);
    setOpen(true);
  };

  const handleView = (event: HostEvent) => {
    setSelectedEvent(event);
  };

  /* ---------------- columns ---------------- */

  const columns: Column<HostEvent>[] = [
    {
      header: "Event Name",
      accessor: "name",
      sortKey: "name",
    },
    {
      header: "Date & Time",
      accessor: (row) => (
        <div className="text-sm">
          <p>{new Date(row.date).toLocaleDateString()}</p>
          <p className="text-muted-foreground">{row.time}</p>
        </div>
      ),
      sortKey: "date",
    },
    {
      header: "Location",
      accessor: "location",
    },
    {
      header: "Participants",
      accessor: (row) => row.participantCount,
    },
    {
      header: "Fee",
      accessor: (row) => (
        <Badge variant={row.fee === 0 ? "secondary" : "outline"}>
          {row.fee === 0 ? "Free" : `৳${row.fee}`}
        </Badge>
      ),
      sortKey: "fee",
    },
  ];

  /* ---------------- UI ---------------- */

  return (
    <div className="w-full space-y-4">
   
      {/* table */}
      <ManagementTable
        data={events}
        columns={columns}
        getRowKey={(row) => row.id}
        onView={handleView}
        onEdit={handleEdit}
        emptyMessage="No events found"
      />

      {/* view modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>

          {selectedEvent && (
            <div className="space-y-2 text-sm">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.name}
                width='500'
                height='500'
                className="w-full h-40 object-cover rounded-lg"
              />
              <p><b>Name:</b> {selectedEvent.name}</p>
              <p><b>Description:</b> {selectedEvent.description}</p>
              <p><b>Date:</b> {new Date(selectedEvent.date).toLocaleDateString()}</p>
              <p><b>Time:</b> {selectedEvent.time}</p>
              <p><b>Status:</b> {selectedEvent.status}</p>
              <p><b>Location:</b> {selectedEvent.location}</p>
              <p><b>Participants:</b> {selectedEvent.participantCount}</p>
              <p><b>Fee:</b> {selectedEvent.fee === 0 ? "Free" : `৳${selectedEvent.fee}`}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* edit modal */}
      <UpdateEventModal
        open={open}
        onOpenChange={setOpen}
        defaultValues={editingEvent}
      />
    </div>
  );
}
