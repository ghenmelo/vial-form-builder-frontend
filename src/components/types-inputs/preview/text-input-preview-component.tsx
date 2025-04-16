"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormComponent } from "@/types/FormComponent";

interface Props {
  component: FormComponent;
}

export default function TextInputPreviewComponent({ component }: Props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-2 p-6">
      <Label htmlFor={component.id}>
        {component.question}
        {component.required && <span className="text-red-500">*</span>}
      </Label>

      <Input
        value={component.answer || ""}
        placeholder={component.placeholder}
        type="text"
        disabled
        id={component.id}
        onChange={() => {}}
      />
    </div>
  );
}
