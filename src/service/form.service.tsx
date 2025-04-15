"use static";

import { Form, SourceRecord } from "@/types/FormComponent";
import { handleResponse } from "./fetch.utils";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const FormService = {
  async saveForm(data: Form) {
    const response = await fetch(`${BASE_URL}/form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response, "Failed to submit form");
  },

  async getAllForms(): Promise<Form[]> {
    const response = await fetch(`${BASE_URL}/form`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    return handleResponse<Form[]>(response, "Failed to fetch forms");
  },

  async getFormById(id: string): Promise<Form> {
    const response = await fetch(`${BASE_URL}/form/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    return handleResponse<Form>(response, "Failed to fetch form by ID");
  },

  async getSourceFormById(id: string): Promise<SourceRecord[]> {
    const response = await fetch(`${BASE_URL}/form/source/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    return handleResponse<SourceRecord[]>(
      response,
      "Failed to fetch sources form by ID"
    );
  },

  async deleteForm(id: string) {
    await fetch(`${BASE_URL}/form/${id}`, {
      method: "DELETE",
    });
  },
};
