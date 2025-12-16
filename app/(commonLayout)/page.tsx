import EventCategories from "@/components/modules/Event/EventCategories";
import Banner from "@/components/modules/Home/Banner";
import ChooseUs from "@/components/modules/Home/ChooseUs";
import HowItWork from "@/components/modules/Home/HowItWork";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopHosts from "@/components/modules/Home/TopHosts";
import { getUserInfo } from "@/services/auth/getUserInfo";
import Head from "next/head";

export const dynamic = "force-dynamic";

export default async function Home() {
  const userInfo = await getUserInfo();
  console.log("userInfo", userInfo);
  return (
    <>
      <Head>
        <title>Event & Activity</title>
        <meta
          name="description"
          content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Main content goes here  */}
        <Banner />
        <HowItWork />
        <ChooseUs />
        <EventCategories />
        <TopHosts />
        <Testimonials />
      </main>
    </>
  );
}
