"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface props {
  component: FormComponent;
  control?: Control<Record<string, any>>;
  errors?: FieldErrors<Record<string, any>>;
}

export default function TextInputComponent({
  component,
  control,
  errors,
}: props) {
  const buildOptions = () => {
    if (component.options) {
      const options = component.options.split(";");
      return options
        .filter((opt) => !!opt)
        .map((opt) => {
          return {
            value: opt.split(" ").join(),
            label: opt,
          };
        });
    }
    return [];
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-2 p-6">
      <Label htmlFor="text">
        {component.question}
        {component.required && <span className="text-red-500">*</span>}
      </Label>

      {control ? (
        <Controller
          name={String(component.question)}
          control={control}
          defaultValue={""}
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
      ) : (
        <Select
          open={false}
          onOpenChange={() => {}}
          disabled={false}
          value={component.answer}
        >
          <SelectTrigger
            className="w-[180px] pointer-events-none opacity-50 select-none"
            style={{ cursor: "default" }}
          >
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

      {errors && errors[component.question] && (
        <span className="text-red-500 text-sm">
          {errors[component.question]?.message as string}
        </span>
      )}
    </div>
  );
}
