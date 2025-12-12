/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt from "jsonwebtoken"
import { getCookie } from "../auth/tokenHandler";
import { serverFetch } from "@/lib/server-fetch";
interface FormState {
    success: boolean;
    message: string;
    errors: Record<string, string[]>;
}

export const createEventAction = async (
    prevState: FormState,
    formData: FormData
): Promise<FormState> => {
    try {
        const accessToken = await getCookie("accessToken")
        const decoded: any = jwt.decode(accessToken as string);

        const jsonData = formData.get("data") as string;
        const parsed = JSON.parse(jsonData);

        const payload = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            location: formData.get("location") as string,
            eventDate: new Date(parsed.eventDate).toISOString(),
            startTime: formData.get("startTime") as string,
            endTime: formData.get("endTime") as string,
            ticketPrice: formData.get("ticketPrice"),
            totalSeats: formData.get("totalSeats"),
            availableSeats: formData.get("availableSeats"),
            category: parsed.category,
            status: parsed.status,
            hostId: decoded?.host?.id,
        };



        const newForm = new FormData();

        newForm.append("data", JSON.stringify(payload));

        if (formData?.get("file")) {
            newForm.append("file", formData.get("file") as Blob);
        }

        // console.log("payload:", payload)
        // console.log("decoded:", decoded)

        const res = await serverFetch.post("/event/create-event", {
            body: newForm,
        });

        const result = await res.json();

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