"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormComponent } from "@/types/FormComponent";

interface Props {
  component: FormComponent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<Record<string, any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: FieldErrors<Record<string, any>>;
}

export default function SelectInputComponent({
  component,
  control,
  errors,
}: Props) {
  const buildOptions = () => {
    if (component.options) {
      return component.options
        .split(";")
        .filter((opt) => !!opt)
        .map((opt) => ({
          value: opt.split(" ").join(),
          label: opt,
        }));
    }
    return [];
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-2 p-6">
      <Label htmlFor={component.id}>
        {component.question}
        {component.required && <span className="text-red-500">*</span>}
      </Label>

      <Controller
        name={String(component.question)}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={component.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {buildOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />

      {errors?.[component.question] && (
        <span className="text-red-500 text-sm">
          {errors[component.question]?.message as string}
        </span>
      )}
    </div>
  );
}
