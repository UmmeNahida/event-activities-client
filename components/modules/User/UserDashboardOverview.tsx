"use client"

import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck, Bookmark, CreditCard, Flag, Layers } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Saved Events",
    value: 12,
    icon: Bookmark,
    description: "Events you bookmarked",
  },
  {
    title: "Joined Events",
    value: 7,
    icon: CalendarCheck,
    description: "Events you have participated in",
  },
  {
    title: "Reports",
    value: 2,
    icon: Flag,
    description: "Reports submitted by you",
  },
  {
    title: "Total Payments",
    value: "$320",
    icon: CreditCard,
    description: "Amount you have paid",
  },
  {
    title: "Total Events (Platform)",
    value: 128,
    icon: Layers,
    description: "Events available on the website",
  },
];

export default function UserDashboardOverview() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    <h2 className="text-3xl font-bold mt-1">{item.value}</h2>
                  </div>
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
