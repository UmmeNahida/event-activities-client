import PastEventsTable from "@/components/modules/Tables/PastEventsTable";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import RefreshButton from "@/components/shared/RefreshButton";
import { queryStringFormatter } from "@/lib/formatters";
import { getPassedEvents } from "@/services/participants/participants-service";

const PastEvents = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const getPassedEvent = await getPassedEvents(queryString);
  return (
    <div>
      <div className="flex items-center justify-between space-y-6">
        <ManagementPageHeader title="All My Past Events" />
        <div className="flex items-center gap-x-3">
          <RefreshButton />
          <ClearFiltersButton />
        </div>
      </div>
      <PastEventsTable passedEvents={getPassedEvent.data} />
    </div>
  );
};

export default PastEvents;
