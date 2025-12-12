import EventsPage from '@/components/modules/Event/All-events'
import ManagementPageHeader from '@/components/shared/ManagementPageHeader'
import RefreshButton from '@/components/shared/RefreshButton'
import { queryStringFormatter } from '@/lib/formatters'
import { getAllEvents } from '@/services/event/allEvents'
import React from 'react'

const EventsManagement = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {

   const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const allEventsData = await getAllEvents(queryString)
  return (
    <div>
      <div className='flex items-center justify-between space-y-6'>
         <ManagementPageHeader 
         title='All Events'
         />
         <RefreshButton/>
      </div>

      <EventsPage getAllEventsData={allEventsData} />
    </div>
  )
}

export default EventsManagement