import ManagementTable, {
  Column,
} from "@/components/shared/ManagementTable";
import StatusSelect from "@/components/shared/StatusSelected";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateEventStatus } from "@/services/event/allEvents";
import { HostEvent } from "@/services/host/EventHostTable";
import {
  EventStatus,
  IEventType,
} from "@/types/passed-event.interface";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const AdminEventsPage = ({ events }: { events: IEventType[] }) => {
  const [open,setOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] =
    useState<IEventType | null>(null);

  const columns: Column<IEventType>[] = [
    {
      header: "Event Name",
      accessor: "name",
      sortKey: "name",
    },
    {
      header: "Type",
      accessor: "type",
      sortKey: "type",
    },
    {
      header: "Location",
      accessor: "location",
    },
    {
      header: "Date",
      accessor: (row) => new Date(row.date).toLocaleDateString(),
      sortKey: "date",
    },
    {
      header: "Event Price",
      accessor: (row) => (
        <Badge variant={row.fee === 0 ? "secondary" : "outline"}>
          {row.fee === 0 ? "Free" : `৳${row.fee}`}
        </Badge>
      ),
      sortKey: "fee",
    },
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium
          ${
            row.status === "OPEN"
              ? "bg-green-100 text-green-700"
              : row.status === "COMPLETED"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Update Status",
      accessor: (row) => (
        <StatusSelect
          value={row.status}
          onChange={(status) => handleUpdateStatus(row.id, status)}
        />
      ),
    },
  ];

  const handleUpdateStatus = async (
    id: string,
    status: EventStatus
  ) => {
    const res = await updateEventStatus(id, status);
    if (!res?.success) {
      return toast.error(
        res?.message || "Event status has been failed"
      );
    }

    toast.success(res?.message);
  };

  const handleView = (event: IEventType) => {
    setOpen(true);
    setSelectedEvent(event);
  };

  return (
    <div>
      <ManagementTable
        data={events}
        columns={columns}
        getRowKey={(row) => row.id}
        // onDelete={handleView}
        onView={(row) => handleView(row)}
        emptyMessage="No events found"
      />

      {/* view modal */}
      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-2 text-sm">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.name}
                width="500"
                height="500"
                className="w-full h-40 object-cover rounded-lg"
              />
              <p>Description: {selectedEvent.description} </p>
              <p>
                <b>Name:</b> {selectedEvent.name}
              </p>
              <p>
                <b>Date:</b>{" "}
                {new Date(selectedEvent.date).toLocaleDateString()}
              </p>
              <p>
                <b>Time:</b> {selectedEvent.time}
              </p>
              <p>
                <b>Min Participants:</b>{" "}
                {selectedEvent.minParticipants}
              </p>
              <p>
                <b>Max Participants:</b>{" "}
                {selectedEvent.maxParticipants}
              </p>
              <p>
                <b>status Participants:</b> {selectedEvent.status}
              </p>
              <p>
                <b>Location:</b> {selectedEvent.location}
              </p>
              <p>
                <b>Participants:</b> {selectedEvent.participantCount}
              </p>
              <p>
                <b>Fee:</b>{" "}
                {selectedEvent.fee === 0
                  ? "Free"
                  : `৳${selectedEvent.fee}`}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEventsPage;
