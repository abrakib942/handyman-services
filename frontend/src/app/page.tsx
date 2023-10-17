"use client";

import Navbar from "@/components/Navbar";
import Banner from "@/components/home/Banner";
import BannerBottom from "@/components/home/BannerBottom";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/home/Footer";
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
      <ContactSection />
      <Footer />
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), { ssr: false });
