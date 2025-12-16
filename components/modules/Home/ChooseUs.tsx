"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Users, CalendarCheck, ShieldCheck, MapPin, Star, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Users,
    title: "Find Like‑Minded People",
    desc: "Connect with people who share your interests so you never have to attend events alone.",
  },
  {
    icon: CalendarCheck,
    title: "Create & Join Events Easily",
    desc: "Create events or join existing ones in just a few clicks with a smooth user experience.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Role‑Based Access",
    desc: "JWT authentication, role‑based permissions and secure data handling you can trust.",
  },
  {
    icon: MapPin,
    title: "Location‑Based Discovery",
    desc: "Discover nearby events filtered by location, date and activity type.",
  },
  {
    icon: Star,
    title: "Trusted Reviews & Ratings",
    desc: "Transparent reviews and ratings help you choose the best hosts and events.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    desc: "Integrated payment gateways ensure safe and hassle‑free transactions.",
  },
];

export default function ChooseUs() {
  return (
    <section className="py-20 bg-chart-4/40">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-muted-foreground">
            We bridge the gap between online discovery and real‑world experiences,
            helping you build meaningful connections through events and activities.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full rounded-2xl shadow-sm hover:shadow-md transition">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
