import { FormComponentType } from "@/types/FormTypeComponents";
import TextCustomizerInput from "./types-inputs/customizers/text-customizer-input";
import BasicTypeComponent from "./types-inputs/basic-type-component";
import NumberCustomizerInput from "./types-inputs/customizers/number-customizer-input";
import RadioCustomizerInput from "./types-inputs/customizers/radio-customizer-input";
import DateCustomizerInput from "./types-inputs/customizers/date-customizer-input";
import SelectionCustomizerInput from "./types-inputs/customizers/select-customizer-input";
import { FormComponent } from "@/types/FormComponent";
import TextAreaCustomizerInput from "./types-inputs/customizers/text-area-customizer-input";

interface propos {
  component: FormComponent;
  updateComponent: (component: FormComponent) => void;
  removeComponent: (id: string) => void;
}

export function FormComponentCustomizer({
  component,
  updateComponent,
  removeComponent,
}: propos) {
  const selectTypeComponent = () => {
    if (component && component.inputed) {
      switch (component.type) {
        case FormComponentType.TEXT:
          return (
            <TextCustomizerInput
              component={component}
              updateComponent={updateComponent}
              removeComponent={removeComponent}
            />
          );
        case FormComponentType.DATE:
          return (
            <DateCustomizerInput
              component={component}
              updateComponent={updateComponent}
              removeComponent={removeComponent}
            />
          );
        case FormComponentType.NUMBER:
          return (
            <NumberCustomizerInput
              component={component}
              updateComponent={updateComponent}
              removeComponent={removeComponent}
            />
          );
        case FormComponentType.RADIO:
          return (
            <RadioCustomizerInput
              component={component}
              updateComponent={updateComponent}
              removeComponent={removeComponent}
            />
          );
        case FormComponentType.SELECTION:
          return (
            <SelectionCustomizerInput
              component={component}
              updateComponent={updateComponent}
              removeComponent={removeComponent}
            />
          );
        case FormComponentType.TEXT_AREA:
          return (
            <TextAreaCustomizerInput
              component={component}
              updateComponent={updateComponent}
              removeComponent={removeComponent}
            />
          );
      }
    }

    return <BasicTypeComponent component={component}></BasicTypeComponent>;
  };

  return (
    <div className="bg-primary-foreground w-[33%]  rounded-sm flex flex-col p-6">
      {selectTypeComponent()}
    </div>
  );
}
