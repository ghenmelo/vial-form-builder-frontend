"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FormComponent } from "@/types/FormComponent";

interface Props {
  component: FormComponent;
}

export default function RadioInputPreviewComponent({ component }: Props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3 p-6">
      <div className="flex items-center space-x-2">
        <Switch disabled checked={component.answer === "true" || false} />
        <Label htmlFor={component.question}>
          {component.question}
          {component.required && <span className="text-red-500">*</span>}
        </Label>
      </div>
    </div>
  );
}
