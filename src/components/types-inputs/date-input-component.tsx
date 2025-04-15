"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface Props {
  component: FormComponent;
  updateComponent: (form: FormComponent) => void;
  control?: Control<Record<string, any>>;
  errors: FieldErrors<Record<string, any>>;
}

export default function DateInputComponent({
  component,
  updateComponent,
  control,
  errors,
}: Props) {
  return (
    <div className="grid max-w-sm items-start gap-3 p-6">
      <Label htmlFor={component.question}>
        {component.question}
        {component.required && <span className="text-red-500">*</span>}
      </Label>

      {control ? (
        <Controller
          name={String(component.question)}
          control={control}
          render={({ field }) => {
            const selectedDate = field.value
              ? new Date(field.value)
              : undefined;

            return (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>{component.placeholder}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      field.onChange(date);
                      updateComponent({
                        ...component,
                        answer: date ? String(date) : "",
                      });
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            );
          }}
        />
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              disabled
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !component.answer && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {component.answer ? (
                format(component.answer, "PPP")
              ) : (
                <span>{component.placeholder}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              disabled
              mode="single"
              selected={
                (component.answer && new Date(component.answer)) || new Date()
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}

      {errors && errors[component.question] && (
        <span className="text-red-500 text-sm">
          {errors[component.question]?.message as string}
        </span>
      )}
    </div>
  );
}
