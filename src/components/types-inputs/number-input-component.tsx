import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface props {
  component: DraggableComponent;
}

export default function NumberInputComponent({ component }: props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3 p-6">
      <Label htmlFor="number">
        {component.title}
        {component.required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        placeholder={component.placeholder}
        disabled={true}
        required={component.required}
        type="number"
        id="number"
      />
    </div>
  );
}
