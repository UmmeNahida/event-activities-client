import ManagementTable, { Column } from "@/components/shared/ManagementTable";
import StatusSelect from "@/components/shared/StatusSelected";
import {
  EventStatus,
  IEventType,
} from "@/types/passed-event.interface";

const AdminEventsPage = ({ events }: { events: IEventType[] }) => {
  console.log("getAllEvent:", events)

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
      header: "Participants",
      accessor: "participantCount",
      sortKey: "participantCount",
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

  const handleUpdateStatus = (id: string, status: EventStatus) => {
    console.log("Update Status:", id, status);
    // 🔥 API call here
    // PATCH /admin/events/:id { status }
  };

  const handleDelete = (event: IEventType) => {
    if (!confirm("Are you sure you want to delete this event?"))
      return;
    console.log("Delete Event:", event.id);
    // 🔥 DELETE API call
  };

  return (
    <ManagementTable
      data={events}
      columns={columns}
      getRowKey={(row) => row.id}
      onDelete={handleDelete}
      emptyMessage="No events found"
    />
  );
};

export default AdminEventsPage;
