"use client";

import TextInputComponent from "./text-input-component";
import DateInputComponent from "./date-input-component";
import NumberInputComponent from "./number-input-component";
import RadioInputComponent from "./radio-input-component";
import SelectionInputComponent from "./selection-input-component";
import { FormComponentTypeComponents } from "@/types/FormTypeComponents";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormComponent } from "@/types/FormComponent";

interface props {
  component: FormComponent;
  updateComponent: (form: FormComponent) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<Record<string, any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<Record<string, any>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<Record<string, any>>;
}

export default function GenericComponent({
  component,
  updateComponent,
  register,
  errors,
  control,
}: props) {
  const selectTypeComponent = () => {
    if (component) {
      switch (component.type) {
        case FormComponentTypeComponents.TEXT:
          return (
            <TextInputComponent
              component={component}
              register={register}
              errors={errors}
            />
          );
        case FormComponentTypeComponents.DATE:
          return (
            <DateInputComponent
              component={component}
              updateComponent={updateComponent}
              control={control}
              errors={errors}
            />
          );
        case FormComponentTypeComponents.NUMBER:
          return (
            <NumberInputComponent
              component={component}
              register={register}
              errors={errors}
            />
          );
        case FormComponentTypeComponents.RADIO:
          return (
            <RadioInputComponent
              component={component}
              updateComponent={updateComponent}
              control={control}
              errors={errors}
            />
          );
        case FormComponentTypeComponents.SELECTION:
          return (
            <SelectionInputComponent
              component={component}
              control={control}
              errors={errors}
            />
          );
      }
    }
  };

  return <div className={`rounded-sm w-full`}>{selectTypeComponent()}</div>;
}
