"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import {
  IJoinedEvent,
  IJoinedEventResponse,
} from "@/types/passed-event.interface";
import { joinedEventsColumns } from "../columns/joined-events-columns";
import { useState } from "react";
import SelectFilter from "@/components/shared/selectFilter";
import SearchFilter from "@/components/shared/SearchFilter";

const JoinedEventsTable = ({
  joinedEvents,
}: {
  joinedEvents: IJoinedEventResponse;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {/* /* Filters */}
      <div className="flex items-center justify-start gap-5 mb-3">
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
      
      <ManagementTable<IJoinedEvent>
        data={joinedEvents.data}
        columns={joinedEventsColumns}
        getRowKey={(row) => row.id}
        emptyMessage="You haven't joined any events yet."
        isRefreshing={isLoading}
        onView={(row) => {
          console.log("View Event:", row.event.id);
          // router.push(`/events/${row.event.id}`)
        }}
      />
    </div>
  );
};

export default JoinedEventsTable;
