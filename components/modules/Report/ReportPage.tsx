import { getAllReports } from "@/services/report/report";


export default async function ReportsPage() {
  const reports = await getAllReports();  // SERVER FETCH
  // console.log("reports",reports.data)

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 font-semibold">Admin Reports</h1>
    </div>
  );
}
