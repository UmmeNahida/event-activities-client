import JoinedEventsTable from "@/components/modules/Tables/JoinedEventsTable";
import UserJoinedEventsTable from "@/components/modules/User/UserJoined";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import RefreshButton from "@/components/shared/RefreshButton";
import { getJoinedEvents } from "@/services/participants/participants-service";

const JoinedEvents = async () => {
  const joinedEvents = await getJoinedEvents();
  return (
    <div>
      {/* <UserJoinedEventsTable></UserJoinedEventsTable> */}
      <div className="flex items-center justify-between mb-5">
        <ManagementPageHeader title="My Joined Events"></ManagementPageHeader>
        <div className="flex items-center gap-x-3">
          <RefreshButton />
          <ClearFiltersButton />
        </div>
      </div>
      <JoinedEventsTable joinedEvents={joinedEvents.data} />
    </div>
  );
};

export default JoinedEvents;
