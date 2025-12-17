import { serverFetch } from "@/lib/server-fetch";
import { toast } from "sonner";


interface addReviewPayload {
  eventId: string,
  rating: number;
  comment: string
}

export async function addReview(payload: addReviewPayload) {
  let data = []
  try {
    const res = await serverFetch.post(`/participants/add-review`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    })

    const result = await res.json();
    if (!result.success && result.message) {
      throw new Error(result.message)
    }
    data = result.data;
  } catch (err) {
    toast.error((err as Error).message)

  }finally{
    return data;
  }
}


export async function joinedEvent(id:string) {
  let data;
  try {
    const res = await serverFetch.post(`/participants/joint-event/${id}`, {
      headers: {
        "Content-Type": "application/json",
      }
    })

    const result = await res.json();
    if (!result.success && result.message) {
        throw new Error(result.message)
    }

    if(result.success && result.message){
      toast.success(result.message)
    }
     data = result;
  } catch (err) {
    toast.error((err as Error).message)
  }finally{
    return data
  }
}