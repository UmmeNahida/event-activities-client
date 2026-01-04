/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ENV } from "@/config";
import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";
import { toast } from "sonner";

export const myParticipantUsers = async (
  eventId: string,
  page:number,
  limit:number
) => {
  try {
    const res = await serverFetch.get(`/events/${eventId}/even-participants?page=${page}&limit=${limit}`);

    const result = await res.json();
    return result.data
  } catch (err: any) {
    console.log()
    return {
      success: false,
      message: `${
        ENV.NODE_ENV === "development"
          ? err.message
          : "something went wrong2"
      }`,
    };
  }
};

export async function getAllEvents(queryString?: string) {
  const res = await serverFetch.get(
    `/admin/all-events${queryString ? `?${queryString}` : ""}`,
    {
      next: { tags: ["admin-events"] },
    }
  );

  if (!res.ok) return [];

  const data = await res.json();
  return data.data || [];
}

export async function getMyEvents(queryString?: string) {
  const res = await serverFetch.get(
    `/events/my-events${queryString ? `?${queryString}` : ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return {
      events: [],
      meta: { page: 1, limit: 5, total: 0 },
    };
  }

  const json = await res.json();
  return json.data;
}

export async function adminGetUsers(query: any) {
  const qs = new URLSearchParams(query).toString();

  const res = await serverFetch.get(`/admin/users?${qs}`, {
    next: { tags: ["all-users"] },
  });

  if (!res.ok) return { data: [], meta: {} };
  return await res.json();
}

export async function adminGetHosts(query: any) {
  const qs = new URLSearchParams(query).toString();
  const res = await serverFetch.get(`/admin/hosts?${qs}`, {
    next: { tags: ["all-hosts"] },
  });

  if (!res.ok) return { data: [], meta: {} };
  return await res.json();
}

export const updateHostStatus = async (
  id: string,
  status: string
) => {
  try {
    const res = await serverFetch.patch(`/admin/hosts/status/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag("user-info", { expire: 0 });
    }
  } catch (err: any) {
    return {
      success: false,
      message: `${
        ENV.NODE_ENV === "development"
          ? err.message
          : "something went wrong"
      }`,
    };
  }
};

export const approveHostRequest = async (id: string) => {
  try {
    const res = await serverFetch.patch(`/admin/approve-host/${id}`, {
      headers: {
        "content-type": "application-json",
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag("all-users", { expire: 0 });
    }

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
};

export const rejectHostRequest = async (id: string) => {
  try {
    const res = await serverFetch.patch(`/admin/reject-host/${id}`, {
      headers: {
        "content-type": "application-json",
      },
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag("all-users", { expire: 0 });
    }

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
};

export async function updateMyProfile(formData: FormData) {
  try {
    const uploadFormData = new FormData();

    // Get all form fields except the file
    const data: any = {};
    formData.forEach((value, key) => {
      if (key !== "file" && value) {
        data[key] = value;
      }
    });

    // Add the data as JSON string
    uploadFormData.append("data", JSON.stringify(data));

    // Add the file if it exists
    const file = formData.get("file");
    if (file && file instanceof File && file.size > 0) {
      uploadFormData.append("file", file);
    }

    const response = await serverFetch.patch(
      `/users/update-my-profile`,
      {
        body: uploadFormData,
      }
    );

    const result = await response.json();

    if (result.success) {
      revalidateTag("user-info", { expire: 0 });
    }
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

export async function deleteUser(id: string) {
  try {
    const res = await serverFetch.delete(`/admin/users/delete/${id}`);

    const result = await res.json();

    if (result.success) {
      revalidateTag("all-users", { expire: 0 });
    }

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

// update event status
export const updateEventStatus = async (
  id: string,
  status: string
) => {
  try {
    const res = await serverFetch.patch(`/events/status/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status,
      }),
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag("admin-events", { expire: 0 });
    }

    return result;
  } catch (err: any) {
    return {
      success: false,
      message:
        ENV.NODE_ENV === "development"
          ? err.message
          : "something went wrong",
    };
  }
};
