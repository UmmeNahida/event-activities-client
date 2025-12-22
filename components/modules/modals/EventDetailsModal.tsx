import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { IEventType } from "@/types/passed-event.interface";
import { dateFormatter } from "@/components/shared/DateFormatter";

interface EventDetailsModalProps {
  open: boolean;
  onClose: () => void;
  event: IEventType;
}

export function EventDetailsModal({
  open,
  onClose,
  event,
}: EventDetailsModalProps) {
  if (!event) return null;

  const { formattedDate, formattedTime } = dateFormatter(event.date);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {event.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Image
            src={event.image}
            alt={event.name}
            width="500"
            height="500"
            className="w-full h-48 object-cover rounded-xl"
          />

          <Badge>{event.type}</Badge>

          <p className="text-sm text-muted-foreground">
            📅 {formattedDate} <br />
            ⏰ {formattedTime}
          </p>

          <p className="text-sm">📍 {event.location}</p>

          <p className="text-sm leading-relaxed">
            {event.description}
          </p>

          <div className="flex justify-between text-sm pt-2">
            <span>👥 Participants: {event.participantCount}</span>
            <span>💰 Fee: {event.fee === 0 ? "Free" : `$${event.fee}`}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
