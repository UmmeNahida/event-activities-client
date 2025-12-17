import UserManagementTable from '@/components/modules/Event/UserManagementTable'
import { queryStringFormatter } from '@/lib/formatters'
import { adminGetUsers } from '@/services/event/allEvents'


const UserManagement = async({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
   const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
  const usersData = await adminGetUsers(queryString)


  return (
    <div>
      <h1 className='text-2xl mb-10'>User Management</h1>
        <UserManagementTable userData={usersData} />
    </div>
  )
}

export default UserManagement