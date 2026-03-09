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
import {
  Trash,
  MapPin,
  Shield,
  User,
  CheckCircle,
  Clock,
} from "lucide-react";
import Pagination from "./pagination";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { Badge } from "@/components/ui/badge";

export default function UserManagementTable({
  userData,
  isLoading,
}: any) {
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
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="font-medium text-sm">{row.name}</p>
            <p className="text-xs text-muted-foreground">
              {row.email}
            </p>
          </div>
        </div>
      ),
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
      header: "Status",
      accessor: (row) => (
        <Badge
          className={`
          ${row.userStatus === "ACTIVE" ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" : ""}
          ${row.userStatus === "INACTIVE" ? "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-400" : ""}
          ${row.userStatus === "BLOCKED" ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" : ""}
          ${row.userStatus === "SUSPENDED" ? "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400" : ""}
          ${row.userStatus === "REQUESTED" ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400" : ""}
        `}
        >
          {row.userStatus}
        </Badge>
      ),
    },
    {
      header: "Role",
      accessor: (row) => (
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-blue-500" />
          <Badge
            variant="outline"
            className="border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-400"
          >
            {row.role}
          </Badge>
        </div>
      ),
    },
    {
      header: "Host Request",
      accessor: (row) =>
        row.userStatus === "REQUESTED" ? (
          <button
            onClick={() => openHostRequestModal(row.id)}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm hover:underline cursor-pointer"
          >
            <Clock className="h-4 w-4" />
            <span>Pending Request</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <CheckCircle className="h-4 w-4" />
            <span>No request</span>
          </div>
        ),
    },
    {
      header: "Action",
      accessor: (row) => (
        <button
          onClick={() => openDeleteConfirmModal(row.id)}
          className="text-red-600 dark:text-red-400 text-sm flex items-center gap-1 hover:underline cursor-pointer"
        >
          <Trash className="h-4 w-4" />
          Delete
        </button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="p-5 space-y-4">
        <div className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="h-8 w-48 bg-blue-200 dark:bg-blue-900 rounded animate-pulse" />
          <div className="h-4 w-64 bg-blue-100 dark:bg-blue-950 rounded animate-pulse mt-2" />
        </div>
        <div className="flex gap-5">
          <div className="h-10 w-64 bg-muted rounded animate-pulse" />
          <div className="h-10 w-40 bg-muted rounded animate-pulse" />
          <div className="h-10 w-40 bg-muted rounded animate-pulse" />
        </div>
        <TableSkeleton columns={5} rows={10} showActions={true} />
      </div>
    );
  }

  return (
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
          User Management
        </h2>
        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
          Manage users and host requests
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-5">
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

        <ClearFiltersButton />
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
