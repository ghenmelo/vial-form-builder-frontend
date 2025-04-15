export interface Form {
  id?: string;
  name: string;
  fields: Record<string, FormComponent>;
}

export interface FormComponent {
  id: string;
  type: string;
  question: string;
  inputed: boolean;
  required: boolean;
  placeholder: string;
  options?: string;
  answer?: string;
}

export interface FormProperties {
  formTitle: string;
}

export interface SourceRecord {
  id?: string;
  formId: string;
  sourceData: SourceData[];
}

export interface SourceData {
  id?: string;
  question: string;
  answer: string;
  sourceRecordId?: string;
}
