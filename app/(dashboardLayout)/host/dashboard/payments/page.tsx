import HostPaymentOverview from '@/components/modules/host/HostPaymentOverview'
import { getHostPaymentOverview } from '@/services/host/hostApiService'

const HostPayment = async() => {

  const data = await getHostPaymentOverview()
  return (
    <div>
      <HostPaymentOverview data={data.data}/>
    </div>
  )
}

export default HostPayment;