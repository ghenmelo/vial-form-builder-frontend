import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "../../ui/separator";
import { FormComponent } from "@/types/FormComponent";
import { Button } from "@/components/ui/button";

interface Props {
  component: FormComponent;
  updateComponent: (component: FormComponent) => void;
  removeComponent: (id: string) => void;
}

export default function RadioCustomizerInput({
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="scroll-m-20 text-2xl font-medium tracking-tight text-primary">
          Customizing Radio Component
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
      </div>
    </div>
  );
}
