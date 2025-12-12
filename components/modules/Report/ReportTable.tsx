"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { getSingleReport, reportAction } from "@/services/report/report";


export default function ReportsTable({ reports }: { reports: any }) {
  const [viewData, setViewData] = useState<any>(null);
  const [open, setOpen] = useState(false);

  // VIEW handler → calls server action
  const handleView = async (id: string) => {
    const data = await getSingleReport(id);  // SERVER ACTION CALL
    setViewData(data);
    setOpen(true);
  };

  // ACTION handler → calls server action
  const handleAction = async (action: string, id: string) => {
    await reportAction(id, action); // SERVER ACTION CALL
    alert(`Action taken: ${action}`);
    // optional: refresh UI using router.refresh()
  };

  console.log("ReportTable data",reports)
  const columns: ColumnDef<any>[] = [
    {
      header: "Reporter",
      accessorKey: "reporter.email",
    },
    {
      header: "Target User",
      cell: ({ row }) =>
        row.original.targetUser?.email || <span className="text-gray-400">N/A</span>,
    },
    {
      header: "Target Event",
      cell: ({ row }) =>
        row.original.targetEvent?.title || <span className="text-gray-400">N/A</span>,
    },
    {
      header: "Reason",
      accessorKey: "reason",
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original.id;

        return (
          <div className="flex items-center gap-2">
            {/* VIEW BUTTON */}
            <Button variant="outline" size="sm" onClick={() => handleView(id)}>
              View
            </Button>

            {/* ACTION DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleAction("SUSPEND_USER", id)}>
                  Suspend User
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("REMOVE_EVENT", id)}>
                  Remove Event
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("WARN_HOST", id)}>
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
    <>
      <DataTable columns={columns} data={reports} />

      {/* VIEW MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>

          {viewData ? (
            <div className="space-y-2 text-sm">
              <p><b>Reporter:</b> {viewData.reporter?.email}</p>
              <p><b>Target User:</b> {viewData.targetUser?.email ?? "N/A"}</p>
              <p><b>Target Event:</b> {viewData.targetEvent?.title ?? "N/A"}</p>
              <p><b>Reason:</b> {viewData.reason}</p>
              <p><b>Description:</b> {viewData.description}</p>
              <p><b>Status:</b> {viewData.status}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
