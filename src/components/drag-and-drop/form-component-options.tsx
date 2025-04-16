import { FormComponent } from "@/types/FormComponent";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import GenericDraggableComponent from "./generic-draggable-component";

const components: FormComponent[] = [
  {
    id: "1",
    type: "TEXT",
    inputed: false,
    question: "Text Title",
    required: false,
    placeholder: "Placeholder value",
  },
  {
    id: "2",
    type: "NUMBER",
    inputed: false,
    question: "Number Title",
    required: false,
    placeholder: "Placeholder value",
  },
  {
    id: "3",
    type: "RADIO",
    inputed: false,
    question: "Radio Title",
    required: false,
    placeholder: "Placeholder value",
  },
  {
    id: "4",
    type: "SELECTION",
    inputed: false,
    question: "Selection title",
    required: false,
    placeholder: "Placeholder value",
    options: "",
  },
  {
    id: "5",
    type: "DATE",
    inputed: false,
    question: "Date Title",
    required: false,
    placeholder: "Placeholder value",
  },
];

export default function FormComponentsOptions() {
  return (
    <div className="m-6">
      <h3 className="scroll-m-20 text-2xl font-medium tracking-tight text-primary">
        Assets
      </h3>
      <Separator className="my-4" />
      <Input className="rounded-sm" placeholder="search..."></Input>
      <div className="mt-6">
        {components.map((item) => (
          <div key={item.id} className="mb-6">
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
