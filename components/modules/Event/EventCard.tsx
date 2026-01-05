"use client";

import Image from "next/image";
import { Calendar, MapPin, Tag, ArrowRight } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import Link from "next/link";
// import { joinedEvent } from "@/services/participants/participants-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { joinedEvent } from "@/services/participants/participants-service";
import { IEventType } from "@/types/passed-event.interface";
import { dateFormatter } from "@/components/shared/DateFormatter";




interface EventCardProps {
    event: IEventType;
}

export default function EventCard({ event }: EventCardProps) {
    const router = useRouter()

    const handleJoinedEvent = async (id: string) => {
        const res = await joinedEvent(id);

        if (!res?.success) {
            toast.error(res?.message || "Failed to join");
            return;
        }

        toast.success(res.message);

        // Paid event → Stripe
        if (res.paymentUrl) {
            window.location.href = res.paymentUrl;
            return;
        }

        // Free event
        router.push("/user/dashboard/joined-events");
    };

     const { formattedDate, formattedTime } = dateFormatter(event.date);

    return (
        <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                    <Badge
                        variant={event.fee === 0 ? "default" : "secondary"}
                        className={event.fee !== 0 ? "bg-white text-primary" : "bg-primary text-primary-foreground"}
                    >
                        {event.fee === 0 ? "Free" : event.fee}
                    </Badge>
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{event.type}</span>
                </div>

                <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                    {event.name}
                </h3>

                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        
                        <span className="">
                         {formattedDate},
                        </span>
                        <span className="">
                         {formattedTime}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{event.location}</span>
                    </div>
                </div>

                <div className="flex items-center justify-start gap-x-5">
                    <Button onClick={() => handleJoinedEvent(`${event.id}`)} className=" bg-primary hover:bg-primary/90 text-primary-foreground group/btn">
                        Join Event
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    <Link href={`/events/${event.id}`}>
                        <Button className=" bg-chart-2 hover:bg-chart-2/90 text-primary-foreground group/btn">
                            View Event
                            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}