"use client";


import EmptyState from "@/components/modules/Event/EmptyState";
import EventsHeader from "@/components/modules/Event/EventHeader";
import EventsFilters from "@/components/modules/Event/EventsFilters";
import EventsGrid from "@/components/modules/Event/EventsGrid";
import EventsPagination from "@/components/modules/Event/EventsPagination";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface EventHost {
  name: string;
  avatar: string;
}

export interface EventType {
  id: string;
  name: string;
  image: string;
  date: string;       // e.g. "June 15, 2024 • 6:00 PM"
  location: string;
  type: string;       // e.g. "Music"
  fee: string;        // e.g. "Starts from $45"
  isPaid: boolean;
  host: EventHost;
}


// Mock data - replace with actual API data
const mockEvents: EventType[] = [
   {
        id: "74d76638-9bcd-4209-8963-7f3d5536df70",
        name: "Summer Music Festival 2024",
        image: "https://i.ibb.co.com/xYdk0f0/download-1.jpg",
        date: "June 15, 2024 • 6:00 PM",
        location: "Central Park, New York",
        type: "Music",
        fee: "Starts from $45",
        isPaid: true,
        host: {
            name: "John Doe",
            avatar: "https://i.pravatar.cc/150?img=12",
        },
    },
    {
        id: "74d76638-9bcd-4209-8963-7f3d5536df70",
        name: "Tech Conference 2024",
        image: "https://i.ibb.co.com/hLPXRTR/images.jpg",
        date: "July 20, 2024 • 9:00 AM",
        location: "Convention Center, San Francisco",
        type: "Tech",
        fee: "Free",
        isPaid: false,
        host: {
            name: "Sarah Smith",
            avatar: "https://i.pravatar.cc/150?img=5",
        },
    },
    {
        id: "93f6ceb3-0814-4bc1-8569-b793a59db4d6",
        name: "Basketball Championship 2025",
        image: "https://i.ibb.co.com/KVKynTg/download-2.jpg",
        date: "August 5, 2024 • 3:00 PM",
        location: "Sports Arena, Los Angeles",
        type: "Sports",
        fee: "Starts from $30",
        isPaid: true,
        host: {
            name: "Mike Johnson",
            avatar: "https://i.pravatar.cc/150?img=33",
        },
    },
    {
        id: "25a0e818-8a11-432f-8c80-86bacb530458",
        name: "Online Gaming Tournament",
        image: "https://i.ibb.co.com/ZcmvWHR/download-3.jpg",
        date: "June 30, 2024 • 7:00 PM",
        location: "Online Event",
        type: "Gaming",
        fee: "Free",
        isPaid: false,
        host: {
            name: "Alex Chen",
            avatar: "https://i.pravatar.cc/150?img=68",
        },
    },
    {
        id: "d8eb840a-6e75-4bf3-9c36-5eef9834651f",
        name: "Art Gallery Exhibition",
        image: "https://i.ibb.co.com/1qPgcFk/download.jpg",
        date: "July 10, 2024 • 5:00 PM",
        location: "Modern Art Gallery, London",
        type: "Art",
        fee: "Free",
        isPaid: false,
        host: {
            name: "Emma Wilson",
            avatar: "https://i.pravatar.cc/150?img=45",
        },
    },
    {
        id: "5b825f8d-830c-4572-82d0-6856d08cd179",
        name: "Travel Photography Workshop",
        image: "https://i.ibb.co.com/C5V9wFY/images-1.jpg",
        date: "August 15, 2024 • 10:00 AM",
        location: "Photography Studio, Paris",
        type: "Travel",
        fee: "Starts from $80",
        isPaid: true,
        host: {
            name: "David Brown",
            avatar: "https://i.pravatar.cc/150?img=52",
        },
    },
    {
        id: "bc68ee03-d9a2-43f5-9d7d-30bf319f5105",
        name: "Jazz Night Live",
        image: "https://i.ibb.co.com/rQZrsNT/images.jpg",
        date: "June 25, 2024 • 8:00 PM",
        location: "Blue Note Jazz Club, NYC",
        type: "Music",
        fee: "Starts from $25",
        isPaid: true,
        host: {
            name: "Maria Garcia",
            avatar: "https://i.pravatar.cc/150?img=20",
        },
    },
    {
        id: "d1a95d79-0b45-4dcc-8070-42bdf2f7cd77",
        name: "Startup Pitch Competition",
        image: "https://i.ibb.co.com/ctgtQ3J/digital-design-businessman-show-growth-graph-earning-with-digital-marketing-strategy-35761-549.jpg",
        date: "July 5, 2024 • 2:00 PM",
        location: "Tech Hub, Austin",
        type: "Tech",
        fee: "Free",
        isPaid: false,
        host: {
            name: "Robert Lee",
            avatar: "https://i.pravatar.cc/150?img=15",
        },
    }
] 

export default function PublicEvents() {
    const pathname = usePathname()
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedtype, setSelectedtype] = useState("All");
    const [selectedfee, setSelectedfee] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("upcoming");
    const [sortBy, setSortBy] = useState("newest");
    const [currentPage, setCurrentPage] = useState(1);
    const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);

    const eventsPerPage = 8;

    // Filter logic
    const filteredEvents = mockEvents.filter((event) => {
        const matchesSearch = event?.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchestype = selectedtype === "All" || event.type === selectedtype;
        const matchesfee =
            selectedfee === "All" ||
            (selectedfee === "Free" && !event.isPaid) ||
            (selectedfee === "Paid" && event.isPaid);

        return matchesSearch && matchestype && matchesfee;
    });

    // Sort logic
    const sortedEvents = [...filteredEvents].sort((a, b) => {
        if (sortBy === "newest") return b!.id.localeCompare(a.id);
        if (sortBy === "upcoming") return a.date.localeCompare(b.date);
        // Add more sort options as needed
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedEvents.length / eventsPerPage);
    const startIndex = (currentPage - 1) * eventsPerPage;
    const paginatedEvents = sortedEvents.slice(startIndex, startIndex + eventsPerPage);

    // Bookmark toggle
    const toggleBookmark = (eventId: string) => {
        setBookmarkedEvents((prev) =>
            prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
        );
    };

    // Reset filters
    const resetFilters = () => {
        setSearchQuery("");
        setSelectedtype("All");
        setSelectedfee("All");
        setSelectedStatus("upcoming");
        setSortBy("newest");
        setCurrentPage(1);
    };

    return (
        <div className={`w-full ${pathname === "/events" ? "mt-24" : ""}`}>
            {/* <Navbar userRole="guest" /> */}

            <div className="container mx-auto px-8 pb-16">
                {/* Page Header */}
                <EventsHeader
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                {/* Filters */}
                <EventsFilters
                    selectedCategory={selectedtype}
                    setSelectedCategory={setSelectedtype}
                    selectedPrice={selectedfee}
                    setSelectedPrice={setSelectedfee}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                />

                {/* Events Grid or Empty State */}
                {paginatedEvents.length === 0 ? (
                    <EmptyState onReset={resetFilters} />
                ) : (
                    <>
                        <EventsGrid
                            events={paginatedEvents}
                            bookmarkedEvents={bookmarkedEvents}
                            toggleBookmark={toggleBookmark}
                        />

                        {/* Pagination */}
                        <EventsPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </>
                )}
            </div>
        </div>
    );
}