

import CreateEventForm from "@/components/modules/host/create-event-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const CreateEventPublic = async () => {

    return (
        <div className="min-h-screen p-5 lg:p-40">
            <div className="flex bg-linear-to-br from-slate-50 via-white to-slate-100">
                <div className="flex-1 overflow-auto p-6">
                    <div className="">
                        <div className="mb-8">
                            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                                Create New Event
                            </h1>
                            <p className="text-slate-600 mt-2 text-lg">
                                Fill in the details below to create your event
                            </p>
                        </div>

                        <Card className="bg-white border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl">Event Details</CardTitle>
                                <CardDescription>
                                    Enter all the information about your event
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CreateEventForm />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEventPublic;