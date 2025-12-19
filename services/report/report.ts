"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";



export async function createReport() {

  const res = await serverFetch.post(`/users/create-report`);

  if (!res.ok) return [];

  const data = await res.json();
  return data.data || [];
}



// Load single report for View Modal
export async function getSingleReport(id: string) {
  const res = await serverFetch.get(`/admin-report/reports/${id}`);
  const data = await res.json();
  return data;
}

// Admin takes action
export async function reportAction(id: string, action: string) {
  try {
    const res = await serverFetch.patch(
      `/admin-report/reports/action/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: action,
        }),
      }
    );

    const data = await res.json();
    revalidateTag("all-reports",{expire:0});
    return data;
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}


// Load all reports
export async function getAllReports() {
  const res = await serverFetch.get(`/admin-report/reports`,{
    next:{tags:["all-reports"]}
  });
  const data = await res.json();
  return data;
}


