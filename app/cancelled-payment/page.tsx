"use client";

export const dynamic = "force-dynamic";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { getDefaultDashboardRoute, UserRole } from "@/lib/auth-utils";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CancelledPayment = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const userInfo = await getUserInfo();

        if (!userInfo?.role) return router.push("/login");
        setUserRole(userInfo!.role);
      } catch {
        setUserRole(null);
      }
    })();
  }, [router]);
  const defaultDashboard = getDefaultDashboardRoute(userRole);
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-xl font-semibold">
            Payment Cancelled
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 text-center">
          <p className="text-sm text-muted-foreground">
            Your payment process was cancelled. No charges were made
            to your account.
          </p>

          <div className="flex flex-col gap-3">
            <Link href="/events">
              <Button className="w-full">Go Back to Events</Button>
            </Link>

            <Link href={defaultDashboard}>
              <Button variant="outline" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            If you faced any issues during payment, please try again
            or contact support.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CancelledPayment;
