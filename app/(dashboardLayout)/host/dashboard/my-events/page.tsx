import { queryStringFormatter } from '@/lib/formatters';
import { getMyEvents } from '@/services/event/allEvents';
import HostEventsTable from '@/services/host/EventHostTable'


const MyEvents = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {

  const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const myEventsData = await getMyEvents(queryString)
    
    // console.log("myEvents",myEventsData)

  return (
    <div>
      <HostEventsTable events={myEventsData.events}></HostEventsTable>
    </div>
  )
}

export default MyEvents