import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormComponent } from "@/types/FormComponent";

interface Props {
  component: FormComponent;
  usable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<Record<string, any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: FieldErrors<Record<string, any>>;
}

export default function NumberInputComponent({
  component,
  register,
  errors,
}: Props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3 p-6">
      <Label htmlFor={component.id}>
        {component.question}
        {component.required && <span className="text-red-500">*</span>}
      </Label>

      <Input
        type="number"
        id={component.question}
        placeholder={component.placeholder}
        disabled={!register}
        {...(register ? register(String(component.question)) : {})}
      />

      {errors && errors[component.question] && (
        <span className="text-red-500 text-sm">
          {errors[component.question]?.message as string}
        </span>
      )}
    </div>
  );
}
