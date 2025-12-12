"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);
  const [viewData, setViewData] = useState<any>(null);

  // Fetch all reports
  const loadReports = async () => {
    const res = await fetch("http://localhost:5000/api/admin/reports");
    const data = await res.json();
    setReports(data);
  };

  useEffect(() => {
    loadReports();
  }, []);

  // Handle admin action (PATCH)
  const handleAction = async (action: string, id: string) => {
    await fetch(`http://localhost:5000/api/admin/reports/action/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    loadReports();
    alert(`Action executed: ${action}`);
  };

  // Table columns
  const columns: ColumnDef<any>[] = [
    {
      header: "Reporter",
      accessorKey: "reporter.email",
    },
    {
      header: "Target User",
      accessorKey: "targetUser.email",
      cell: ({ row }) =>
        row.original.targetUser?.email || (
          <span className="text-gray-400">N/A</span>
        ),
    },
    {
      header: "Target Event",
      accessorKey: "targetEvent.title",
      cell: ({ row }) =>
        row.original.targetEvent?.title || (
          <span className="text-gray-400">N/A</span>
        ),
    },
    {
      header: "Reason",
      accessorKey: "reason",
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-white text-xs ${
            row.original.status === "PENDING"
              ? "bg-yellow-600"
              : row.original.status === "ACTION_TAKEN"
              ? "bg-blue-600"
              : "bg-green-600"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },

    // ⭐ Action Column
    {
      header: "Actions",
      cell: ({ row }) => {
        const report = row.original;

        return (
          <div className="flex items-center gap-2">
            {/* VIEW MODAL */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewData(report)}
                >
                  View
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Report Details</DialogTitle>
                </DialogHeader>

                {viewData && (
                  <div className="space-y-3 text-sm">
                    <p>
                      <strong>Reporter:</strong> {report.reporter.email}
                    </p>
                    <p>
                      <strong>Target User:</strong>{" "}
                      {report.targetUser?.email ?? "N/A"}
                    </p>
                    <p>
                      <strong>Target Event:</strong>{" "}
                      {report.targetEvent?.title ?? "N/A"}
                    </p>
                    <p>
                      <strong>Reason:</strong> {report.reason}
                    </p>
                    <p>
                      <strong>Description:</strong> {report.description}
                    </p>
                    <p>
                      <strong>Status:</strong> {report.status}
                    </p>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* TAKE ACTION DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => handleAction("SUSPEND_USER", report.id)}
                >
                  Suspend User
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleAction("REMOVE_EVENT", report.id)}
                >
                  Remove Event
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleAction("WARN_HOST", report.id)}
                >
                  Warn Host
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 font-semibold">Admin Reports</h1>

      <DataTable columns={columns} data={reports} />
    </div>
  );
}
