/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import ManagementTable, {
  Column,
} from "@/components/shared/ManagementTable";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/selectFilter";
import HostApprovalModal from "../Admin/HostApprovalModal";
import {
  approveHostRequest,
  deleteUser,
  rejectHostRequest,
} from "@/services/event/allEvents";
import { toast } from "sonner";
import { IUserInfo } from "@/types/user.interface";
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
import { Trash } from "lucide-react";
import Pagination from "./pagination";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";

export default function UserManagementTable({ userData }: any) {
  const [openHostModal, setOpenHostModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");


  /* =========================
        Handlers
  ========================== */

  const openHostRequestModal = (id: string) => {
    setSelectedUserId(id);
    setOpenHostModal(true);
  };

  const openDeleteConfirmModal = (id: string) => {
    setSelectedUserId(id);
    setOpenDeleteModal(true);
  };

  const handleApprove = async () => {
    const res = await approveHostRequest(selectedUserId);
    if (!res.success) {
      toast.error(res.message || "Approve failed");
      return;
    }
    toast.success("User approved as host");
    setOpenHostModal(false);
  };

  const handleReject = async () => {
    const res = await rejectHostRequest(selectedUserId);
    if (!res.success) {
      toast.error(res.message || "Reject failed");
      return;
    }
    toast.success("Host request rejected");
    setOpenHostModal(false);
  };

  const handleDelete = async () => {
    const res = await deleteUser(selectedUserId);
    if (!res.success) {
      toast.error(res.message || "Delete failed");
      return;
    }
    toast.success("User deleted successfully");
    setOpenDeleteModal(false);
  };

  /* =========================
        Table Columns
  ========================== */

  const columns: Column<IUserInfo>[] = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Location",
      accessor: "location",
    },
    {
      header: "Status",
      accessor: "userStatus",
    },
    {
      header: "Role",
      accessor: "role",
    },
    {
      header: "Host Request",
      accessor: (row) =>
        row.userStatus === "REQUESTED" ? (
          <button
            onClick={() => openHostRequestModal(row.id)}
            className="text-blue-600 text-sm underline cursor-pointer"
          >
            Pending Host Request
          </button>
        ) : (
          <span className="text-gray-400 text-sm">
            No host request
          </span>
        ),
    },
    {
      header: "Action",
      accessor: (row) => (
        <button
          onClick={() => openDeleteConfirmModal(row.id)}
          className="text-red-600 text-sm underline flex items-center cursor-pointer"
        >
          <Trash className="h-4 w-4" />
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="p-5">
      {/* Filters */}
      <div className="flex gap-5 mb-8">
        <SearchFilter
          placeholder="Search users..."
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
            { label: "Requested", value: "REQUESTED" },
          ]}
        />

        <SelectFilter
          paramName="location"
          placeholder="Location"
          options={[
            { label: "Dhaka", value: "dhaka" },
            { label: "Chittagong", value: "chittagong" },
            { label: "Sylhet", value: "sylhet" },
          ]}
        />

        <ClearFiltersButton/>
      </div>

      {/* Table */}
      <ManagementTable<IUserInfo>
        data={userData.data.users}
        columns={columns}
        getRowKey={(row) => row.id}
      />

      {/* Host Approval Modal */}
      <HostApprovalModal
        open={openHostModal}
        onOpenChange={setOpenHostModal}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <Pagination meta={userData.data.meta} />

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
