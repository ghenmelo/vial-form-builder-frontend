"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import FormComponentsOptions from "./form-component-options";
import FormDraggableComponents from "./form-draggable-components";
import DragOverlayComponent from "./drag-overlay-component";
import { useId, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import { FormComponentCustomizer } from "../form-component-customizer";
import { FormComponent, FormProperties } from "@/types/FormComponent";
import { FormPropertiesComponent } from "../form-properties-component";
import ErrorBoundary from "../error-bondary";
import { Separator } from "../ui/separator";

export default function FormComponentBuilder() {
  const id = useId();
  const [insertingForm, setInsertingForm] = useState<FormComponent>();

  const [formSelectedComponents, setFormSelectedComponents] = useState<
    FormComponent[]
  >([]);
  const [formProperties, setFormProperties] = useState<FormProperties>({
    formTitle: "Form Builder",
  });

  const [activeDraggableInput, setActiveDraggableInput] =
    useState<FormComponent>();

  const [customizingComponent, setCustomizingComponent] =
    useState<FormComponent>();

  const findIndex = (id: string) =>
    formSelectedComponents.findIndex((item) => item?.id === id);

  const updateComponent = (customizingComponent: FormComponent) => {
    setFormSelectedComponents((prev) =>
      prev.map((item) =>
        item.id === customizingComponent?.id ? customizingComponent : item
      )
    );
    setCustomizingComponent(customizingComponent);
  };

  const removeComponent = (id: string) => {
    setFormSelectedComponents((prev) => prev.filter((item) => item.id !== id));
    setCustomizingComponent(undefined);
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
        (item) => item.id === insertingForm?.id || item.id === active.id
      );

      setCustomizingComponent(component);
    }

    setInsertingForm(undefined);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    const creatingFormComponent = !active?.data?.current?.draggable?.inputed;
    const isOverInserted = over?.data?.current?.draggable?.inputed;
    const isOverDropArea = over?.id === "DropArea";

    const activeId = String(active?.id);
    const overId = String(over?.id);

    if (creatingFormComponent) {
      const uniqueId = String(Date.now());

      const newForm = {
        ...active?.data?.current?.draggable,
        id: uniqueId,
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
    } else if (insertingForm?.id !== over?.id) {
      const from = findIndex(activeId);
      const to = findIndex(overId);
      setFormSelectedComponents(arrayMove(formSelectedComponents, from, to));
    }
  };

  return (
    <div className="flex gap-15 w-full">
      <ErrorBoundary>
        <DndContext
          id={id}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        >
          <div className="w-[33%] bg-primary-foreground rounded-sm flex flex-col gap-4">
            <FormPropertiesComponent
              formProperties={formProperties}
              setFormProperties={setFormProperties}
              formSelectedComponents={formSelectedComponents}
            />
            <FormComponentsOptions />
          </div>

          <div className="w-[33%] min-w-[25%]">
            <div className="w-full bg-primary-foreground rounded-sm pr-4">
              <div className="pt-6 px-6 w-full">
                <h3 className="scroll-m-20 text-xl font-medium tracking-tight text-primary break-all">
                  {formProperties.formTitle}
                </h3>
                <Separator className="my-7" />
              </div>
              <FormDraggableComponents
                customizingComponentId={customizingComponent?.id}
                components={formSelectedComponents}
              />
            </div>
          </div>

          <DragOverlayComponent dragComponent={activeDraggableInput} />
        </DndContext>

        {customizingComponent && (
          <FormComponentCustomizer
            component={customizingComponent}
            updateComponent={updateComponent}
            removeComponent={removeComponent}
          />
        )}
      </ErrorBoundary>
    </div>
  );
}
