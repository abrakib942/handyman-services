import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

function Home() {
  return (
    <>
      <Navbar />
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
