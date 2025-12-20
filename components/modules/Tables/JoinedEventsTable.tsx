"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { IJoinedEvent, IJoinedEventResponse } from "@/types/passed-event.interface";
import { joinedEventsColumns } from "../columns/joined-events-columns";
import { useState } from "react";


const JoinedEventsTable = ({joinedEvents} : {joinedEvents:IJoinedEventResponse}) => {
  const [isLoading,setIsLoading] = useState(false)
  return (
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
  );
};

export default JoinedEventsTable;
