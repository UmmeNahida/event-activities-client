"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { Report } from "@/types/report.interface";
import { useRouter } from "next/navigation";
import { ReportColumns } from "./ReportColumns";
import { useState } from "react";
import ReportDetailsModal from "./ReportDetailsModal";

interface Props {
  reports: Report[];
}

export default function ReportsTable({ reports }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return (
    <div className="w-full overflow-x-auto">
      <ManagementTable<Report>
        data={reports}
        columns={ReportColumns}
        getRowKey={(row) => row.id}
        emptyMessage="No reports found."
        onDelete={(row) => console.log("Reject report", row.id)}
        onEdit={(row) => console.log("Resolve report", row.id)}
        onView={(row) => {
          setSelectedReport(row);
          setOpen(true);
        }}
      />

      <ReportDetailsModal
        open={open}
        onOpenChange={setOpen}
        report={selectedReport}
      />
    </div>
  );
}
