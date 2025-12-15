// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import React from "react";
// import { toast } from "sonner";
// import { updateMyEvents } from "./hostApiService";

// export type EventStatus = "OPEN" | "CLOSED" | "CANCELLED";

// export type UpdateEventInput = {
//     name: string;
//     category: string;
//     description: string;
//     location: string;
//     date: string;
//     time: string;
//     minParticipants: number;
//     maxParticipants: number;
//     fee: number;
//     status: string | EventStatus;
// };

// type UpdateEventFormProps = {
//     defaultValues: UpdateEventInput;
//     onSubmit: (data: UpdateEventInput) => void;
// };

// export function UpdateEventForm({ defaultValues, onSubmit }: UpdateEventFormProps) {
//     const [form, setForm] = React.useState<UpdateEventInput>(defaultValues);

//     const handleChange = (key: keyof UpdateEventInput, value: any) => {
//         setForm((prev) => ({ ...prev, [key]: value }));
//     };

//     const handleSubmit = async(e:any) => {
//                 e.preventDefault();
//                 onSubmit(form);
//                 console.log("setForm--:", form)
//                 updateMyEvents(form)


//                 toast.success("events updated successfully")

//             }

//     return (
//         <form
//             onSubmit={(e)=>handleSubmit(e)}
//             className="space-y-4"
//         >
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                     <Label>Event Name</Label>
//                     <Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
//                 </div>

//                 <div>
//                     <Label>Category</Label>
//                     <Select value={form.category} onValueChange={(v) => handleChange("category", v)}>
//                         <SelectTrigger>
//                             <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="music">Music</SelectItem>
//                             <SelectItem value="sports">Sports</SelectItem>
//                             <SelectItem value="tech">Tech</SelectItem>
//                             <SelectItem value="workshop">Workshop</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 <div>
//                     <Label>Date</Label>
//                     <Input type="date" value={form.date.split("T")[0]} onChange={(e) => handleChange("date", e.target.value)} />
//                 </div>

//                 <div>
//                     <Label>Time</Label>
//                     <Input type="time" value={form.time} onChange={(e) => handleChange("time", e.target.value)} />
//                 </div>

//                 <div>
//                     <Label>Min Participants</Label>
//                     <Input type="number" value={form.minParticipants} onChange={(e) => handleChange("minParticipants", Number(e.target.value))} />
//                 </div>

//                 <div>
//                     <Label>Max Participants</Label>
//                     <Input type="number" value={form.maxParticipants} onChange={(e) => handleChange("maxParticipants", Number(e.target.value))} />
//                 </div>

//                 <div>
//                     <Label>Fee</Label>
//                     <Input type="number" value={form.fee} onChange={(e) => handleChange("fee", Number(e.target.value))} />
//                 </div>

//                 <div>
//                     <Label>Status</Label>
//                     <Select value={form.status} onValueChange={(v: EventStatus) => handleChange("status", v)}>
//                         <SelectTrigger>
//                             <SelectValue placeholder="Select status" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="OPEN">Open</SelectItem>
//                             <SelectItem value="CLOSED">Closed</SelectItem>
//                             <SelectItem value="CANCELLED">Cancelled</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>
//             </div>

//             <div>
//                 <Label>Description</Label>
//                 <Textarea value={form.description} onChange={(e) => handleChange("description", e.target.value)} />
//             </div>

//             <Button type="submit" className="w-full">
//                 Update Event
//             </Button>
//         </form>
//     );
// }
