"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormComponent } from "@/types/FormComponent";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  component: FormComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<Record<string, any>>;
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
        {...register(String(component.question))}
        placeholder={component.placeholder}
        type="number"
        id={component.id}
      />

      {errors?.[component.question] && (
        <span className="text-red-500 text-sm">
          {errors[component.question]?.message as string}
        </span>
      )}
    </div>
  );
}
