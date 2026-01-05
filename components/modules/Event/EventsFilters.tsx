"use client";

import { Music, Trophy, Gamepad2, Palette, Plane, Code } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { Badge } from "../../ui/badge";

interface EventsFiltersProps {
    selectedCategory: string;
    setSelectedCategory: (category:string) => void;
    selectedPrice: string;
    setSelectedPrice: (price: string) => void;
    selectedStatus: string;
    setSelectedStatus: (status: string) => void;
}

const categories = [
    { name: "All", icon: null },
    { name: "Music", icon: Music },
    { name: "Sports", icon: Trophy },
    { name: "Gaming", icon: Gamepad2 },
    { name: "Art", icon: Palette },
    { name: "Travel", icon: Plane },
    { name: "Tech", icon: Code },
];

export default function EventsFilters({
    selectedCategory,
    setSelectedCategory,
    selectedPrice,
    setSelectedPrice,
    selectedStatus,
    setSelectedStatus,
}: EventsFiltersProps) {
    return (
        <div className="mb-8 space-y-6">
            {/* Category Pills */}
            <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                    Categories
                </h3>
                <div className="flex flex-wrap gap-3">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        const isSelected = selectedCategory === category.name;

                        return (
                            <button
                                key={category.name}
                                onClick={() => setSelectedCategory(category.name)}
                                className={`
                  px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300
                  flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5
                  ${isSelected
                                        ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                        : "bg-card text-foreground border border-border hover:border-primary"
                                    }
                `}
                            >
                                {Icon && <Icon className="w-4 h-4" />}
                                <span>{category.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Additional Filters */}
            <div className="flex flex-wrap gap-4">
                {/* Price Filter */}
                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                    <SelectTrigger className="w-40 h-10 rounded-lg">
                        <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Prices</SelectItem>
                        <SelectItem value="Free">Free</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                    </SelectContent>
                </Select>

                {/* Status Filter */}
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-40 h-10 rounded-lg">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Status">Status</SelectItem>
                        <SelectItem value="PENDING">Upcoming</SelectItem>
                        <SelectItem value="COMPLETED">Past Events</SelectItem>
                        <SelectItem value="CLOSED">Close Events</SelectItem>
                        <SelectItem value="CANCELLED">Cancel Events</SelectItem>
                    </SelectContent>
                </Select>

                {/* Active Filters Badge */}
                {(selectedCategory !== "All" || selectedPrice !== "All") && (
                    <Badge
                        variant="secondary"
                        className="h-10 px-4 text-sm flex items-center gap-2"
                    >
                        {[
                            selectedCategory !== "All" && selectedCategory,
                            selectedPrice !== "All" && selectedPrice,
                        ]
                            .filter(Boolean)
                            .join(", ")}
                    </Badge>
                )}
            </div>
        </div>
    );
}