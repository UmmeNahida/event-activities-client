"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import RefreshButton from "@/components/shared/RefreshButton";
import { transformMonthlyEarnings } from "./TransformMonthlyEarnings";

type AnalyticsResponse = {
success:boolean;
 message:string;
 data:{
  upcoming: number;
  totalEvents: number;
  totalParticipants: number;
  avgRating: number;
  totalReports: number;
  revenue:number,
  monthlyEarnings?: Array<{ createdAt: string; _count: { id: number } }>;
 }
};

export default function HostAnalytics({analyticsData}:{analyticsData:AnalyticsResponse}) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!analyticsData.success) throw new Error("Failed to fetch analytics");
      setData(analyticsData?.data);
      
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // prepare charts data
//   const monthlyData = (data?.monthlyEarnings || [])
//     .map((m:any) => ({
//       name: new Date(m.createdAt).toLocaleString("default", { month: "short", year: "numeric" }),
//       users: (m as any)._count?.id || (m as any)._count || 0,
//     }))
//     .slice(-12);

const monthlyData = transformMonthlyEarnings(data?.monthlyEarnings)

  const pieData = [
    { name: "Upcoming Events", value: data?.upcoming || 0 },
    { name: "Total Events", value: data?.totalEvents || 0 },
  ];

  const COLORS = ["#4F46E5", "#06B6D4", "#F59E0B", "#EF4444"];

  return (
    <div className="p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Host Analytics</h1>
          <p className="text-sm text-muted-foreground">Overview of platform activity & revenue</p>
        </div>
        <div className="flex items-center gap-2">
          <RefreshButton/>
        </div>
      </div>

      {error && (
        <div className="mb-4 text-sm text-destructive">Error: {error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="col-span-1 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-sm">Upcoming Events</CardTitle>
            <CardDescription className="text-2xl font-bold">{loading ? "..." : data?.upcoming ?? 0}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-muted-foreground">Total Upcoming Events</CardContent>
        </Card>

        <Card className="bg-cyan-200">
          <CardHeader>
            <CardTitle className="text-sm">Participants</CardTitle>
            <CardDescription className="text-2xl font-bold">{loading ? "..." : data?.totalParticipants ?? 0}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-muted-foreground">Total Participant Users</CardContent>
        </Card>

        <Card className="bg-cyan-50">
          <CardHeader>
            <CardTitle className="text-sm">Events</CardTitle>
            <CardDescription className="text-2xl font-bold">{loading ? "..." : data?.totalEvents ?? 0}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-muted-foreground">Total events on platform</CardContent>
        </Card>
        
         <Card className="bg-red-200">
          <CardHeader>
            <CardTitle className="text-sm">Pending Reports</CardTitle>
            <CardDescription className="text-2xl font-bold">{loading ? "..." : data?.totalReports ?? 0}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0 text-sm text-muted-foreground">Reports awaiting review</CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="h-96">
          <CardHeader>
            <CardTitle>Monthly Earnings Overview</CardTitle>
            <CardDescription>Last 12 months</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 h-[380px]">
            {monthlyData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                No monthly data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="h-96">
          <CardHeader>
            <CardTitle>Events Status Breakdown</CardTitle>
            <CardDescription>Active vs Completed</CardDescription>
          </CardHeader>
          <CardContent className=" h-[200px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={120}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
