import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
// import { adminGetHosts } from "@/services/event/allEvents";
import { useEffect, useState } from "react";
import { adminGetHosts } from "@/services/event/allEvents";

type Host = {
  id: string;
  name: string;
  email: string;
  location: string;
  userStatus: "ACTIVE" | "INACTIVE" | "BLOCKED";
};

export default function AdminHostsPage() {
  const [hosts, setHosts] = useState<Host[]>([]);

  useEffect(() => {
    adminGetHosts({}).then(setHosts);
  }, []);

  const columns: ColumnDef<Host>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "location", header: "Location" },
    {
      accessorKey: "userStatus",
      header: "Host Status",
      cell: ({ row }) => (
        <span className="font-medium">
          {row.getValue("userStatus")}
        </span>
      ),
    },
  ];

  return (
    <DataTable<Host, unknown>
      columns={columns}
      data={hosts}
    />
  );
}
