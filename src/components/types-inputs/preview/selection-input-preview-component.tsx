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
import { FormComponent } from "@/types/FormComponent";

interface Props {
  component: FormComponent;
}

export default function SelectInputPreviewComponent({ component }: Props) {
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

      <Select
        open={false}
        onOpenChange={() => {}}
        disabled
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
    </div>
  );
}
