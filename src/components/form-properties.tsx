import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

interface props {
  formProperties: FormProperties;
  setFormProperties: (formProperties: FormProperties) => void;
}

export function FormProperties({ formProperties, setFormProperties }: props) {
  const handleChange = (
    key: keyof FormProperties,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormProperties({
      ...formProperties,
      [key]: event.target.value,
    });
  };

  return (
    <div className="m-6">
      <h3 className="scroll-m-20 text-2xl font-medium tracking-tight text-primary">
        Form properties
      </h3>
      <Separator className="my-4" />

      <div className="flex flex-row w-full gap-10">
        <div className=" flex flex-col items-start w-sm gap-2">
          <Label htmlFor="text">Form Title</Label>
          <Input
            type="text"
            id="text"
            value={formProperties.formTitle}
            onChange={(e) => handleChange("formTitle", e)}
          />
        </div>

        <div className=" flex  flex-col items-start w-sm gap-2">
          <Label htmlFor="text">Form submit button placeholder</Label>
          <Input
            type="text"
            id="text"
            value={formProperties.formSubmitPlaceholder}
            onChange={(e) => handleChange("formSubmitPlaceholder", e)}
          />
        </div>
      </div>
    </div>
  );
}
