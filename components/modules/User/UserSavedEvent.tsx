"use client";


import ManagementTable, { Column } from "@/components/shared/ManagementTable";
import { useRouter } from "next/navigation";
import { unsaveEventAction } from "@/services/savedEvents/savedEventActions";
import { toast } from "sonner";

export interface SavedEvent {
  id: string;
  eventId: string;
  createdAt: string;
  event: {
    name: string;
    date: string;
    location: string;
  };
}

interface SavedEventsTableProps {
  savedEvents: SavedEvent[];
  isLoading?: boolean;
}

export default function UserSavedEvent({
  savedEvents,
  isLoading = false,
}: SavedEventsTableProps) {
  const router = useRouter();

  // ---------------------------
  // Columns
  // ---------------------------
  const columns: Column<SavedEvent>[] = [
    {
      header: "Event Title",
      accessor: (row) => row.event?.name || "N/A",
      sortKey: "event.name",
    },
    {
      header: "Location",
      accessor: (row) => row.event?.location || "N/A",
      sortKey: "event.location",
    },
    {
      header: "Saved At",
      accessor: (row) =>
        new Date(row.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      sortKey: "createdAt",
    },
  ];

  // ---------------------------
  // Actions
  // ---------------------------
  const handleView = (row: SavedEvent) => {
    router.push(`/events/${row.eventId}`);
  };

  const handleUnsave = async (row: SavedEvent) => {
    const res = await unsaveEventAction(row.eventId);
    console.log("res",res)
    if (res!.success) {
      toast.success(res.message || "Event has been unsave")
      router.refresh();
    }
  };

  return (
    <ManagementTable<SavedEvent>
      data={savedEvents}
      columns={columns}
      getRowKey={(row) => row.id}
      isRefreshing={isLoading}
      emptyMessage="No saved events found."
      onView={handleView}
      onDelete={handleUnsave} 
    />
  );
}
