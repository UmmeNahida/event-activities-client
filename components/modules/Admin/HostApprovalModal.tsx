import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface HostApprovalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: () => void;
  onReject: () => void;
}

export default function HostApprovalModal({
  open,
  onOpenChange,
  onApprove,
  onReject,
}: HostApprovalModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Review Host Access Request
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2">
            Use this modal to review a user's request to become a host. Please
            carefully review the request before taking action.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Approve:</strong> The user will be granted host access and will
            be able to create, manage, and publish events.
          </p>
          <p>
            <strong>Reject:</strong> The request will be declined and the user will
            not receive host access.
          </p>
          <p className="text-xs mt-2">
            This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={onReject}
          >
            <XCircle className="w-4 h-4" /> Reject Request
          </Button>
          <Button
            className="flex items-center gap-2"
            onClick={onApprove}
          >
            <CheckCircle className="w-4 h-4" /> Approve Request
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
