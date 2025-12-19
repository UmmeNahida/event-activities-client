// types/report.interface.ts

export interface Report {
  id: string;
  reason: string;
  status: "PENDING" | "RESOLVED" | "REJECTED";
  createdAt: string;

  reporter: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };

  targetUser: {
    id: string;
    name: string;
    role: string;
    image?: string;
  };

  targetEvent: {
    id: string;
    name: string;
    location: string;
    date: string;
  };
}


// types/report-action.type.ts
export type ReportAction = "SUSPEND_USER" | "REMOVE_EVENT";
