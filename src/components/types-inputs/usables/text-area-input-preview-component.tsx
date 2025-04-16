"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormComponent } from "@/types/FormComponent";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  component: FormComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<Record<string, any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: FieldErrors<Record<string, any>>;
}

export default function TextAreaInputComponent({
  component,
  register,
  errors,
}: Props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-2 p-6">
      <Label htmlFor={component.id}>
        {component.question}
        {component.required && <span className="text-red-500">*</span>}
      </Label>

      <Textarea
        {...register(String(component.id))}
        placeholder={component.placeholder}
        id={component.id}
      />

      {errors?.[component.id] && (
        <span className="text-red-500 text-sm">
          {errors[component.id]?.message as string}
        </span>
      )}
    </div>
  );
}
