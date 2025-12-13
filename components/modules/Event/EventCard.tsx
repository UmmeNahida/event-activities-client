"use client";

import Image from "next/image";
import { Calendar, MapPin, Tag, ArrowRight } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

export interface Event {
    id: string;
    title: string;
    image: string;
    date: string;
    location: string;
    category: string;
    price: string;
    isPaid: boolean;
}

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    return (
        <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                    <Badge
                        variant={event.isPaid ? "default" : "secondary"}
                        className={event.isPaid ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}
                    >
                        {event.price}
                    </Badge>
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{event.category}</span>
                </div>

                <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                    {event.title}
                </h3>

                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{event.location}</span>
                    </div>
                </div>

                <div className="flex items-center justify-start gap-x-5">
                    <Button className=" bg-primary hover:bg-primary/90 text-primary-foreground group/btn">
                        Join Event
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    <Button className=" bg-chart-2 hover:bg-chart-2/90 text-primary-foreground group/btn">
                        View Event
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </div>
        </div>
    );
}