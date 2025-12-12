"use server";

import { serverFetch } from "@/lib/server-fetch";



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
  const res = await serverFetch.patch(`/admin-report/reports/action/${id}`, {
    body: JSON.stringify({ action }),
  });

  const data = await res.json();
  return data;
}

// Load all reports
export async function getAllReports() {
  const res = await serverFetch.get(`/admin-report/reports`);
  const data = await res.json();
  return data;
}


