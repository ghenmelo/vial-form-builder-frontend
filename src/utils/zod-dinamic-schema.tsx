import { FormComponent } from "@/types/FormComponent";
import { FormComponentType } from "@/types/FormTypeComponents";
import { z, ZodObject, ZodRawShape } from "zod";

export default function zodDinamicSchema(
  fields: FormComponent[]
): ZodObject<ZodRawShape> {
  const shape: ZodRawShape = {};

  for (const field of fields) {
    let base;

    switch (field.type) {
      case FormComponentType.TEXT:
        base = z.string();
        if (field.required) {
          base = base.min(1, { message: "Must have a value" });
        } else {
          base = base.optional();
        }
        break;
      case FormComponentType.NUMBER:
        base = z.string();
        if (field.required) {
          base = base.min(1, { message: "Must have a value" });
        } else {
          base = base.optional();
        }
        break;
      case FormComponentType.DATE:
        base = z.coerce.date({
          invalid_type_error: "Invalid Date",
          required_error: "Must have a value",
        });

        if (!field.required) {
          base = base.optional();
        }
        break;
      case FormComponentType.SELECTION:
        base = z.string();
        if (field.required) {
          base = base.min(1, { message: "Must have a value" });
        } else {
          base = base.optional();
        }
        break;
      case FormComponentType.TEXT_AREA:
        base = z.string();
        if (field.required) {
          base = base.min(1, { message: "Must have a value" });
        } else {
          base = base.optional();
        }
        break;
      case FormComponentType.RADIO:
        base = z.boolean();
        base = base.optional();
        break;
      default:
        base = z.any();
    }

    shape[field.question] = base;
  }

  return z.object(shape);
}
