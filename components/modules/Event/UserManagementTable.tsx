"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ManagementTable, { Column } from "@/components/shared/ManagementTable";
import SelectFilter from "@/components/shared/selectFilter";
import SearchFilter from "@/components/shared/SearchFilter";
import HostApprovalModal from "../Admin/HostApprovalModal";
import { approveHostRequest, deleteUser, rejectHostRequest } from "@/services/event/allEvents";
import { toast } from "sonner";
import { IUserInfo } from "@/types/user.interface";

export default function UserManagementTable({ userData }: any) {
  const searchParams = useSearchParams();

  const [users, setUsers] = useState<IUserInfo[]>([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("")

  const fetchUsers = async () => {
    setLoading(true);

    setUsers(userData.data.users || []);
    setMeta(userData.meta || {});
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [searchParams]);

  // const columns = [
  //   { header: "Name", accessor: "name", sortKey: "name" },
  //   { header: "Email", accessor: "email", sortKey: "email" },
  //   { header: "Location", accessor: "location", sortKey: "location" },
  //   { header: "Status", accessor: "userStatus", sortKey: "userStatus" },
  //   { header: "Role", accessor: "role" },
  // ];


  const columns: Column<IUserInfo>[] = [
    {
      header: "Name",
      accessor: "name",
      sortKey: "name",
    },
    {
      header: "Email",
      accessor: "email",
      sortKey: "email",
    },
    {
      header: "Location",
      accessor: "location",
      sortKey: "location",
    },
    {
      header: "Status",
      accessor: "userStatus",
      sortKey: "userStatus",
    },
    {
      header: "Role",
      accessor: "role",
    },
  ];



  const handleEdit = (row: IUserInfo) => {
    setOpen(true)
    setUserId(row.id)
  }


  const handleDelete = async(row: IUserInfo) => {
    const res = await deleteUser(row.id)
    if (!res.success) {
      toast.error(res.message || "Delete Request is failed")
    }
    toast.success(res.message || "User has been deleted successfully")
  }


  const handleOnApprove = async () => {
    const res = await approveHostRequest(userId)
    if (!res.success) {
      toast.error(res.message || "Request is failed")
    }
    toast.success(res.message || "User has been be a host successfully")
    setOpen(false)
  }

  const handleOnReject = async () => {
    const res = await rejectHostRequest(userId)
    if (!res.success) {
      toast.error(res.message || "Reject Request is failed")
    }
    toast.success(res.message || "User Request has been Rejected successfully")
    setOpen(false)
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


      <ManagementTable<IUserInfo>
        data={users}
        columns={columns}
        getRowKey={(row: IUserInfo) => row.id}
        isRefreshing={loading}
        onEdit={(row) => handleEdit(row)}
        onDelete={(row) => handleDelete(row)}
      />

      <HostApprovalModal
        open={open}
        onOpenChange={setOpen}
        onApprove={handleOnApprove}
        onReject={handleOnReject}
      />
    </div>
  );
}
