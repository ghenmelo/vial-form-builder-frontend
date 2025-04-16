"use client";

import { FormComponent } from "@/types/FormComponent";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import GenericDraggableComponent from "./generic-draggable-component";
import { ChangeEvent, useState } from "react";

const components: FormComponent[] = [
  {
    id: "1",
    type: "Text",
    inputed: false,
    question: "Text Title",
    required: false,
    placeholder: "Placeholder value",
  },
  {
    id: "2",
    type: "Number",
    inputed: false,
    question: "Number Title",
    required: false,
    placeholder: "Placeholder value",
  },
  {
    id: "3",
    type: "Radio",
    inputed: false,
    question: "Radio Title",
    required: false,
    placeholder: "Placeholder value",
  },
  {
    id: "4",
    type: "Selection",
    inputed: false,
    question: "Selection title",
    required: false,
    placeholder: "Placeholder value",
    options: "",
  },
  {
    id: "5",
    type: "Date",
    inputed: false,
    question: "Date Title",
    required: false,
    placeholder: "Placeholder value",
  },
];

export default function FormComponentsOptions() {
  const [search, setSearch] = useState<string>("");

  const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value);
  };

  const getComponents = () => {
    return components.filter((comp) =>
      comp.type.toLowerCase().includes(search && search.toLowerCase())
    );
  };

  return (
    <div className="m-6">
      <h3 className="scroll-m-20 text-2xl font-medium tracking-tight text-primary">
        Assets
      </h3>
      <Separator className="my-4" />
      <Input
        onChange={handleSearchValue}
        className="rounded-sm"
        placeholder="search..."
      ></Input>
      <div className="mt-6">
        {getComponents().map((item) => (
          <div key={item.id} className="my-4">
            <GenericDraggableComponent
              draggable={item}
              isCustomizing={false}
            ></GenericDraggableComponent>
          </div>
        ))}
      </div>
    </div>
  );
}
