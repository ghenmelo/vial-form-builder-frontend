"use client";

import EyeIconButton from "@/components/action-icons/eye-icon-button";
import TrashIconButton from "@/components/action-icons/trash-icon-button";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { FormService } from "@/service/form.service";
import { Form } from "@/types/FormComponent";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FormTable() {
  const [forms, setForms] = useState<Form[]>();

  const updateForms = (idToRemove: string) => {
    setForms((prev) => prev?.filter((item) => item.id !== idToRemove));
  };

  const deleteForm = (formId?: string) => {
    if (formId) {
      FormService.deleteForm(formId)
        .then(() => {
          toast.success("Success deleting a form.");
          updateForms(formId);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  useEffect(() => {
    FormService.getAllForms().then((forms) => setForms(forms));
  }, []);

  return (
    <div className="w-full overflow-auto h-100">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Form Name</TableHead>
            <TableHead className="flex justify-center items-center">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms &&
            forms.length &&
            forms.map((form) => (
              <TableRow key={form.id}>
                <TableCell className="w-[100%]">{form.name}</TableCell>
                <TableCell className="flex flex-row gap-3">
                  <EyeIconButton
                    description="View Form"
                    destination={`/form-reply/${form.id}`}
                  ></EyeIconButton>
                  <TrashIconButton
                    description="Delete form"
                    onClickAction={() => deleteForm(form.id)}
                  ></TrashIconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
