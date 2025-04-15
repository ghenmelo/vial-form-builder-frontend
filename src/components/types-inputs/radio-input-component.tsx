"use client";

import { Controller, Control, FieldErrors } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FormComponent } from "@/types/FormComponent";

interface Props {
  component: FormComponent;
  updateComponent?: (component: FormComponent) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<Record<string, any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: FieldErrors<Record<string, any>>;
}

export default function RadioInputComponent({
  component,
  updateComponent,
  control,
  errors,
}: Props) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3 p-6">
      <div className="flex items-center space-x-2">
        {control ? (
          <Controller
            name={String(component.question)}
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value ?? false}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  updateComponent &&
                    updateComponent({
                      ...component,
                      answer: String(checked),
                    });
                }}
              />
            )}
          />
        ) : (
          <Switch checked={component.answer === "true" || false} />
        )}
        <Label htmlFor={component.question}>
          {component.question}
          {component.required && <span className="text-red-500">*</span>}
        </Label>
      </div>

      {errors && errors[component.question] && (
        <span className="text-red-500 text-sm">
          {errors[component.question]?.message as string}
        </span>
      )}
    </div>
  );
}
