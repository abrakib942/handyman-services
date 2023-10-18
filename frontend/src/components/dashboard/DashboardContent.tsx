"use client";

import { Layout } from "antd";
import HSBreadCrumb from "../ui/HSBreadCrumb";

const { Content } = Layout;

const DashboardContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout className="mt-5" style={{ padding: "0 24px 24px" }}>
      <HSBreadCrumb
        items={[
          {
            label: "dashboard",
            link: "/dashboard",
          },
        ]}
      />

      <Content
        style={{
          padding: 24,
          minHeight: 400,
          overflow: "initial",
          background: "white",
        }}
      >
        <div
          style={{
            padding: "10px",
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default DashboardContent;
