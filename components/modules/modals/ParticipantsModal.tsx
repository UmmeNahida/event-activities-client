/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { myParticipantUsers } from "@/services/event/allEvents";
import Link from "next/link";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  eventId: string;
}

export default function ParticipantsModal({
  open,
  onClose,
  eventId,
}: Props) {
  const [participants, setParticipants] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  useEffect(() => {
    if (!open) return;

    const fetchParticipants = async () => {
      const result = await myParticipantUsers(eventId, page, limit);
    console.log("myUsers", result)
    if(!result.success){
       toast.error(result.message || "something is wrong")
    }

      setParticipants(result?.data);
      setTotal(result?.meta?.total);
    };

    fetchParticipants();
  }, [open, page, eventId]);

  const totalPages = Math.ceil(total / limit);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Participants ({total})</DialogTitle>
        </DialogHeader>

        {/* List */}
        <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
          {participants?.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between border-b pb-3"
            >
              <Link href={`/view-profile/${p.user.id}`}>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={p.user.image} />
                    <AvatarFallback>
                      {p.user.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-medium">{p.user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {p.user.location}
                    </p>
                  </div>
                </div>
              </Link>

              <Badge variant={p.paid ? "default" : "secondary"}>
                {p.paid ? "Paid" : "Unpaid"}
              </Badge>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
