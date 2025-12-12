"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ManagementTable from "@/components/shared/ManagementTable";
import SelectFilter from "@/components/shared/selectFilter";
import SearchFilter from "@/components/shared/SearchFilter";

export default function HostManagementTable({ userData }: any) {
    console.log("kire kotha kos na kn",userData)
  const searchParams = useSearchParams();

  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);

    setUsers(userData.data.users || []);
    setMeta(userData.data.meta || {});
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [searchParams]);

  const columns = [
    { header: "Name", accessor: "name", sortKey: "name" },
    { header: "Email", accessor: "email", sortKey: "email" },
    { header: "Location", accessor: "location", sortKey: "location" },
    { header: "Status", accessor: "userStatus", sortKey: "userStatus" },
    { header: "Role", accessor: "role" },
  ];


  const handleEdit = (row: any) => {
    console.log("handleEdit", row)
  }

  const handleView = (row: any) => {
    console.log("handle view", row)
  }

  const handleDelete = (row: any) => {
    console.log("handle view", row)
  }

  return (
    <div className="p-5">

      {/* Filters */}
      <div className="flex items-center justify-start gap-5 mb-8">
        <SearchFilter placeholder="Search events..." paramName="searchTerm" />

        <SelectFilter
          paramName="userStatus"
          placeholder="User Status"
          options={[
            { label: "Active", value: "ACTIVE" },
            { label: "Inactive", value: "INACTIVE" },
            { label: "Blocked", value: "BLOCKED" },
            { label: "Suspended", value: "SUSPENDED" }
          ]}
        />

        <SelectFilter
          paramName="location"
          placeholder="Location"
          options={[
            { label: "Dhaka", value: "dhaka" },
            { label: "Chittagong", value: "chittagong" },
            { label: "Sylhet", value: "sylhet" },
            { label: "Bandarban", value: "Bandarban" },
          ]}
        />
      </div>


      <ManagementTable
        data={users}
        columns={columns}
        getRowKey={(row) => row?.id}
        isRefreshing={loading}
        onView={(row) => handleView}
        onEdit={(row) => handleEdit(row)}
        onDelete={(row) => handleDelete(row)}
      />
    </div>
  );
}
