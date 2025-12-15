import HostAnalytics from "@/components/modules/host/HostAnalytics"
import { getHostAnalytics } from "@/services/host/hostApiService"


const HostDashboard = async() => {
  const hostAnalytics = await getHostAnalytics()
  // console.log(hostAnalytics)
  return (
    <div>
      <HostAnalytics analyticsData={hostAnalytics}></HostAnalytics>
    </div>
  )
}

export default HostDashboard