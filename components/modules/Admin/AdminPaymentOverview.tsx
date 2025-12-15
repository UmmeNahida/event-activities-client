import { TrendingUp, Clock, CheckCircle } from "lucide-react";
import { ChartBarMultiple } from "@/components/shared/BarChart";

// Beautiful Payment Overview UI (React + Tailwind)
// Use inside any page: <PaymentOverview data={data} />
// Where data = { totalRevenue, pendingAmount, successRate }

export default function AdminPaymentOverview({ data }:{data:any}) {
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
      title: "Success Rate",
      value: `${data.avgRating}%`,
      icon: <CheckCircle className="w-6 h-6" />,
      bg: "bg-green-50",
      text: "text-green-700",
    },
  ];

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

        <ChartBarMultiple></ChartBarMultiple>

        {/* Progress Bar Section
        <div className="mt-10 bg-white border rounded-2xl p-6 shadow">
          <h3 className="text-lg font-semibold mb-4">Revenue Progress</h3>

          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all"
              style={{ width: `${data.successRate}%` }}
            ></div>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            Success Rate: <span className="font-semibold">{data.successRate}%</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}