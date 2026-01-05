import PublicEvents from "@/components/modules/Event/PublicEvents";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllPublicEvents } from "@/services/event/allEvents";

const PublicEventPage = async ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const allPublicEventsData = await getAllPublicEvents(queryString);

  return (
    <PublicEvents
      events={allPublicEventsData.data}
      meta={allPublicEventsData.meta}
    />
  );
};

export default PublicEventPage;
