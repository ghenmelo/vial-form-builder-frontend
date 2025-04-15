"use static";

import { Form, SourceRecord } from "@/types/FormComponent";
import { handleResponse } from "./fetch.utils";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const SourceRecordService = {
  async getSourceRecord(data: Form) {
    const response = await fetch(`${BASE_URL}/source`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return handleResponse(response, "Failed to fetch source records");
  },

  async saveSourceRecord(data: SourceRecord) {
    await fetch(`${BASE_URL}/source`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
};
