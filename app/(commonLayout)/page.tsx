
import Banner from "@/components/modules/Home/Banner";
import EventHomepage from "@/components/modules/Home/Home";
import HowItWork from "@/components/modules/Home/HowItWork";
import TopHosts from "@/components/modules/Home/TopHosts";
import { getUserInfo } from "@/services/auth/getUserInfo";
import Head from "next/head";


export default async function Home() {
   const userInfo = await getUserInfo();
      console.log("userInfo",userInfo)
  return (
    <>
      <Head>
        <title>Event & Activity</title>
        <meta
          name="description"
          content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Main content goes here  */}
        <Banner />
        <HowItWork />
        <TopHosts />
        
        
      </main>
    </>
  );
}
