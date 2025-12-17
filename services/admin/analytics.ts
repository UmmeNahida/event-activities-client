import { serverFetch } from "@/lib/server-fetch";

export const analyticsData = async () => {
  const res = await serverFetch.get("/admin/analytics")

  const result = await res.json()
  return result
}





