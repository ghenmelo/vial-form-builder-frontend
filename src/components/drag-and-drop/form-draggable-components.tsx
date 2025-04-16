import { SortableContext } from "@dnd-kit/sortable";
import DropComponentArea from "./drop-component-area";
import GenericDraggableComponent from "./generic-draggable-component";
import { ScrollArea } from "../ui/scroll-area";
import { FormComponent } from "@/types/FormComponent";

interface Props {
  components: FormComponent[];
  customizingComponentId: string | undefined;
}

export default function FormDraggableComponents({
  components,
  customizingComponentId,
}: Props) {
  return (
    <ScrollArea className="w-full rounded-md">
      <DropComponentArea>
        <SortableContext items={components}>
          <div className="flex flex-col w-full mt-10">
            {components.map((item) => (
              <div key={item.id} className="mx-10">
                <GenericDraggableComponent
                  draggable={item}
                  isCustomizing={item.id === customizingComponentId}
                ></GenericDraggableComponent>
              </div>
            ))}
          </div>
        </SortableContext>
      </DropComponentArea>
    </ScrollArea>
  );
}
