"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface props {
  component: FormComponent;
  register?: UseFormRegister<Record<string, any>>;
  errors?: FieldErrors<Record<string, any>>;
}

export default function TextInputComponent({
  component,
  register,
  errors,
}: props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-2 p-6">
      <Label htmlFor="text">
        {component.question}
        {component.required && <span className="text-red-500">*</span>}
      </Label>
      {register ? (
        <Input
          {...register(String(component.question))}
          placeholder={component.placeholder}
          type="text"
          id={component.id}
        />
      ) : (
        <Input
          placeholder={component.placeholder}
          disabled
          type="text"
          value={component.answer || ""}
          id={component.id}
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
