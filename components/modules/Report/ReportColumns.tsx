// components/reports/report-columns.tsx
import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Report } from "@/types/report.interface";

export const ReportColumns: Column<Report>[] = [
  {
    header: "Reporter",
    accessor: (row) => (
      <div className="flex items-center gap-2 min-w-[180px]">
        <Image
          src={row.reporter.image || "/avatar.png"}
          alt={row.reporter.name}
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        <div className="text-sm">
          <p className="font-medium">{row.reporter.name}</p>
          <p className="text-muted-foreground text-xs">
            {row.reporter.email}
          </p>
        </div>
      </div>
    ),
  },
  {
    header: "Reported User",
    accessor: (row) => (
      <div className="min-w-[150px]">
        <p className="font-medium">{row.targetUser.name}</p>
        <p className="text-xs text-muted-foreground">
          Role: {row.targetUser.role}
        </p>
      </div>
    ),
  },
  {
    header: "Event",
    accessor: (row) => (
      <div className="min-w-[200px]">
        <p className="font-medium">{row.targetEvent.name}</p>
        <p className="text-xs text-muted-foreground">
          {row.targetEvent.location}
        </p>
      </div>
    ),
  },
  {
    header: "Reason",
    accessor: (row) => (
      <p className="max-w-[280px] truncate text-sm text-muted-foreground">
        {row.reason}
      </p>
    ),
  },
  {
    header: "Status",
    accessor: (row) => (
      <Badge
        variant={
          row.status === "PENDING"
            ? "secondary"
            : row.status === "RESOLVED"
            ? "default"
            : "destructive"
        }
      >
        {row.status}
      </Badge>
    ),
    sortKey: "status",
  },
  {
    header: "Reported At",
    accessor: (row) =>
      new Date(row.createdAt).toLocaleDateString(),
    sortKey: "createdAt",
  },
];
