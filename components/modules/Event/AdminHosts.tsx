import DataTable from "@/components/admin/DataTable";
import { adminGetHosts } from "@/actions/admin";

export default function AdminHostsPage() {

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "location", label: "Location" },
    { key: "userStatus", label: "Host Status" },
  ];

  return (
    <DataTable
      fetchAction={adminGetHosts}
      columns={columns}
      title="Host Management"
    />
  );
}
