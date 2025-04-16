"use client";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FormComponent } from "@/types/FormComponent";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface Props {
  component: FormComponent;
}

export default function DateInputPreviewComponent({ component }: Props) {
    console.log(component)
  return (
    <div className="grid max-w-sm items-start gap-3 p-6">
      <Label htmlFor={component.question}>
        {component.question}
        {component.required && <span className="text-red-500">*</span>}
      </Label>

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
              format(new Date(component.answer), "PPP")
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
              component.answer ? new Date(component.answer) : new Date()
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
