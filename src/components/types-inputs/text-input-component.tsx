import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <Input
        placeholder={component.placeholder}
        disabled={true}
        required={component.required}
        type="text"
        id="text"
      />
    </div>
  );
}
