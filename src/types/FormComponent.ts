interface Form {
  id?: string;
  name: string;
  fields: Record<string, FormComponent>;
}

interface FormComponent {
  id: string;
  type: string;
  question: string;
  inputed: boolean;
  required: boolean;
  placeholder: string;
  options?: string;
  answer?: string;
}

interface FormProperties {
  formTitle: string;
}

interface SourceRecord {
  id?: string;
  formId: string;
  sourceData: SourceData[];
}

interface SourceData {
  id?: string;
  question: string;
  answer: string;
  sourceRecordId?: string;
}
