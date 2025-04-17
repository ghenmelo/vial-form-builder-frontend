import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "../../ui/separator";
import { FormComponent } from "@/types/FormComponent";
import { Button } from "@/components/ui/button";

interface Props {
  component: FormComponent;
  updateComponent: (component: FormComponent) => void;
  removeComponent: (id: string) => void;
}

export default function TextCustomizerInput({
  component,
  updateComponent,
  removeComponent,
}: Props) {
  const handleChange = (
    key: keyof FormComponent,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateComponent({
      ...component,
      [key]: event.target.value,
    });
  };

  const handleChangeChecked = (
    key: keyof FormComponent,
    checkedValue: boolean
  ) => {
    updateComponent({
      ...component,
      [key]: checkedValue,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="scroll-m-20 text-xl font-medium tracking-tight text-primary">
          Customizing Text Component
        </h3>

        <Button
          className="cursor-pointer"
          variant={"destructive"}
          onClick={() => removeComponent(component.id)}
        >
          Remove Component
        </Button>
      </div>

      <Separator className="my-1" />

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <Label htmlFor="text">Title</Label>
          <Input
            title="Title"
            value={component.question}
            onChange={(e) => handleChange("question", e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="text">Placeholder</Label>
          <Input
            title="Placeholder"
            value={component.placeholder}
            onChange={(e) => handleChange("placeholder", e)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={component.required}
            onCheckedChange={(e) => handleChangeChecked("required", e)}
          />
          <Label htmlFor="is-required">Input is Required</Label>
        </div>
      </div>
    </div>
  );
}
