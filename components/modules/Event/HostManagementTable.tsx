/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import ManagementTable, {
  Column,
} from "@/components/shared/ManagementTable";
import SelectFilter from "@/components/shared/selectFilter";
import SearchFilter from "@/components/shared/SearchFilter";
import { IUserInfo } from "@/types/user.interface";
import { deleteUser } from "@/services/event/allEvents";
import { toast } from "sonner";
import UserInfoModal from "@/components/shared/UserInfoModel";
import { defaultUserInfo } from "@/components/ui/defaultUserInfo";
export const dynamic = "force-dynamic";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Pagination from "./pagination";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";

export default function HostManagementTable({ userData }: any) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] =
    useState<IUserInfo>(defaultUserInfo);

  const columns: Column<IUserInfo>[] = [
    { header: "Name", accessor: "name", sortKey: "name" },
    { header: "Email", accessor: "email", sortKey: "email" },
    { header: "Location", accessor: "location", sortKey: "location" },
    {
      header: "Status",
      accessor: "userStatus",
      sortKey: "userStatus",
    },
    { header: "Role", accessor: "role" },
  ];

  const handleView = async (row: IUserInfo) => {
    setUserInfo(row);
    setOpen(true);
  };

  const handleDelete = async () => {
    const res = await deleteUser(selectedUserId);
    if (!res.success) {
      return toast.error(res.message || "Delete Request is failed");
    }
    toast.success(
      res.message || "User has been deleted successfully"
    );
  };

  const openDeleteConfirmModal = (id: string) => {
    setSelectedUserId(id);
    setOpenDeleteModal(true);
  };

  return (
    <div className="p-5">
      {/* Filters */}
      <div className="flex items-center justify-start gap-5 mb-8">
        <SearchFilter
          placeholder="Search events..."
          paramName="searchTerm"
        />

        <SelectFilter
          paramName="userStatus"
          placeholder="User Status"
          options={[
            { label: "Active", value: "ACTIVE" },
            { label: "Inactive", value: "INACTIVE" },
            { label: "Blocked", value: "BLOCKED" },
            { label: "Suspended", value: "SUSPENDED" },
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

        <ClearFiltersButton/>
      </div>

      <ManagementTable
        data={userData.data.users}
        columns={columns}
        getRowKey={(row: IUserInfo) => row.id}
        isRefreshing={loading}
        onView={(row) => handleView(row)}
        onDelete={(row) => openDeleteConfirmModal(row.id)}
      />

      <Pagination meta={userData.data.meta} />

      <UserInfoModal
        open={open}
        onOpenChange={setOpen}
        user={userInfo}
      />

      {/* Delete Confirmation Modal */}
      <AlertDialog
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This user will be
              permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
