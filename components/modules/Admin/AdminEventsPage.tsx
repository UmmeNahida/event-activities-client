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
import {
  EventStatus,
  IEventType,
} from "@/types/passed-event.interface";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { Calendar, MapPin, Users, DollarSign } from "lucide-react";

const AdminEventsPage = ({
  events,
  isLoading,
}: {
  events: IEventType[];
  isLoading?: boolean;
}) => {
  const [selectedEvent, setSelectedEvent] =
    useState<IEventType | null>(null);

  const columns: Column<IEventType>[] = [
    {
      header: "Event Name",
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-blue-50 dark:bg-blue-950">
            <Image
              src={row.image}
              alt={row.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-sm">{row.name}</p>
            <p className="text-xs text-muted-foreground">
              {row.type}
            </p>
          </div>
        </div>
      ),
      sortKey: "name",
    },
    {
      header: "Location",
      accessor: (row) => (
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-blue-500" />
          <span>{row.location}</span>
        </div>
      ),
    },
    {
      header: "Date & Time",
      accessor: (row) => (
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-blue-500" />
          <div>
            <p>{new Date(row.date).toLocaleDateString()}</p>
            <p className="text-xs text-muted-foreground">
              {row.time}
            </p>
          </div>
        </div>
      ),
      sortKey: "date",
    },
    {
      header: "Participants",
      accessor: (row) => (
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-blue-500" />
          <span>
            {row.participantCount}/{row.maxParticipants}
          </span>
        </div>
      ),
    },
    {
      header: "Price",
      accessor: (row) => (
        <Badge
          variant={row.fee === 0 ? "secondary" : "outline"}
          className={
            row.fee === 0
              ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
              : "border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400"
          }
        >
          <DollarSign className="h-3 w-3 mr-1" />
          {row.fee === 0 ? "Free" : `৳${row.fee}`}
        </Badge>
      ),
      sortKey: "fee",
    },
    {
      header: "Status",
      accessor: (row) => (
        <Badge
          className={`
          ${
            row.status === "OPEN"
              ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
              : row.status === "COMPLETED"
                ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
          }`}
        >
          {row.status}
        </Badge>
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
    status: EventStatus,
  ) => {
    const res = await updateEventStatus(id, status);
    if (!res?.success) {
      return toast.error(
        res?.message || "Event status has been failed",
      );
    }

    toast.success(res?.message);
  };

  const handleView = (event: IEventType) => {
    setSelectedEvent(event);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <TableSkeleton columns={6} rows={8} showActions={true} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
          Event Management
        </h2>
        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
          Manage and monitor all events
        </p>
      </div>

      <ManagementTable
        data={events}
        columns={columns}
        getRowKey={(row) => row.id}
        onView={(row) => handleView(row)}
        emptyMessage="No events found"
      />

      {/* View Modal */}
      <Dialog
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              Event Details
            </DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-blue-200 dark:border-blue-800">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Date & Time
                      </p>
                      <p className="font-medium">
                        {new Date(
                          selectedEvent.date,
                        ).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedEvent.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Location
                      </p>
                      <p className="font-medium">
                        {selectedEvent.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Participants
                      </p>
                      <p className="font-medium">
                        {selectedEvent.participantCount} /{" "}
                        {selectedEvent.maxParticipants}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Min: {selectedEvent.minParticipants}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <DollarSign className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Price
                      </p>
                      <p className="font-medium">
                        {selectedEvent.fee === 0
                          ? "Free"
                          : `৳${selectedEvent.fee}`}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Status
                    </p>
                    <Badge
                      className={`mt-1 ${
                        selectedEvent.status === "OPEN"
                          ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                          : selectedEvent.status === "COMPLETED"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
                            : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
                      }`}
                    >
                      {selectedEvent.status}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Type
                    </p>
                    <p className="font-medium">
                      {selectedEvent.type}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-2">
                  Description
                </p>
                <p className="text-sm leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEventsPage;
