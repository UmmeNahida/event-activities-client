import Image from "next/image";
import ContainerDiv from "../../shared/ContainerDiv";
import Link from "next/link";

export const sampleEvents = [
  {
    id: "7de6dd6c-7423-437a-8f53-8287712780a8",
    title: "Sunset Kayak Trip",
    date: "Dec 20, 2025",
    location: "Lakeshore Park",
    price: "Free",
    img: "https://i.ibb.co.com/TxBjRR0Q/hotel-home.jpg",
  },
  {
    id: "74d76638-9bcd-4209-8963-7f3d5536df70",
    title: "Weekend Coding Workshop",
    date: "Jan 10, 2026",
    location: "Downtown Hub",
    price: "$20",
    img: "https://i.ibb.co.com/x8R6kBGz/istockphoto-1479759169-612x612.jpg",
  },
  {
    id: "25a0e818-8a11-432f-8c80-86bacb530458",
    title: "City Food Crawl",
    date: "Dec 28, 2025",
    location: "Old Town",
    price: "$15",
    img: "https://i.ibb.co.com/tpbsQHFB/about-image-1.jpg",
  },
  {
    id: "d1a95d79-0b45-4dcc-8070-42bdf2f7cd77",
    title: "Photography Walk",
    date: "Jan 05, 2026",
    location: "Riverside",
    price: "Free",
    img: "https://i.ibb.co.com/1RtN0Sk/1696575386372.jpg",
  },
];

const Banner = () => {
  return (
    <div>
      {/* HERO / BANNER */}
      <header className="bg-linear-to-r from-sky-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                Find activities near you or create your own
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-indigo-100 max-w-xl">
                Discover local events, meet people who share your
                passions, and host experiences that bring communities
                together. Search by category, date, or proximity.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center rounded-md bg-white text-sky-700 px-5 py-3 text-sm font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Explore Events
                </Link>

                <a
                  href="/create-event"
                  className="inline-flex items-center justify-center rounded-md border border-white/40 text-white px-5 py-3 text-sm font-semibold hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Create Event
                </a>
              </div>

              <div className="mt-6 text-sm text-indigo-100">
                <span className="font-medium">Popular:</span> Hiking ·
                Workshops · Food · Live Music · Networking
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">
                <Image
                  width="300"
                  height="300"
                  src="https://i.ibb.co.com/TxBjRR0Q/hotel-home.jpg"
                  alt="Hero event"
                  className="w-full h-64 object-cover sm:h-80 lg:h-96"
                />
              </div>

              <div className="absolute -bottom-6 left-6 bg-white rounded-xl shadow-xl p-4 w-64 sm:w-80">
                <div className="flex items-start gap-3">
                  <Image
                    width="300"
                    height="300"
                    src={sampleEvents[1].img}
                    alt="thumb"
                    className="w-16 h-12 rounded-md object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold">
                      {sampleEvents[1].title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {sampleEvents[1].date} •{" "}
                      {sampleEvents[1].location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured / Upcoming Events (near user) */}
      <ContainerDiv>
        <section className="bg-white rounded-2xl -mt-6 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-secondary">
              Browse Our Featured & Popular Events
            </h2>
            <Link
              href="/events"
              className="text-sm text-sky-600 hover:underline"
            >
              See all events
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleEvents.map((e) => (
              <article
                key={e.id}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-sm"
              >
                <Image
                  src={e.img}
                  alt={e.title}
                  width="300"
                  height="300"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-sm">{e.title}</h3>
                  <div className="mt-2 text-xs text-gray-500">
                    {e.date} • {e.location}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm font-semibold">
                      {e.price}
                    </div>
                    <a
                      href={`/events/${e.id}`}
                      className="text-xs text-sky-600 hover:underline"
                    >
                      View
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </ContainerDiv>
    </div>
  );
};

export default Banner;
