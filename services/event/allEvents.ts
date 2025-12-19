"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export async function getAllEvents(queryString?: string) {

  const res = await serverFetch.get(`/common/all-events${queryString ? `?${queryString}` : ""}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.data || [];
}

export async function getMyEvents(queryString?: string) {

  const res = await serverFetch.get(`/events/my-events${queryString ? `?${queryString}` : ""}`, {
    next: { tags: ['host-events'] },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.data || [];
}


export async function adminGetUsers(query: any) {
  const qs = new URLSearchParams(query).toString();

  const res = await serverFetch.get(`/admin/users?${qs}`, {
    next: { tags: ["all-users"] }
  });

  if (!res.ok) return { data: [], meta: {} };
  return await res.json();
}

export async function adminGetHosts(query: any) {
  const qs = new URLSearchParams(query).toString();
  const res = await serverFetch.get(`/admin/hosts?${qs}`, {
    next: { tags: ["all-hosts"] }
  });

  if (!res.ok) return { data: [], meta: {} };
  return await res.json();
}


export const updateHostStatus = async (id: string, status: string) => {

  const res = await serverFetch.patch(`/admin/hosts/status/${id}`, {
    headers: {
      "content-type": "application-json"
    },
    body: status
  })

  const result = await res.json()

  if (result.success) {
    revalidateTag("user-info", { expire: 0 });
  }

}

export const approveHostRequest = async (id: string) => {

  try {
    const res = await serverFetch.patch(`/admin/approve-host/${id}`, {
      headers: {
        "content-type": "application-json"
      }
    })

    const result = await res.json()

    if (result.success) {
      revalidateTag("all-users", { expire: 0 });
    }

    return result
  } catch (error:any) {
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
    };
  }

}

export const rejectHostRequest = async (id: string) => {

  try {
    const res = await serverFetch.patch(`/admin/reject-host/${id}`, {
      headers: {
        "content-type": "application-json"
      }
    })

    const result = await res.json()

    if (result.success) {
      revalidateTag("all-users", { expire: 0 });
    }

    return result
  } catch (error:any) {
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
    };
  }

}

export async function updateMyProfile(formData: FormData) {
  try {
    const uploadFormData = new FormData();

    // Get all form fields except the file
    const data: any = {};
    formData.forEach((value, key) => {
      if (key !== 'file' && value) {
        data[key] = value;
      }
    });

    // Add the data as JSON string
    uploadFormData.append('data', JSON.stringify(data));

    // Add the file if it exists
    const file = formData.get('file');
    if (file && file instanceof File && file.size > 0) {
      uploadFormData.append('file', file);
    }

    const response = await serverFetch.patch(`/users/update-my-profile`, {
      body: uploadFormData,
    });

    const result = await response.json();

    if (result.success) {
      revalidateTag("user-info", { expire: 0 });
    }
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
    };
  }
}


export async function deleteUser(id:string) {
  try {

    const res = await serverFetch.delete(`/admin/users/delete/${id}`)

    const result = await res.json()

    if (result.success) {
      revalidateTag("all-users", { expire: 0 });
    }

    return result
  } catch (error: any) {
    return {
      success: false,
      message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
    };
  }
}





