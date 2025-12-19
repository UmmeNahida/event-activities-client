// import SavedEventsTable from '@/components/modules/User/SavedEvent'
import SavedEventsTable from '@/components/modules/User/SavedEventsTable'
import RefreshButton from '@/components/shared/RefreshButton'
import { getSavedEvents } from '@/services/savedEvents/savedEventActions'


const SavedEvents = async () => {
  const saveEvents = await getSavedEvents()
  return (
    <div className='space-y-6'>
      <RefreshButton />
      <SavedEventsTable />
    </div>
  )
}

export default SavedEvents