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
    minParticipants: number;
    maxParticipants: number;
    category: string;
    participants: any[];
};

 const eventDetails = {
        id: "3",
        name: "Basketball Championship",
        image: "https://i.ibb.co.com/KVKynTg/download-2.jpg",
        date: "August 5, 2024 • 3:00 PM",
        location: "Sports Arena, Los Angeles",
        type: "Sports",
        price: "Starts from $30",
        isPaid: true,
        host: {
            name: "Mike Johnson",
            avatar: "https://i.pravatar.cc/150?img=33",
        }
    }

// ================= props =================
type HostEventsTableProps = {
    events: HostEvent[];
};

export default function HostEventsTable({ events }: HostEventsTableProps) {
    const [data, setData] = useState<HostEvent[]>(events);
    const [open, setOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(eventDetails)
    const [selectedEvent, setSelectedEvent] = useState<HostEvent | null>(null);

    const handleDelete = (id: string) => {
        // 🔥 backend call here
        setData((prev) => prev.filter((e) => e.id !== id));
    };

 

    const handleEdit = (id: any) => {
        setOpen(true)
        setEditingEvent(id)
    }

    const columns: ColumnDef<HostEvent>[] = [
        {
            accessorKey: "name",
            header: "Event Name",
        },
        {
            header: "Date & Time",
            cell: ({ row }) => (
                <div className="text-sm">
                    <p>{new Date(row.original.date).toLocaleDateString()}</p>
                    <p className="text-muted-foreground">{row.original.time}</p>
                </div>
            ),
        },
        {
            accessorKey: "location",
            header: "Location",
        },
        {
            header: "Participants",
            cell: ({ row }) => row.original.participantCount,
        },
        {
            header: "Fee",
            cell: ({ row }) => (
                <Badge variant={row.original.fee === 0 ? "secondary" : "outline"}>
                    {row.original.fee === 0 ? "Free" : `৳${row.original.fee}`}
                </Badge>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(row.original)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Event
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => setSelectedEvent(row.original)}>
                            <Eye className="mr-2 h-4 w-4" /> View
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(row.original.id)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-full space-y-4">
            {/* search */}
            <div className="flex flex-col sm:flex-row gap-3">
                <Input placeholder="Search events..." className="sm:max-w-xs" />
            </div>

            {/* table */}
            <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-sm">
                    <thead className="bg-muted">
                        {table.getHeaderGroups().map((hg) => (
                            <tr key={hg.id}>
                                {hg.headers.map((header) => (
                                    <th key={header.id} className="px-4 py-3 text-left font-medium">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length === 0 && (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-6 text-muted-foreground">
                                    No events found
                                </td>
                            </tr>
                        )}
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-t">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-3">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* view modal */}
            <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Event Details</DialogTitle>
                    </DialogHeader>
                    {selectedEvent && (
                        <div className="space-y-2 text-sm">
                            <img
                                src={selectedEvent.image}
                                alt={selectedEvent.name}
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <p>Description: {selectedEvent.description} </p>
                            <p><b>Name:</b> {selectedEvent.name}</p>
                            <p><b>Date:</b> {new Date(selectedEvent.date).toLocaleDateString()}</p>
                            <p><b>Time:</b> {selectedEvent.time}</p>
                            <p><b>Min Participants:</b> {selectedEvent.minParticipants}</p>
                            <p><b>Max Participants:</b> {selectedEvent.maxParticipants}</p>
                            <p><b>status Participants:</b> {selectedEvent.status}</p>
                            <p><b>Location:</b> {selectedEvent.location}</p>
                            <p><b>Participants:</b> {selectedEvent.participantCount}</p>
                            <p><b>Fee:</b> {selectedEvent.fee === 0 ? "Free" : `৳${selectedEvent.fee}`}</p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <UpdateEventModal
                open={open}
                onOpenChange={setOpen}
                defaultValues={editingEvent}
            />

        </div>
    );
}
