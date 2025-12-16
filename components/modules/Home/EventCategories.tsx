import { Card, CardContent } from "@/components/ui/card";
import {
  Music,
  Mountain,
  Gamepad2,
  Users,
  Code2,
  Palette,
  Utensils,
  Dumbbell,
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    icon: Music,
    title: "Music & Concerts",
    desc: "Live concerts, jam sessions and music meetups.",
  },
  {
    icon: Mountain,
    title: "Outdoor & Hiking",
    desc: "Hiking, trekking, camping and adventure trips.",
  },
  {
    icon: Gamepad2,
    title: "Gaming",
    desc: "Online & offline gaming events and tournaments.",
  },
  {
    icon: Users,
    title: "Social Meetups",
    desc: "Coffee chats, hangouts and social gatherings.",
  },
  {
    icon: Code2,
    title: "Tech & Meetups",
    desc: "Tech talks, hackathons and developer meetups.",
  },
  {
    icon: Palette,
    title: "Art & Creativity",
    desc: "Art workshops, painting and creative sessions.",
  },
  {
    icon: Utensils,
    title: "Food & Dining",
    desc: "Group dining, food tours and cooking events.",
  },
  {
    icon: Dumbbell,
    title: "Sports & Fitness",
    desc: "Gym, yoga, football and fitness activities.",
  },
];

export default function EventCategories() {
  return (
    <section className="py-20 bg-background">
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
            Event Categories
          </h2>
          <p className="text-muted-foreground">
            Explore different types of events and activities available on our
            platform.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="h-full rounded-2xl border hover:border-primary/50 hover:shadow-md transition cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
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
