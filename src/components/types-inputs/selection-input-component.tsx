import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

interface props {
  component: DraggableComponent;
}

export default function TextInputComponent({ component }: props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-2 p-6">
      <Label htmlFor="text">
        {component.title}
        {component.required && <span className="text-red-500">*</span>}
      </Label>
      <Select disabled={true}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={component.placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup></SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
