import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TextInputComponent from "../types-inputs/text-input-component";
import DateInputComponent from "../types-inputs/date-input-component";
import NumberInputComponent from "../types-inputs/number-input-component";
import RadioInputComponent from "../types-inputs/radio-input-component";
import SelectionInputComponent from "../types-inputs/selection-input-component";
import BasicTypeComponent from "../types-inputs/basic-type-component";
import { DraggableTypeComponents } from "@/types/DraggableTypeComponents";
import { Separator } from "../ui/separator";

interface props {
  draggable: DraggableComponent;
  isCustomizing: boolean;
}

export default function GenericDraggableComponent({
  draggable,
  isCustomizing,
}: props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: draggable.id,
    data: {
      type: "input",
      draggable,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const selectTypeComponent = () => {
    if (draggable && draggable.inputed) {
      switch (draggable.type) {
        case DraggableTypeComponents.TEXT:
          return <TextInputComponent component={draggable} />;
        case DraggableTypeComponents.DATE:
          return <DateInputComponent component={draggable} />;
        case DraggableTypeComponents.NUMBER:
          return <NumberInputComponent component={draggable} />;
        case DraggableTypeComponents.RADIO:
          return <RadioInputComponent component={draggable} />;
        case DraggableTypeComponents.SELECTION:
          return <SelectionInputComponent component={draggable} />;
      }
    }

    return <BasicTypeComponent component={draggable}></BasicTypeComponent>;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`w-full rounded-sm cursor-grab
        ${isDragging ? "opacity-20" : "opacity-100"}
        ${isCustomizing && "border-foreground border-1"}`}
    >
      {selectTypeComponent()}
      {/* <Separator className="my-0.5"></Separator> */}
    </div>
  );
}
