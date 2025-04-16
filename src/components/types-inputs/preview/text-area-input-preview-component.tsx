"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormComponent } from "@/types/FormComponent";

interface Props {
  component: FormComponent;
}

export default function TextAreaInputPreviewComponent({ component }: Props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-2 p-6">
      <Label htmlFor={component.id}>
        {component.question}
        {component.required && <span className="text-red-500">*</span>}
      </Label>

      <Textarea
        value={component.answer || ""}
        placeholder={component.placeholder}
        disabled
        id={component.id}
        onChange={() => {}}
      />
    </div>
  );
}
