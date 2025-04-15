import FormReplyComponents from "@/components/form-reply-components";

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
