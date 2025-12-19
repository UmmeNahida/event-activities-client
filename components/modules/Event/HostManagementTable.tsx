"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ManagementTable, { Column } from "@/components/shared/ManagementTable";
import SelectFilter from "@/components/shared/selectFilter";
import SearchFilter from "@/components/shared/SearchFilter";
import { IUserInfo } from "@/types/user.interface";
import { deleteUser } from "@/services/event/allEvents";
import { toast } from "sonner";
import UserInfoModal from "@/components/shared/UserInfoModel";
import { defaultUserInfo } from "@/components/ui/defaultUserInfo";
export const dynamic = "force-dynamic";


export default function HostManagementTable({ userData }: any) {
  const searchParams = useSearchParams();

  const [users, setUsers] = useState<IUserInfo[]>([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>(defaultUserInfo)



  const fetchUsers = async () => {
    setLoading(true);

    setUsers(userData.data.users || []);
    setMeta(userData.data.meta || {});
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [searchParams]);

  const columns:Column<IUserInfo>[] = [
    { header: "Name", accessor: "name", sortKey: "name" },
    { header: "Email", accessor: "email", sortKey: "email" },
    { header: "Location", accessor: "location", sortKey: "location" },
    { header: "Status", accessor: "userStatus", sortKey: "userStatus" },
    { header: "Role", accessor: "role" },
  ];

  const handleView = async(row: IUserInfo) => {
    setUserInfo(row)
    setOpen(true) 
  }

  const handleDelete = async(row: IUserInfo) => {
    const res = await deleteUser(row.id)
    if (!res.success) {
      toast.error(res.message || "Delete Request is failed")
    }
    toast.success(res.message || "User has been deleted successfully")
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
        getRowKey={(row: IUserInfo) => row.id}
        isRefreshing={loading}
        onView={(row) => handleView(row)}
        onDelete={(row) => handleDelete(row)}
      />

      <UserInfoModal open={open} onOpenChange={setOpen} user={userInfo} />
    </div>
  );
}
