"use client";

import TextInputComponent from "./usables/text-input-component";
import DateInputComponent from "./usables/date-input-component";
import NumberInputComponent from "./usables/number-input-component";
import RadioInputComponent from "./usables/radio-input-component";
import SelectionInputComponent from "./usables/selection-input-component";
import { FormComponentType } from "@/types/FormTypeComponents";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormComponent } from "@/types/FormComponent";
import TextInputPreviewComponent from "./preview/text-input-preview-component";
import NumberInputPreviewComponent from "./preview/number-input-preview-componen";
import DateInputPreviewComponent from "./preview/date-input-preview-component";
import RadioInputPreviewComponent from "./preview/radio-input-preview-component";
import SelectInputPreviewComponent from "./preview/selection-input-preview-component";
import TextAreaInputComponent from "./usables/text-area-input-preview-component";
import TextAreaInputPreviewComponent from "./preview/text-area-input-preview-component";

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
        case FormComponentType.TEXT:
          return register ? (
            <TextInputComponent
              component={component}
              register={register}
              errors={errors}
            />
          ) : (
            <TextInputPreviewComponent component={component} />
          );
        case FormComponentType.DATE:
          return control ? (
            <DateInputComponent
              component={component}
              updateComponent={updateComponent}
              control={control}
              errors={errors}
            />
          ) : (
            <DateInputPreviewComponent component={component} />
          );
        case FormComponentType.NUMBER:
          return register ? (
            <NumberInputComponent
              component={component}
              register={register}
              errors={errors}
            />
          ) : (
            <NumberInputPreviewComponent component={component} />
          );
        case FormComponentType.RADIO:
          return control ? (
            <RadioInputComponent
              component={component}
              updateComponent={updateComponent}
              control={control}
              errors={errors}
            />
          ) : (
            <RadioInputPreviewComponent component={component} />
          );

        case FormComponentType.SELECTION:
          return control ? (
            <SelectionInputComponent
              component={component}
              control={control}
              errors={errors}
            />
          ) : (
            <SelectInputPreviewComponent component={component} />
          );

        case FormComponentType.TEXT_AREA:
          return register ? (
            <TextAreaInputComponent
              component={component}
              register={register}
              errors={errors}
            />
          ) : (
            <TextAreaInputPreviewComponent component={component} />
          );
      }
    }
  };

  return <div className={`rounded-sm w-full`}>{selectTypeComponent()}</div>;
}
