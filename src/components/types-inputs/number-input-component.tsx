import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  component: FormComponent;
  usable?: boolean;
  register?: UseFormRegister<Record<string, any>>;
  errors: FieldErrors<Record<string, any>>;
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

      {register ? (
        <Input
          type="number"
          id={component.question}
          placeholder={component.placeholder}
          {...register(String(component.question))}
        />
      ) : (
        <Input
          value={component.answer || ""}
          disabled
          placeholder={component.placeholder}
          required={component.required}
        />
      )}

      {errors && errors[component.question] && (
        <span className="text-red-500 text-sm">
          {errors[component.question]?.message as string}
        </span>
      )}
    </div>
  );
}
