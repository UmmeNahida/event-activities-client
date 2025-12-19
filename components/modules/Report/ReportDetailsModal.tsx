// components/reports/ReportDetailsModal.tsx
"use client";

import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Report, ReportAction } from "@/types/report.interface";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReportActionModal from "./ReportActionModal";
import { reportAction } from "@/services/report/report";
import { toast } from "sonner";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    report: Report | null;
}

export default function ReportDetailsModal({
    open,
    onOpenChange,
    report,
}: Props) {
    if (!report) return null;

    const [actionOpen, setActionOpen] = useState(false);
    const [action, setAction] = useState<ReportAction | null>(null);

    const handleOnConfirm = async () => {
        if(action && report.id){
            const res = await reportAction(report.id, action)
            if(!res.success){
                toast.error(res.message || `${action} has been failed`)
            }

            toast.success(res.message || `${action} has been successfull`)
        }
        setActionOpen(false);
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl">
                            Report Details
                        </DialogTitle>
                    </DialogHeader>

                    {/* Status */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Report ID: {report.id}
                        </p>
                        <Badge
                            variant={
                                report.status === "PENDING"
                                    ? "secondary"
                                    : report.status === "RESOLVED"
                                        ? "default"
                                        : "destructive"
                            }
                        >
                            {report.status}
                        </Badge>
                    </div>

                    {/* Reporter & Target User */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {/* Reporter */}
                        <div className="rounded-lg border p-4">
                            <p className="font-semibold mb-3">Reporter</p>
                            <div className="flex items-center gap-3">
                                <Image
                                    src={report.reporter.image || "/avatar.png"}
                                    alt={report.reporter.name}
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-medium">{report.reporter.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {report.reporter.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Target User */}
                        <div className="rounded-lg border p-4">
                            <p className="font-semibold mb-3">Reported User</p>
                            <div className="flex items-center gap-3">
                                <Image
                                    src={report.targetUser.image || "/avatar.png"}
                                    alt={report.targetUser.name}
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-medium">{report.targetUser.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Role: {report.targetUser.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Event Info */}
                    <div className="rounded-lg border p-4 mt-4">
                        <p className="font-semibold mb-2">Related Event</p>
                        <div className="space-y-1 text-sm">
                            <p>
                                <span className="font-medium">Name:</span>{" "}
                                {report.targetEvent.name}
                            </p>
                            <p>
                                <span className="font-medium">Location:</span>{" "}
                                {report.targetEvent.location}
                            </p>
                            <p>
                                <span className="font-medium">Date:</span>{" "}
                                {new Date(report.targetEvent.date).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Reason */}
                    <div className="rounded-lg border p-4 mt-4">
                        <p className="font-semibold mb-2">Report Reason</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {report.reason}
                        </p>
                    </div>

                    {/* admin actions */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-6">
                        <Button
                            variant="destructive"
                            className=""
                            onClick={() => {
                                setAction("SUSPEND_USER");
                                setActionOpen(true);
                            }}
                        >
                            Suspend Host
                        </Button>

                        <Button
                            variant="outline"
                            className=" border-destructive text-destructive"
                            onClick={() => {
                                setAction("REMOVE_EVENT");
                                setActionOpen(true);
                            }}
                        >
                            Remove Event
                        </Button>
                    </div>


                    {/* Footer */}
                    <div className="text-xs text-muted-foreground mt-4 text-right">
                        {new Date(report.createdAt).toLocaleString()}
                    </div>
                </DialogContent>
            </Dialog>


            <ReportActionModal
                open={actionOpen}
                onOpenChange={setActionOpen}
                action={action}
                report={report}
                onConfirm={() => handleOnConfirm()}
            />
        </div>
    );
}
