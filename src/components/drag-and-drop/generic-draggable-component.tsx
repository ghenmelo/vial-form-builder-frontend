import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import BasicTypeComponent from "../types-inputs/basic-type-component";
import { FormComponentType } from "@/types/FormTypeComponents";
import { FormComponent } from "@/types/FormComponent";
import TextInputPreviewComponent from "../types-inputs/preview/text-input-preview-component";
import NumberInputPreviewComponent from "../types-inputs/preview/number-input-preview-componen";
import DateInputPreviewComponent from "../types-inputs/preview/date-input-preview-component";
import RadioInputPreviewComponent from "../types-inputs/preview/radio-input-preview-component";
import SelectInputPreviewComponent from "../types-inputs/preview/selection-input-preview-component";
import TextAreaInputPreviewComponent from "../types-inputs/preview/text-area-input-preview-component";

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
        case FormComponentType.TEXT:
          return <TextInputPreviewComponent component={draggable} />;
        case FormComponentType.DATE:
          return <DateInputPreviewComponent component={draggable} />;
        case FormComponentType.NUMBER:
          return <NumberInputPreviewComponent component={draggable} />;
        case FormComponentType.RADIO:
          return <RadioInputPreviewComponent component={draggable} />;
        case FormComponentType.SELECTION:
          return <SelectInputPreviewComponent component={draggable} />;
        case FormComponentType.TEXT_AREA:
          return <TextAreaInputPreviewComponent component={draggable} />;
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
