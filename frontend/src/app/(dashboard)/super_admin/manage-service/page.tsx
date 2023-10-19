import { redirect } from "next/navigation";
import React from "react";

const ManageServicePage = () => {
  return redirect("/admin/manage-service");
};

export default ManageServicePage;
