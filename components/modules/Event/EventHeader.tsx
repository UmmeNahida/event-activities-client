"use client";

import { Search } from "lucide-react";
import { Input } from "../../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";

interface EventsHeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
}

export default function EventsHeader({
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
}: EventsHeaderProps) {
    return (
        <div className="mb-8 space-y-6">
            {/* Title */}
            <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-linear-to-r from-primary via-orange-500 to-accent bg-clip-text text-transparent">
                    Explore Events
                </h1>
                <p className="text-muted-foreground text-lg">
                    Discover amazing events happening around you
                </p>
            </div>

            {/* Search Bar and Sort */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search for events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-12 rounded-xl border-2 focus:border-primary transition-colors"
                    />
                </div>

            </div>
        </div>
    );
}