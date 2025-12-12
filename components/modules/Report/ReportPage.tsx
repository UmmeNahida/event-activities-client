"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch("/api/admin/reports")
      .then((res) => res.json())
      .then((data) => setReports(data));
  }, []);

  const handleAction = async (type: string, id: string) => {
    await fetch(`/api/admin/reports/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: type }),
    });
    alert(`Action performed: ${type}`);
  };

  const columns: ColumnDef<any>[] = [
    {
      header: "Reporter",
      accessorKey: "reporter.email",
    },
    {
      header: "Target User",
      accessorKey: "targetUser.email",
      cell: ({ row }) =>
        row.original.targetUser?.email || <span className="text-gray-400">N/A</span>,
    },
    {
      header: "Target Event",
      accessorKey: "targetEvent.title",
      cell: ({ row }) =>
        row.original.targetEvent?.title || <span className="text-gray-400">N/A</span>,
    },
    {
      header: "Reason",
      accessorKey: "reason",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-white text-sm ${
            row.original.status === "PENDING" ? "bg-yellow-600" :
            row.original.status === "REJECTED" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleAction("REJECT_USER", row.original.id)}>
              Reject User
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("REJECT_EVENT", row.original.id)}>
              Reject Event
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleAction("RESOLVED", row.original.id)}>
              Mark as Resolved
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Reports</h1>
      <DataTable columns={columns} data={reports} />
    </div>
  );
}
