import Navbar from "@/components/Navbar";
import Banner from "@/components/home/Banner";
import BannerBottom from "@/components/home/BannerBottom";
import dynamic from "next/dynamic";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <BannerBottom />
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
