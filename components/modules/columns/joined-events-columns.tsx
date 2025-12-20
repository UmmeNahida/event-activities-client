// columns/joined-events-columns.tsx
import { Column } from "@/components/shared/ManagementTable";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { IJoinedEvent } from "@/types/passed-event.interface";

export const joinedEventsColumns: Column<IJoinedEvent>[] = [
  {
    header: "Event",
    accessor: (row) => (
      <div className="flex items-center gap-3">
        <Image
          src={row.event.image}
          alt={row.event.name}
          width={40}
          height={40}
          className="rounded-md object-cover"
        />
        <div>
          <p className="font-medium">{row.event.name}</p>
          <p className="text-xs text-muted-foreground">
            {row.event.location}
          </p>
        </div>
      </div>
    ),
  },
  {
    header: "Type",
    accessor: (row) => row.event.type,
    sortKey: "type",
  },
  {
    header: "Date",
    accessor: (row) =>
      new Date(row.event.date).toLocaleDateString(),
    sortKey: "date",
  },
  {
    header: "Fee",
    accessor: (row) => `৳${row.event.fee}`,
    sortKey: "fee",
  },
  {
    header: "Payment",
    accessor: (row) =>
      row.paid ? (
        <Badge className="bg-green-500">Paid</Badge>
      ) : (
        <Badge variant="destructive">Unpaid</Badge>
      ),
  },
  {
    header: "Joined At",
    accessor: (row) =>
      new Date(row.joinedAt).toLocaleDateString(),
    sortKey: "joinedAt",
  },
  {
    header: "Host",
    accessor: (row) => row.event.host.name,
  },
];
