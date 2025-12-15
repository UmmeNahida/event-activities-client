/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

interface FormState {
    success: boolean;
    message: string;
    errors: Record<string, string[]>;
}

export const createEventAction = async (
    prevState: FormState,
    formData: FormData
) => {
    try {
        const jsonData = formData.get("data") as string;
        const parsed = JSON.parse(jsonData);

        const payload = {
            name: formData.get("title") as string,
            description: formData.get("description") as string,
            location: formData.get("location") as string,
            date: formData.get("eventDate"),
            time: formData.get("time") as string,
            fee: Number(formData.get("fee")),
            minParticipants: Number(formData.get("minParticipants")),
            maxParticipants: Number(formData.get("maxParticipants")),
            type: parsed.category,
        };

        const newForm = new FormData();

        newForm.append("data", JSON.stringify(payload));

        if (formData?.get("file")) {
            newForm.append("file", formData.get("file") as Blob);
        }

        const res = await serverFetch.post("/host/create-event", {
            body: newForm,
        });

        const result = await res.json();
        console.log("result",result)

        if (!result.success) {
            return {
                success: false,
                message: result.message,
                errors: result.errors || {},
            };
        }


        return {
            success: true,
            message: "Event created successfully!",
            errors: {},
        };
    } catch (err: any) {
        console.error("EVENT ERROR:", err);

        return {
            success: false,
            message: err.message || "Something went wrong",
            errors: {},
        };
    }
};


export async function getSingleEvents(id:string) {
    try {
        

        const response = await serverFetch.get(`/events/event-details/${id}`);

        const result = await response.json();

        if (result.success) {
            revalidateTag("host-events", { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}


export async function updateMyEvents(id:string,formData: FormData) {
    try {
        // console.log("form", formData)
        // // Create a new FormData with the data property
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
        console.log("upload form data:", uploadFormData)

        const response = await serverFetch.patch(`/host/edit/${id}`, {
            body: uploadFormData,
        });

        const result = await response.json();

        if (result.success) {
            revalidateTag('host-events', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function promoteToHost(email:string) {
    try {

        const response = await serverFetch.patch(`/admin/users/promote/${email}`);

        const result = await response.json();

        if (result.success) {
            revalidateTag("user-info", { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}