"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  pointerWithin,
} from "@dnd-kit/core";
import FormComponentsOptions from "./form-component-options";
import FormComponents from "./form-components";
import DragOverlayComponent from "./drag-overlay-component";
import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { FormComponentCustomizer } from "../form-component-customizer";
import { FormProperties } from "../form-properties";
import { Button } from "../ui/button";

export default function FormComponentBuilder() {
  const [insertingForm, setInsertingForm] = useState<DraggableComponent>();

  const [formSelectedComponents, setFormSelectedComponents] = useState<
    DraggableComponent[]
  >([]);
  const [formProperties, setFormProperties] = useState<FormProperties>({
    formSubmitPlaceholder: "Submit",
    formTitle: "Form Builder",
  });

  const [activeDraggableInput, setActiveDraggableInput] =
    useState<DraggableComponent>();

  const [customizingComponent, setCustomizingComponent] =
    useState<DraggableComponent>();

  const findIndex = (id: string) =>
    formSelectedComponents.findIndex((item) => item.id === id);

  const updateComponent = (customizingComponent: DraggableComponent) => {
    setFormSelectedComponents((prev) =>
      prev.map((item) =>
        item.id === customizingComponent?.id ? customizingComponent : item
      )
    );
    setCustomizingComponent(customizingComponent);
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event?.active?.data?.current?.type === "input") {
      setActiveDraggableInput(event?.active?.data?.current?.draggable);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    const isOverInserted = over?.data?.current?.draggable?.inputed;
    const isOverDropArea = over?.id === "DropArea";

    if (!isOverInserted && !isOverDropArea) {
      const newFormList = [...formSelectedComponents];
      setFormSelectedComponents(
        newFormList.filter(
          (item) => item.id !== insertingForm?.id && item.id !== active.id
        )
      );

      if (customizingComponent && customizingComponent.id === active.id) {
        setCustomizingComponent(undefined);
      }
      return;
    }

    if (active?.id === over?.id && active?.data?.current?.draggable?.inputed) {
      const component = formSelectedComponents.find(
        (item) => item.id === active.id
      );
      setCustomizingComponent(component);
      return;
    }

    if (isOverInserted || isOverDropArea) {
      const component = formSelectedComponents.find(
        (item) => item.id === insertingForm?.id
      );
      setCustomizingComponent(component);
    }

    setInsertingForm(undefined);
  };

  const onDragOver = (event: DragOverEvent) => {
    console.log("entrou");
    const { active, over } = event;

    const creatingFormComponent = !active?.data?.current?.draggable?.inputed;
    const isOverInserted = over?.data?.current?.draggable?.inputed;
    const isOverDropArea = over?.id === "DropArea";

    const activeId = String(active?.id);
    const overId = String(over?.id);

    if (creatingFormComponent) {
      const uuid = self.crypto.randomUUID();

      const newForm = {
        ...active?.data?.current?.draggable,
        id: uuid,
        inputed: true,
      };

      if (isOverDropArea) {
        if (!insertingForm) {
          setFormSelectedComponents([...formSelectedComponents, newForm]);
          setInsertingForm(newForm);
        } else {
          const from = findIndex(insertingForm.id);
          const to = formSelectedComponents.length;
          setFormSelectedComponents(
            arrayMove(formSelectedComponents, from, to)
          );
        }
      }

      if (isOverInserted) {
        if (!insertingForm) {
          const to = findIndex(overId);
          const updated = [...formSelectedComponents, newForm];
          const moved = arrayMove(updated, updated.length - 1, to);
          setFormSelectedComponents(moved);
          setInsertingForm(newForm);
        } else {
          const from = findIndex(insertingForm.id);
          const to = findIndex(overId);
          setFormSelectedComponents(
            arrayMove(formSelectedComponents, from, to)
          );
        }
      }
    } else {
      console.log("aqui");
      const from = findIndex(activeId);
      const to = findIndex(overId);
      setFormSelectedComponents(arrayMove(formSelectedComponents, from, to));
    }
  };

  return (
    <div className="flex gap-30 w-full h-full">
      <DndContext
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className="w-full h-full bg-primary-foreground rounded-sm flex flex-col gap-4">
          <FormProperties
            formProperties={formProperties}
            setFormProperties={setFormProperties}
          />
          <FormComponentsOptions />
        </div>

        <div className=" h-full w-full">
          <div className="w-full h-full max-h-full bg-primary-foreground rounded-sm pr-4">
            <div className="pt-6 px-6 w-full">
              <h3 className="scroll-m-20 text-2xl font-medium tracking-tight text-primary">
                {formProperties.formTitle}
              </h3>
            </div>
            <FormComponents
              customizingComponentId={customizingComponent?.id}
              components={formSelectedComponents}
            />
            <div className="px-6 w-full flex justify-end">
              <Button className="w-36">
                {formProperties.formSubmitPlaceholder}
              </Button>
            </div>
          </div>
        </div>

        <DragOverlayComponent dragComponent={activeDraggableInput} />
      </DndContext>

      {customizingComponent && (
        <FormComponentCustomizer
          component={customizingComponent}
          updateComponent={updateComponent}
        />
      )}
    </div>
  );
}
