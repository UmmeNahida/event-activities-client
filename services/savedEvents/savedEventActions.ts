"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getSavedEvents() {

  const res = await serverFetch.get(`/saved-events/my-saved`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.data || [];
}

export async function saveEvent(eventId: string) {

  const res = await serverFetch.post(`/saved-events/add/${eventId}`)
  const result = await res.json()
  if (!res.ok) throw new Error("Failed to save");
  return result;
}

export async function unsaveEventAction(eventId: string) {

  const res = await serverFetch.delete(`/saved-events/remove/${eventId}`)
  const result = await res.json()

  if (!res.ok) throw new Error("Failed to unsave");
  return result;
}
