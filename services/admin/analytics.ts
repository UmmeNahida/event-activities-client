/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export const analyticsData = async () => {
  const res = await serverFetch.get("/admin/analytics")

  const result = await res.json()
  return result
}


export async function getAdminPaymentOverview() {
    try {
        const response = await serverFetch.get(`/admin/payment-overview`);

        const result = await response.json();
        return result;
    } catch (error: any) {
       
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}





