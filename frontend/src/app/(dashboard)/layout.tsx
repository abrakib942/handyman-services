"use client";

import Navbar from "@/components/Navbar";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardSide from "@/components/dashboard/DashboardSide";
import { isLoggedIn } from "@/services/auth.service";
import { Layout, Row, Space, Spin } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading]);

  return (
    <>
      <Navbar />

      <Layout hasSider>
        <DashboardSide />
        <DashboardContent>{children}</DashboardContent>
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(DashboardLayout), { ssr: false });
