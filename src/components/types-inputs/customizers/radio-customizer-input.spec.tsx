import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioCustomizerInput from "./radio-customizer-input";
import { FormComponent } from "@/types/FormComponent";

describe("RadioCustomizerInput using querySelector", () => {
  const mockComponent: FormComponent = {
    id: "1",
    type: "radio",
    question: "Initial Question",
    placeholder: "",
    required: false,
    inputed: false,
  };

  const updateComponent = vi.fn();
  const removeComponent = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders elements with correct values", () => {
    const { container } = render(
      <RadioCustomizerInput
        component={mockComponent}
        updateComponent={updateComponent}
        removeComponent={removeComponent}
      />
    );

    const inputs = container.querySelectorAll("input");
    expect(inputs.length).toBe(1);
    expect(inputs[0].value).toBe("Initial Question");

    const removeButton = container.querySelector("button");
    expect(removeButton?.textContent?.toLowerCase()).toContain("remove");
  });

  it("calls updateComponent when title input is changed", async () => {
    const { container } = render(
      <RadioCustomizerInput
        component={mockComponent}
        updateComponent={updateComponent}
        removeComponent={removeComponent}
      />
    );

    const titleInput = container.querySelector("input");
    await userEvent.clear(titleInput!);
    await userEvent.type(titleInput!, "New Question");

    expect(updateComponent).toHaveBeenCalled();
  });

  it("calls removeComponent on button click", async () => {
    const { container } = render(
      <RadioCustomizerInput
        component={mockComponent}
        updateComponent={updateComponent}
        removeComponent={removeComponent}
      />
    );

    const removeButton = container.querySelector("button");
    await userEvent.click(removeButton!);

    expect(removeComponent).toHaveBeenCalledWith("1");
  });
});
