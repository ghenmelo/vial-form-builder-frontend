"use client";

import { DragOverlay } from "@dnd-kit/core";
import { createPortal } from "react-dom";
import GenericDraggableComponent from "./generic-draggable-component";

export default function ({
  dragComponent,
}: {
  dragComponent: DraggableComponent | undefined;
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
              ></GenericDraggableComponent>
            )}
          </DragOverlay>,
          document.body
        )}
    </>
  );
}
