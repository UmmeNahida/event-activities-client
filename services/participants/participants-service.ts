import { serverFetch } from "@/lib/server-fetch";
import { redirect } from "next/navigation";
import { toast } from "sonner";


interface addReviewPayload {
    eventId:string,
    rating:number;
    comment:string
}

export async function addReview(payload: addReviewPayload) {

  const res = await serverFetch.post(`/participants/add-review`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload)
  })

  const data = await res.json();
  console.log("datadddd",data)
  if(!data.success && data.message ==="you don't have a token!"){
    toast.error("please login first before add review")
    redirect("/login")
  }
  return data.data || [];
}