import FormReplyComponents from "@/components/form-reply-components";
import FormComponents from "@/components/form-reply-components";
import FormReplyList from "@/components/form-reply-list";

interface props {
  params: Promise<{ id: string }>;
}

export default async function FormBuilder({ params }: props) {
  const { id } = await params;

  return (
    <div className="w-full my-8 h-full">
      <FormReplyComponents id={id}></FormReplyComponents>
    </div>
  );
}
