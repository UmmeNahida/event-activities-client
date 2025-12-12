import HostManagementTable from '@/components/modules/Event/HostManagementTable';
import { queryStringFormatter } from '@/lib/formatters';
import { adminGetHosts } from '@/services/event/allEvents';


const HostManagement = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
   const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
  const usersData = await adminGetHosts(queryString)
  
  return (
    <div>
        <HostManagementTable userData={usersData} />
    </div>
  )
}

export default HostManagement