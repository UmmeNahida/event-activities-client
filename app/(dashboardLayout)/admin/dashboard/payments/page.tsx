
import AdminPaymentOverview from "@/components/modules/Admin/AdminPaymentOverview"
import { paymentOverview } from "@/services/event/allEvents"

const AdminPayment = async() => {

  const data = await paymentOverview()
  // console.log("payment data", data)
  return (
    <div>
      <AdminPaymentOverview data={data.data}/>
    </div>
  )
}

export default AdminPayment