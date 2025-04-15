"use client";

import { SaveIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { FormService } from "@/service/form.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormComponent, FormProperties } from "@/types/FormComponent";

interface props {
  formProperties: FormProperties;
  formSelectedComponents: FormComponent[];
  setFormProperties: (formProperties: FormProperties) => void;
}

export function FormPropertiesComponent({
  formProperties,
  setFormProperties,
  formSelectedComponents,
}: props) {
  const router = useRouter();

  const handleChange = (
    key: keyof FormProperties,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormProperties({
      ...formProperties,
      [key]: event.target.value,
    });
  };

  const handleOnClick = async () => {
    const json = formSelectedComponents.reduce((acc, item, index) => {
      acc[`field-${index}`] = item;
      return acc;
    }, {} as Record<string, FormComponent>);

    await FormService.saveForm({
      name: formProperties.formTitle,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fields: JSON.stringify(json) as any,
    })
      .then(() => {
        toast.success("Success saving a new form.");
        router.push("/form-viewer");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="m-6 flex flex-col">
      <h3 className="scroll-m-20 text-2xl font-medium tracking-tight text-primary">
        Form properties
      </h3>
      <Separator className="my-4" />

      <div className="flex flex-row w-full gap-10 items-center">
        <div className=" flex flex-col w-sm gap-2">
          <Label htmlFor="text">Form Title</Label>
          <Input
            type="text"
            id="text"
            value={formProperties.formTitle}
            onChange={(e) => handleChange("formTitle", e)}
          />
        </div>

        <Button
          className="flex bg-sidebar-primary w-40 h-12 rounded-sm text-white gap-2 mt-3 cursor-pointer hover:text-sidebar-primary"
          onClick={handleOnClick}
        >
          <SaveIcon width={30} height={24}></SaveIcon>
          <h1 className="text-xl font-normal tracking-tight">Save Form</h1>
        </Button>
      </div>
    </div>
  );
}
