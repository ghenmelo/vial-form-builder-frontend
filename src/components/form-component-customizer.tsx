import { FormComponentTypeComponents } from "@/types/FormTypeComponents";
import TextCustomizerInput from "./customizer-inputs/text-customizer-input";
import BasicTypeComponent from "./types-inputs/basic-type-component";
import NumberInputComponent from "./types-inputs/number-input-component";
import NumberCustomizerInput from "./customizer-inputs/number-customizer-input";
import RadioCustomizerInput from "./customizer-inputs/radio-customizer-input";
import DateCustomizerInput from "./customizer-inputs/date-customizer-input";
import SelectionCustomizerInput from "./customizer-inputs/select-customizer-input";

interface propos {
  component: FormComponent;
  updateComponent: (component: FormComponent) => void;
}

export function FormComponentCustomizer({
  component,
  updateComponent,
}: propos) {
  const selectTypeComponent = () => {
    if (component && component.inputed) {
      switch (component.type) {
        case FormComponentTypeComponents.TEXT:
          return (
            <TextCustomizerInput
              component={component}
              updateComponent={updateComponent}
            />
          );
        case FormComponentTypeComponents.DATE:
          return (
            <DateCustomizerInput
              component={component}
              updateComponent={updateComponent}
            />
          );
        case FormComponentTypeComponents.NUMBER:
          return (
            <NumberCustomizerInput
              component={component}
              updateComponent={updateComponent}
            />
          );
        case FormComponentTypeComponents.RADIO:
          return (
            <RadioCustomizerInput
              component={component}
              updateComponent={updateComponent}
            />
          );
        case FormComponentTypeComponents.SELECTION:
          return (
            <SelectionCustomizerInput
              component={component}
              updateComponent={updateComponent}
            />
          );
      }
    }

    return <BasicTypeComponent component={component}></BasicTypeComponent>;
  };

  return (
    <div className="bg-primary-foreground w-full h-full rounded-sm flex flex-col p-6">
      {selectTypeComponent()}
    </div>
  );
}
