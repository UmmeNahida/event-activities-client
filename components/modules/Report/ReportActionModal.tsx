// components/reports/ReportActionModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, UserX, Trash2 } from "lucide-react";
import { Report, ReportAction } from "@/types/report.interface";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: ReportAction | null;
  report: Report | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function ReportActionModal({
  open,
  onOpenChange,
  action,
  report,
  onConfirm,
  isLoading = false,
}: Props) {
  if (!action || !report) return null;

  const isSuspend = action === "SUSPEND_USER";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[95vw]">
        <DialogHeader className="space-y-3">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
              {isSuspend ? (
                <UserX className="h-6 w-6 text-destructive" />
              ) : (
                <Trash2 className="h-6 w-6 text-destructive" />
              )}
            </div>
          </div>

          <DialogTitle className="text-center text-xl">
            {isSuspend ? "Suspend User" : "Remove Event"}
          </DialogTitle>
        </DialogHeader>

        {/* Warning Text */}
        <div className="space-y-3 text-sm text-muted-foreground text-center">
          <p className="flex items-center justify-center gap-2 text-destructive font-medium">
            <AlertTriangle className="h-4 w-4" />
            This action is irreversible
          </p>

          {isSuspend ? (
            <>
              <p>
                You are about to suspend{" "}
                <span className="font-medium text-foreground">
                  {report.targetUser.name}
                </span>
                .
              </p>
              <p>
                The user will lose access to hosting and platform
                activities until reactivated by an administrator.
              </p>
            </>
          ) : (
            <>
              <p>
                You are about to remove the event{" "}
                <span className="font-medium text-foreground">
                  {report.targetEvent.name}
                </span>
                .
              </p>
              <p>
                This event will be permanently deleted and all
                associated data may be lost.
              </p>
            </>
          )}

          <p className="pt-2 font-medium text-foreground">
            Are you sure you want to proceed?
          </p>
        </div>

        <DialogFooter className="gap-2 pr-5 sm:gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading
              ? "Processing..."
              : isSuspend
              ? "Suspend User"
              : "Remove Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
