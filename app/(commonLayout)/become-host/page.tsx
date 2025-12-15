"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { promoteToHost } from "@/services/host/hostApiService";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function BecomeAHost() {
    const facilities = [
        "Full freedom to create and manage your own events",
        "Opportunity to sell event tickets and earn revenue",
        "View participant lists and event reviews",
        "Update event status (Pending, Approved, Completed)",
        "Real-time analytics and performance reports",
        "Edit or delete events anytime",
        "Personal host profile and branding options",
    ];


    const handleToHostRequest = async () => {
        const user = await getUserInfo()
        // console.log("kire re dong koroch:",user)
        if (user && user.email) {
            const res = await promoteToHost(user?.email)
            if(res.success && res.message){
                toast.success(res.message)
            }else{
                toast.error(res.error.message || res.message || "your request is failed")
            }
            console.log(res)
        }else{
            toast.error("please login first before request")
            redirect('/login')
        }

    }
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-28 md:px-12">
            <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left Section - Image */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full"
                >
                    <img
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                        alt="Become a Host"
                        className="w-full h-[300px] md:h-[420px] object-cover rounded-2xl shadow-lg"
                    />
                </motion.div>

                {/* Right Section - Content */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Become a Host
                    </h1>
                    <p className="text-gray-600 mb-6 text-base md:text-lg">
                        Share your skills, ideas, and creativity with others. Become a host on our platform
                        and manage your events easily while reaching a wider audience.
                    </p>

                    <Card className="rounded-2xl shadow-sm">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                Benefits of Becoming a Host
                            </h2>
                            <ul className="space-y-3">
                                {facilities.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <CheckCircle className="text-green-500 mt-1" size={20} />
                                        <span className="text-gray-700 text-sm md:text-base">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <Button onClick={handleToHostRequest} className="rounded-xl px-8 py-5 text-base">
                            Become a Host
                        </Button>
                        <Button variant="outline" className="rounded-xl px-8 py-5 text-base">
                            Learn More
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
