import React from "react";
import { TrendingUp, Clock, CheckCircle } from "lucide-react";
import { ChartBarMultiple } from "@/components/shared/BarChart";
import { transformMonthlyEarnings } from "./TransformMonthlyEarnings";

// Beautiful Payment Overview UI (React + Tailwind)
// Use inside any page: <PaymentOverview data={data} />
// Where data = { totalRevenue, pendingAmount, successRate }

export default function HostPaymentOverview({ data }:{data:any}) {
  const cards = [
    {
      title: "Total Revenue",
      value: `$${data.totalEarnings}`,
      icon: <TrendingUp className="w-6 h-6" />,
      bg: "bg-indigo-50",
      text: "text-indigo-700",
    },
    {
      title: "Pending Amount",
      value: `$${data.pending}`,
      icon: <Clock className="w-6 h-6" />,
      bg: "bg-yellow-50",
      text: "text-yellow-700",
    },
    {
      title: "User Average Rating",
      value: `${data.avgRating}%`,
      icon: <CheckCircle className="w-6 h-6" />,
      bg: "bg-green-50",
      text: "text-green-700",
    },
  ];

  const monthlyData = transformMonthlyEarnings(data?.monthlyEarnings)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-6">Payment Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl shadow bg-white border hover:shadow-lg transition`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.bg} ${card.text}`}>
                {card.icon}
              </div>

              <div className="text-sm text-gray-500">{card.title}</div>
              <div className="text-3xl font-bold mt-1">{card.value}</div>
            </div>
          ))}
        </div>

        <ChartBarMultiple data={monthlyData}></ChartBarMultiple>

      </div>
    </div>
  );
}