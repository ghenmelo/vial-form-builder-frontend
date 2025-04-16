"use client";

import { FormService } from "@/service/form.service";
import GenericComponent from "./types-inputs/generic-component";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ZodObject, ZodRawShape } from "zod";
import zodDinamicSchema from "@/utils/zod-dinamic-schema";
import { useForm } from "react-hook-form";
import { SourceRecordService } from "@/service/source-record.service";
import { toast } from "sonner";
import FormReplyList from "./form-reply-list";
import { Separator } from "./ui/separator";
import {
  Form,
  FormComponent,
  SourceData,
  SourceRecord,
} from "@/types/FormComponent";

interface Props {
  id: string;
}

export default function FormReplyComponents({ id }: Props) {
  const [form, setForm] = useState<Form>();
  const [components, setComponents] = useState<FormComponent[]>([]);
  const [answers, setAnswers] = useState<SourceRecord[]>([]);
  const [isResponding, setIsResponding] = useState<boolean>(true);
  const [schema, setSchema] = useState<ZodObject<ZodRawShape>>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formMethods = useForm<Record<string, any>>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: "onSubmit",
  });

  const { handleSubmit, register, formState, control, reset } = formMethods;

  useEffect(() => {
    FormService.getFormById(id).then((forms) => buildComponents(forms));
    FormService.getSourceFormById(id).then((sourceRecord) => {
      setAnswers(sourceRecord);
    });
  }, [id]);

  const buildComponents = (form: Form) => {
    setForm(form);
    if (form) {
      const orderedList = Object.entries(form.fields)
        .sort(([keyA], [keyB]) => {
          const indexA = Number(keyA.split("-")[1]);
          const indexB = Number(keyB.split("-")[1]);
          return indexA - indexB;
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(([_, value]) => value);

      setComponents(orderedList);

      const dynamicSchema = zodDinamicSchema(orderedList);
      setSchema(dynamicSchema);
    }
  };

  const updateComponent = (customizingComponent: FormComponent) => {
    setComponents((prev) =>
      prev?.map((item) =>
        item.id === customizingComponent?.id ? customizingComponent : item
      )
    );
  };

  // HERE I USE ANY TYPE BECAUSE ZOD TYPE VALIDATION IS GENERATING DYNAMICALLY
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    const newAnswers = Object.entries(data).map(
      ([question, answer]): SourceData => ({
        question,
        answer: answer ? String(answer) : "",
      })
    );

    const sourceRecord = {
      formId: id,
      sourceData: newAnswers,
    };

    SourceRecordService.saveSourceRecord(sourceRecord)
      .then(() => {
        toast.success("Success saving a form reply.");
        setAnswers([...answers, sourceRecord]);
        handleAnswerForm();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleSetVisualingDataId = (id?: string) => {
    reset();
    clearAnswers();
    const answersFiltered = answers.filter((ans) => ans.id === id)[0];

    if (answersFiltered) {
      const updatedComponents = [...components]?.map((comp, index) => {
        const source = answersFiltered.sourceData[index];
        return source ? { ...comp, answer: source.answer } : comp;
      });

      setComponents(updatedComponents);
      setIsResponding(false);
    }
  };

  const clearAnswers = () => {
    let listComponents = [...components];
    listComponents = listComponents?.map((comp) => {
      comp.answer = undefined;
      return comp;
    });
    setComponents(listComponents);
  };

  const handleAnswerForm = () => {
    setIsResponding(true);
    clearAnswers();
    reset();
  };

  return (
    <div className="flex justify-around">
      <div className="bg-primary-foreground rounded-sm flex flex-col p-6 w-[40%]">
        <div className="flex flex-row items-center justify-between">
          <h3 className="scroll-m-20 text-2xl font-medium tracking-tight text-primary break-all">
            Reply Form: {form?.name}
          </h3>
          <Button
            hidden={isResponding}
            className="cursor-pointer"
            onClick={handleAnswerForm}
          >
            Answer Form
          </Button>
        </div>

        <Separator className="my-4"></Separator>

        <h3 className="scroll-m-20 text-2xl font-medium tracking-tight text-primary">
          Form Answers
        </h3>
        <FormReplyList
          answers={answers}
          setVisualizingDataId={handleSetVisualingDataId}
        />
      </div>

      <div className="flex w-[40%] bg-primary-foreground rounded-sm">
        <div className="flex flex-col w-full ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ScrollArea className="scroll-auto">
              <div className="flex flex-col items-start">
                <h3 className="scroll-m-20 text-2xl font-medium tracking-tight text-primary p-6">
                  {form?.name}
                </h3>
                {components.map((item) => (
                  <div key={item.id} className="w-full">
                    <GenericComponent
                      component={item}
                      updateComponent={updateComponent}
                      register={isResponding ? register : undefined}
                      errors={formState.errors}
                      control={isResponding ? control : undefined}
                    ></GenericComponent>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button
                  disabled={!isResponding}
                  className="w-40 mt-10 m-9 self-end"
                >
                  Submit
                </Button>
              </div>
            </ScrollArea>
          </form>
        </div>
      </div>
    </div>
  );
}
