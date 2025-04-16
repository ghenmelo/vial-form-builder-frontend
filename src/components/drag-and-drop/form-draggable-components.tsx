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
  console.log(components);
  return (
    <ScrollArea className="w-full rounded-md">
      <DropComponentArea>
        <SortableContext items={components}>
          <div className="flex flex-col w-full mt-10 pb-12">
            {components.map((item) => (
              <div key={item.id} className="mx-10 break-all">
                <GenericDraggableComponent
                  draggable={item}
                  isCustomizing={item && item?.id === customizingComponentId}
                ></GenericDraggableComponent>
              </div>
            ))}
          </div>
        </SortableContext>
      </DropComponentArea>
    </ScrollArea>
  );
}
