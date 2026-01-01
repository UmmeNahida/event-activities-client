import Pagination from "@/components/modules/Event/pagination";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/selectFilter";
import { queryStringFormatter } from "@/lib/formatters";
import { getMyEvents } from "@/services/event/allEvents";
import HostEventsTable from "@/services/host/EventHostTable";

const MyEvents = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const myEventsData = await getMyEvents(queryString);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <ManagementPageHeader title="My Events" />
        <RefreshButton />
      </div>

      {/* Filters */}
      <div className="flex items-center justify-start gap-5 mb-8">
        <SearchFilter
          placeholder="Search events..."
          paramName="searchTerm"
        />

        <SelectFilter
          paramName="type"
          placeholder="Event Type"
          options={[
            { label: "Music", value: "Music" },
            { label: "Tech", value: "Tech" },
            { label: "Travel", value: "Travel" },
            { label: "Art", value: "Art" },
            { label: "Gaming", value: "Gaming" },
            { label: "Conference", value: "Conference" },
            { label: "Concert", value: "Concert" },
            { label: "Hiking", value: "Hiking" },
            { label: "Dinner", value: "Dinner" },
            { label: "Sports", value: "Sports" },
          ]}
        />

        <SelectFilter
          paramName="location"
          placeholder="Location"
          options={[
            { label: "Dhaka", value: "dhaka" },
            { label: "Chittagong", value: "chittagong" },
            { label: "Sylhet", value: "sylhet" },
            { label: "Bandarban", value: "Bandarban" },
          ]}
        />

        <SelectFilter
          paramName="fee"
          placeholder="Max Fee"
          options={[
            { label: "Free", value: "0" },
            { label: "Under 500", value: "500" },
            { label: "Under 1000", value: "1000" },
            { label: "Under 2000", value: "2000" },
          ]}
        />
        <ClearFiltersButton />
      </div>

      <HostEventsTable events={myEventsData.events}></HostEventsTable>
      <Pagination meta={myEventsData.meta} />
    </div>
  );
};

export default MyEvents;
