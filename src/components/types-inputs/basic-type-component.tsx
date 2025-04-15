import { FormComponent } from "@/types/FormComponent";

interface props {
  component: FormComponent;
}

export default function BasicTypeComponent({ component }: props) {
  return (
    <div className="border-2 bg-secondary flex items-center justify-center p-6">
      {component?.type}
    </div>
  );
}
