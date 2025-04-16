import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TextInputComponent from "../types-inputs/usables/text-input-component";
import DateInputComponent from "../types-inputs/usables/date-input-component";
import NumberInputComponent from "../types-inputs/usables/number-input-component";
import RadioInputComponent from "../types-inputs/usables/radio-input-component";
import SelectionInputComponent from "../types-inputs/usables/selection-input-component";
import BasicTypeComponent from "../types-inputs/basic-type-component";
import { FormComponentTypeComponents } from "@/types/FormTypeComponents";
import { FormComponent } from "@/types/FormComponent";
import TextInputPreviewComponent from "../types-inputs/preview/text-input-preview-component";
import NumberInputPreviewComponent from "../types-inputs/preview/number-input-preview-componen";
import DateInputPreviewComponent from "../types-inputs/preview/date-input-preview-component";
import RadioInputPreviewComponent from "../types-inputs/preview/radio-input-preview-component";
import SelectInputPreviewComponent from "../types-inputs/preview/selection-input-preview-component";

interface props {
  draggable: FormComponent;
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
        case FormComponentTypeComponents.TEXT:
          return <TextInputPreviewComponent component={draggable} />;
        case FormComponentTypeComponents.DATE:
          return <DateInputPreviewComponent component={draggable} />;
        case FormComponentTypeComponents.NUMBER:
          return <NumberInputPreviewComponent component={draggable} />;
        case FormComponentTypeComponents.RADIO:
          return <RadioInputPreviewComponent component={draggable} />;
        case FormComponentTypeComponents.SELECTION:
          return <SelectInputPreviewComponent component={draggable} />;
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
        hover:border-1 hover:border-sidebar-primary
        ${isDragging ? "opacity-25" : "opacity-100"}
        ${isCustomizing && "border-foreground border-1"}`}
    >
      {selectTypeComponent()}
      {/* <Separator className="my-0.5"></Separator> */}
    </div>
  );
}
