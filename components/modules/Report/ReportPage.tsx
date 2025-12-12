import { getAllReports } from "@/services/report/report";
import ReportsTable from "./ReportTable";


export default async function ReportsPage() {
  const reports = await getAllReports();  // SERVER FETCH
 

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4 font-semibold">Admin Reports</h1>
      <ReportsTable reports={reports.data} />
    </div>
  );
}
