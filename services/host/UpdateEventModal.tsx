"use client";

import { useTransition, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { updateMyEvents } from "./hostApiService";
import { toast } from "sonner";

interface UpdateEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues: {
    id: string;
    name?: string;
    description?: string;
    location?: string;
    date?: string;
    time?:string
  };
}

export default function UpdateEventModal({
  open,
  onOpenChange,
  defaultValues,
}: UpdateEventModalProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (formData: FormData) => {
    setError(null);

    startTransition(async () => {
      const result = await updateMyEvents(defaultValues?.id,formData);
      
      console.log("result:", result)
      if(result.success){
        toast.success(result.message || "your events updated successfully")
      }
      if (!result?.success) {
        setError(result?.message || "Update failed");
        return;
      }

      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          {/* Hidden event id */}
          {/* {defaultValues?.id && (
            <input type="hidden" name="id" value={defaultValues.id} />
          )} */}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="name"
              defaultValue={defaultValues?.name}
              placeholder="Event title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={defaultValues?.description}
              placeholder="Event description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              defaultValue={defaultValues?.location}
              placeholder="Event location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={defaultValues?.date}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Time</Label>
            <Input
              id="time"
              name="time"
              type="time"
              defaultValue={defaultValues?.time}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Event Image</Label>
            <Input id="file" name="file" type="file" accept="image/*" />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
