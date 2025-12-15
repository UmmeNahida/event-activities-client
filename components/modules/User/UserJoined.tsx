"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import Pagination from "../Event/pagination";

const joinedEvents = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  title: `Event ${i + 1}`,
  host: "John Doe",
  date: "2025-01-20",
  location: "Dhaka",
  status: i % 2 === 0 ? "Confirmed" : "Pending",
}));

// ---------------- Main Table ----------------
export default function UserJoinedEventsTable() {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(joinedEvents.length / pageSize);
  const data = joinedEvents.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Joined Events</h2>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Host</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.host}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {event.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination page={page} totalPages={10} onPageChange={setPage} />
      </CardContent>
    </Card>
  );
}