/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import {
    CalendarIcon,
    Upload,
    X,
    Loader2,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createEventAction } from "@/services/host/createEvent";

const EVENT_CATEGORIES = [
    { value: "music", label: "Music" },
    { value: "sports", label: "Sports" },
    { value: "gaming", label: "Gaming" },
    { value: "art", label: "Art & Culture" },
    { value: "business", label: "Business" },
] as const;

const EVENT_STATUS = [
    { value: "OPEN", label: "Open" },
    { value: "CLOSED", label: "Closed" },
    { value: "CANCELLED", label: "Cancelled" },
] as const;

export default function CreateEventForm() {
    const router = useRouter();
    const [state, formAction, isPending] = useActionState(createEventAction, {
        success: false,
        message: "",
        errors: {},
    });

    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("OPEN");

    useEffect(() => {
        if (state && state.success) {
            toast.success(state?.message)
            setImagePreview(null)
            setTimeout(() => {
                router.push("/host/dashboard/my-event")
            }, 1000)
        }

        if (state && !state.success && state?.message.length > 0) {
            toast.error(state?.message)
            setImagePreview(null)
        }

    }, [state, router])

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);

    const handleImageChange = (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const preview = URL.createObjectURL(file);
        setImagePreview(preview);
    };

    const clearImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <form
            action={formAction}
            encType="multipart/form-data"
            className="space-y-6"
        >
            {/** -------- Hidden Data (JSON) -------- */}
            <input
                type="hidden"
                name="data"
                value={JSON.stringify({
                    eventDate: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
                    category,
                    status,
                })}
            />

            {/** -------- BASIC INFO -------- */}
            <div>
                <Label>Event Title *</Label>
                <Input name="title" required disabled={isPending} />
            </div>

            <div>
                <Label>Description *</Label>
                <Textarea name="description" rows={4} required disabled={isPending} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label>Category *</Label>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {EVENT_CATEGORIES.map((c) => (
                                <SelectItem key={c.value} value={c.value}>
                                    {c.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label>Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            {EVENT_STATUS.map((s) => (
                                <SelectItem key={s.value} value={s.value}>
                                    {s.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/** -------- SCHEDULE -------- */}
            <div>
                <Label>Event Date *</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full h-12 justify-start">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label>Start Time *</Label>
                    <Input type="time" name="startTime" required />
                </div>

                <div>
                    <Label>End Time *</Label>
                    <Input type="time" name="endTime" required />
                </div>
            </div>

            {/** -------- LOCATION -------- */}
            <div>
                <Label>Location *</Label>
                <Input name="location" required />
            </div>

            {/** -------- TICKET -------- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <Label>Ticket Price</Label>
                    <Input name="ticketPrice" type="number" defaultValue={0} />
                </div>

                <div>
                    <Label>Total Seats *</Label>
                    <Input name="totalSeats" type="number" defaultValue={100} required />
                </div>

                <div>
                    <Label>Available Seats</Label>
                    <Input name="availableSeats" type="number" defaultValue={100} />
                </div>
            </div>

            {/** -------- IMAGE UPLOAD -------- */}
            <div>
                <Label>Banner Image *</Label>

                <input
                    name="file"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />

                {imagePreview ? (
                    <div className="relative w-full max-w-lg">
                        <Image
                            src={imagePreview}
                            alt="Preview"
                            width={600}
                            height={400}
                            className="rounded-lg"
                        />

                        <Button
                            type="button"
                            onClick={clearImage}
                            className="mt-2"
                            variant="destructive"
                        >
                            <X className="w-4 h-4 mr-2" /> Remove
                        </Button>
                    </div>
                ) : (
                    <div
                        className="border-2 border-dashed p-10 rounded-xl text-center cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="mx-auto mb-3" />
                        <p>Click to upload image</p>
                    </div>
                )}
            </div>

            {/** -------- SUBMIT BUTTON -------- */}
            <Button type="submit" className="w-full h-12 text-lg" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="animate-spin mr-2" /> Creating...
                    </>
                ) : (
                    "Create Event"
                )}
            </Button>
        </form>
    );
}