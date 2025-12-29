import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EventStatus } from "@/types/passed-event.interface";

interface StatusSelectProps {
  value: EventStatus;
  onChange: (value: EventStatus) => void;
}

const StatusSelect = ({ value, onChange }: StatusSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-35">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="OPEN">OPEN</SelectItem>
        <SelectItem value="COMPLETED">COMPLETED</SelectItem>
        <SelectItem value="CANCELLED">CANCELLED</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusSelect;
