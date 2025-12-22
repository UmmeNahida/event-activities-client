/*eslint-disable @typescript-eslint/no-explicit-any*/

import { serverFetch } from "@/lib/server-fetch";
import { toast } from "sonner";

interface addReviewPayload {
  eventId: string;
  rating: number;
  comment: string;
}

export async function addReview(payload: addReviewPayload) {
  let data = [];
  try {
    const res = await serverFetch.post(`/participants/add-review`, {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!result.success && result.message) {
      throw new Error(result.message);
    }
    data = result.data;
  } catch (err) {
    toast.error((err as Error).message);
  } finally {
    return data;
  }
}

export async function joinedEvent(id: string) {
  try {
    const res = await serverFetch.post(
      `/participants/joint-event/${id}`
    );
    const result = await res.json();

    if (!result.success) {
      return { success: false, message: result.message };
    }

    return {
      success: true,
      message: result.message,
      paymentUrl: result.data?.paymentUrl ?? null,
      isPaidEvent: !!result.data?.paymentData,
    };
  } catch (e) {
    return { success: false, message: "Server error" };
  }
}

// get my joined event
export async function getJoinedEvents(queryString?:string) {
  try {
    const res = await serverFetch.get(`/participants/joined-event${queryString ? `?${queryString}` : ""}`, {
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


// get my passed event
export async function getPassedEvents(queryString?:string) {
  try {
    const res = await serverFetch.get(`/participants/passed-event${queryString ? `?${queryString}` : ""}`, {
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
