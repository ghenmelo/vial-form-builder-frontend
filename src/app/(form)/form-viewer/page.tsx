import FormTable from "@/components/form-table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function FormViewer() {
  return (
    <div className="w-[50%] flex flex-col mt-20">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl self-start">
        Welcome to Form builder !
      </h1>
      <h3 className="scroll-m-20 text-2xl font-medium tracking-tight flex-start self-start text-ring">
        Build a new form to start
      </h3>
      <Link
        href={"/form-builder"}
        className="h-20 w-full bg-secondary rounded-sm my-10 flex items-center justify-center"
      >
        <h3 className="scroll-m-20 opacity-100 flex flex-row gap-2">
          <PlusIcon className="text-foreground"></PlusIcon>
          <div className="text-foreground">Create a new Form!</div>
        </h3>
      </Link>

      <FormTable></FormTable>
    </div>
  );
}
