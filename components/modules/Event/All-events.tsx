/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/selectFilter";
import EventsGrid from "./EventsGrid";
import Pagination from "./pagination";

export default function EventsPage({ getAllEventsData }: any) {

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Filters */}
      <div className="flex items-center justify-start gap-5 mb-8">
        <SearchFilter
          placeholder="Search events..."
          paramName="searchTerm"
        />

        <SelectFilter
          paramName="type"
          placeholder="Event Type"
          options={[
            { label: "Conference", value: "Conference" },
            { label: "Concert", value: "concert" },
            { label: "Hiking", value: "Hiking" },
            { label: "Dinner", value: "dinner" },
            { label: "Sports", value: "sports" },
          ]}
        />

        <SelectFilter
          paramName="location"
          placeholder="Location"
          options={[
            { label: "Dhaka", value: "dhaka" },
            { label: "Chittagong", value: "chittagong" },
            { label: "Sylhet", value: "sylhet" },
            { label: "Bandarban", value: "Bandarban" },
          ]}
        />

        <SelectFilter
          paramName="fee"
          placeholder="Max Fee"
          options={[
            { label: "Free", value: "0" },
            { label: "Under 500", value: "500" },
            { label: "Under 1000", value: "1000" },
            { label: "Under 2000", value: "2000" },
          ]}
        />
      </div>

      {/* Events List */}
      <EventsGrid events={getAllEventsData.data} />

      {/* Pagination */}
      <Pagination meta={getAllEventsData.meta} />
    </div>
  );
}
