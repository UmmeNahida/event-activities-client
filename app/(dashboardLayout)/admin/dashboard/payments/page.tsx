
import AdminPaymentOverview from "@/components/modules/Admin/AdminPaymentOverview"
import { getAdminPaymentOverview } from "@/services/admin/analytics"


const AdminPayment = async() => {

  const data = await getAdminPaymentOverview()

  return (
    <div>
      <AdminPaymentOverview data={data.data}/>
    </div>
  )
}

export default AdminPayment