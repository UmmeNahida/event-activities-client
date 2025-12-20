"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import {
  IJoinedEvent,
  IJoinedEventResponse,
} from "@/types/passed-event.interface";
import { joinedEventsColumns } from "../columns/joined-events-columns";
import { useState } from "react";
import Pagination from "../Event/pagination";

const PastEventsTable = ({
  passedEvents,
}: {
  passedEvents: IJoinedEventResponse;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <ManagementTable<IJoinedEvent>
        data={passedEvents.data}
        columns={joinedEventsColumns}
        getRowKey={(row) => row.id}
        emptyMessage="You haven't joined any events yet."
        isRefreshing={isLoading}
        onView={(row) => {
          console.log("View Event:", row.event.id);
          // router.push(`/events/${row.event.id}`)
        }}
      />

      <Pagination meta={passedEvents.meta}></Pagination>
    </div>
  );
};

export default PastEventsTable;
