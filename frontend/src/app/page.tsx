import Navbar from "@/components/Navbar";
import Banner from "@/components/home/Banner";
import dynamic from "next/dynamic";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
