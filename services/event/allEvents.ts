import { serverFetch } from "@/lib/server-fetch";

export async function getAllEvents(queryString?:string) {

  const res = await serverFetch.get(`/common/all-events${queryString ? `?${queryString}` : ""}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.data || [];
}


export async function getMyEvents(queryString?:string) {

  const res = await serverFetch.get(`/events/my-events${queryString ? `?${queryString}` : ""}`, {
    next: {tags:['host-events'] },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.data || [];
}


export async function paymentOverview() {
  
  const res = await serverFetch.get(`/admin/payment-overview`);

  if (!res.ok) return { data: [], meta: {} };
  return await res.json();
}

export async function adminGetUsers(query: any) {
  const qs = new URLSearchParams(query).toString();
  
  const res = await serverFetch.get(`/admin/users?${qs}`);

  if (!res.ok) return { data: [], meta: {} };
  return await res.json();
}

export async function adminGetHosts(query: any) {
  const qs = new URLSearchParams(query).toString();
  const res = await serverFetch.get(`/admin/hosts?${qs}`);

  if (!res.ok) return { data: [], meta: {} };
  return await res.json();
}
