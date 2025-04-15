"use client";

import { DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import GenericDraggableComponent from "./generic-draggable-component";
import { FormComponent } from "@/types/FormComponent";

export default function DragOverlayComponent({
  dragComponent,
}: {
  dragComponent: FormComponent | undefined;
}) {
  return (
    <>
      {typeof window !== "undefined" &&
        createPortal(
          <DragOverlay>
            {dragComponent && (
              <GenericDraggableComponent
                key={dragComponent.id}
                draggable={dragComponent}
                isCustomizing={true}
              ></GenericDraggableComponent>
            )}
          </DragOverlay>,
          document.body
        )}
    </>
  );
}
