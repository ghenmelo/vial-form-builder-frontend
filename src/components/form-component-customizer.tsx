import { DraggableTypeComponents } from "@/types/DraggableTypeComponents";
import TextCustomizerInput from "./customizer-inputs/text-customizer-input";
import BasicTypeComponent from "./types-inputs/basic-type-component";
import NumberInputComponent from "./types-inputs/number-input-component";
import NumberCustomizerInput from "./customizer-inputs/number-customizer-input";
import RadioCustomizerInput from "./customizer-inputs/radio-customizer-input";
import DateCustomizerInput from "./customizer-inputs/date-customizer-input";
import SelectionCustomizerInput from "./customizer-inputs/select-customizer-input";

interface propos {
  component: DraggableComponent;
  updateComponent: (component: DraggableComponent) => void;
}

export function FormComponentCustomizer({
  component,
  updateComponent,
}: propos) {
  const selectTypeComponent = () => {
    if (component && component.inputed) {
      switch (component.type) {
        case DraggableTypeComponents.TEXT:
          return (
            <TextCustomizerInput
              component={component}
              updateComponent={updateComponent}
            />
          );
        case DraggableTypeComponents.DATE:
          return (
            <DateCustomizerInput
              component={component}
              updateComponent={updateComponent}
            />
          );
        case DraggableTypeComponents.NUMBER:
          return (
            <NumberCustomizerInput
              component={component}
              updateComponent={updateComponent}
            />
          );
        case DraggableTypeComponents.RADIO:
          return (
            <RadioCustomizerInput
              component={component}
              updateComponent={updateComponent}
            />
          );
        case DraggableTypeComponents.SELECTION:
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
