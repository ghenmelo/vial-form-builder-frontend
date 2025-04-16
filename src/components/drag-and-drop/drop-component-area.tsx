import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

type Droppable = {
  children: ReactNode;
};

export default function DropComponentArea(props: Droppable) {
  const { setNodeRef } = useDroppable({
    id: "DropArea",
  });

  return (
    <div ref={setNodeRef} className="2xl:min-h-220 lg:h-180 h-100">
      {props.children || <p style={{ color: "#ccc" }}>Drop here</p>}
    </div>
  );
}
