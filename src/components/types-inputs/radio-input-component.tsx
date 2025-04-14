import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface props {
  component: DraggableComponent;
}

interface props {
  component: DraggableComponent;
}

export default function NumberInputComponent({ component }: props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3 p-6">
      <div className="flex items-center space-x-2">
        <Switch checked={component.required} />
        <Label htmlFor="is-required">{component.title}</Label>
      </div>
    </div>
  );
}
