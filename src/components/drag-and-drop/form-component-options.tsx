import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import GenericDraggableComponent from "./generic-draggable-component";

const components: DraggableComponent[] = [
  {
    id: "1",
    type: "text",
    inputed: false,
    title: "Text Title",
    required: false,
    placeholder: "Placeholder value",
  },
  {
    id: "2",
    type: "number",
    inputed: false,
    title: "Number Title",
    required: false,
    placeholder: "Placeholder value",
  },
  {
    id: "3",
    type: "radio",
    inputed: false,
    title: "Radio Title",
    required: false,
    placeholder: "Placeholder value",
  },
  {
    id: "4",
    type: "selection",
    inputed: false,
    title: "Selection title",
    required: false,
    placeholder: "Placeholder value",
  },
  {
    id: "5",
    type: "date",
    inputed: false,
    title: "Date Title",
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
