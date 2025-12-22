/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import {
  IJoinedEvent,
  IJoinedEventResponse,
} from "@/types/passed-event.interface";
import { joinedEventsColumns } from "../columns/joined-events-columns";
import { useState } from "react";
import Pagination from "../Event/pagination";
import { ro } from "date-fns/locale";
import { EventDetailsModal } from "../modals/EventDetailsModal";

const PastEventsTable = ({
  passedEvents,
}: {
  passedEvents: IJoinedEventResponse;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleView = (event: any) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  return (
    <div>
      <ManagementTable<IJoinedEvent>
        data={passedEvents.data}
        columns={joinedEventsColumns}
        getRowKey={(row) => row.id}
        emptyMessage="You haven't joined any events yet."
        isRefreshing={isLoading}
        onView={(row) => handleView(row.event)}
      />

      <Pagination meta={passedEvents.meta}></Pagination>
      <EventDetailsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default PastEventsTable;
