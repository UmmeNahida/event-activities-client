"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../ui/button";

interface EventsPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function EventsPagination({
    currentPage,
    totalPages,
    onPageChange,
}: EventsPaginationProps) {
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 4;

        if (totalPages <= maxVisible) {
            // Show all pages if total is less than max visible
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push("...");
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            {/* Previous Button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-xl shadow-sm hover:shadow-md transition-shadow disabled:opacity-50"
            >
                <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Page Numbers */}
            <div className="flex gap-2">
                {getPageNumbers().map((page, index) => {
                    if (page === "...") {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="px-4 py-2 text-muted-foreground"
                            >
                                ...
                            </span>
                        );
                    }

                    const pageNumber = page as number;
                    const isActive = pageNumber === currentPage;

                    return (
                        <Button
                            key={pageNumber}
                            variant={isActive ? "default" : "outline"}
                            onClick={() => onPageChange(pageNumber)}
                            className={`
                rounded-xl min-w-11 shadow-sm hover:shadow-md transition-all
                ${isActive
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90 scale-105"
                                    : "hover:border-primary"
                                }
              `}
                        >
                            {pageNumber}
                        </Button>
                    );
                })}
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-xl shadow-sm hover:shadow-md transition-shadow disabled:opacity-50"
            >
                <ChevronRight className="w-5 h-5" />
            </Button>
        </div>
    );
}