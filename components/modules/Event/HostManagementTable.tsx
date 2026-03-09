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
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { MapPin, Shield, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HostManagementTable({
  userData,
  isLoading,
}: any) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] =
    useState<IUserInfo>(defaultUserInfo);

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
      sortKey: "name",
    },
    {
      header: "Location",
      accessor: (row) => (
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-blue-500" />
          <span>{row.location}</span>
        </div>
      ),
      sortKey: "location",
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
        `}
        >
          {row.userStatus}
        </Badge>
      ),
      sortKey: "userStatus",
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
      res.message || "User has been deleted successfully",
    );
  };

  const openDeleteConfirmModal = (id: string) => {
    setSelectedUserId(id);
    setOpenDeleteModal(true);
  };

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
        <TableSkeleton columns={4} rows={10} showActions={true} />
      </div>
    );
  }

  return (
    <div className="p-5 space-y-4">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
          Host Management
        </h2>
        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
          Manage and monitor all hosts
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-start gap-5">
        <SearchFilter
          placeholder="Search hosts..."
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

        <ClearFiltersButton />
      </div>

      <ManagementTable
        data={userData.data.users}
        columns={columns}
        getRowKey={(row: IUserInfo) => row.id}
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
