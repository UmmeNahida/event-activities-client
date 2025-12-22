/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getSavedEvents() {
  try {
    const res = await serverFetch.get(`/saved-events/my-saved`, {
      next: { revalidate: 0 },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function saveEvent(eventId: string) {
  try {
    const res = await serverFetch.post(
      `/saved-events/add/${eventId}`
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function unsaveEventAction(eventId: string) {
  try {
    const res = await serverFetch.delete(
      `/saved-events/remove/${eventId}`
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}
