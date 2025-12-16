import EventDetails from '@/components/modules/Event/EventDetails'
import { getSingleEvents } from '@/services/host/hostApiService';

type PageProps = {
  params: Promise<{id: string}>
}

const EventDetailsPage = async({params}:PageProps) => {
 
  const {id} = await params;
  const eventDetails = await getSingleEvents(id)
  
  return (
    <div>
      <EventDetails events={eventDetails.data} />
    </div>
  )
}

export default EventDetailsPage