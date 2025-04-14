import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

type Droppable = {
  children: ReactNode;
};

export default function DropComponentArea(props: Droppable) {
  const { setNodeRef, isOver } = useDroppable({
    id: "DropArea",
  });

  return (
    <div ref={setNodeRef} className="h-screen">
      {props.children || <p style={{ color: "#ccc" }}>Drop here</p>}
    </div>
  );
}
