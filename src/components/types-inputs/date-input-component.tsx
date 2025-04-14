import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import React, { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface props {
  component: DraggableComponent;
}

export default function NumberInputComponent({ component }: props) {
  const [date, setDate] = useState<Date>();

  return (
    <div className="grid w-full max-w-sm items-center gap-3 p-6">
      <Label htmlFor="text">
        {component.title}
        {component.required && <span className="text-red-500">*</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>{component.placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
