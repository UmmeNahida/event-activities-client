// import SavedEventsTable from '@/components/modules/User/SavedEvent'
import SavedEventsTable from "@/components/modules/User/SavedEventsTable";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import RefreshButton from "@/components/shared/RefreshButton";
import { getSavedEvents } from "@/services/savedEvents/savedEventActions";

const SavedEvents = async () => {
  const saveEvents = await getSavedEvents();
  console.log("saveEvent:", saveEvents.data)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-5">
        <ManagementPageHeader title="My Saved Events"></ManagementPageHeader>
        <div className="flex items-center gap-x-3">
          <RefreshButton />
          <ClearFiltersButton />
        </div>
      </div>
      <SavedEventsTable />
    </div>
  );
};

export default SavedEvents;
