"use client";

import Navbar from "@/components/Navbar";
import Banner from "@/components/home/Banner";
import BannerBottom from "@/components/home/BannerBottom";
import HandymanSection from "@/components/home/HandymanSection";
import Services from "@/components/home/Services";
import SummarySection from "@/components/home/SummarySection";
import Testimonials from "@/components/home/Testimonials";
import dynamic from "next/dynamic";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <BannerBottom />
      <Services />
      <HandymanSection />
      <SummarySection />
      <Testimonials />
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
