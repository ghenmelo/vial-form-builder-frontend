import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextCustomizerInput from "./text-customizer-input";
import { FormComponent } from "@/types/FormComponent";

describe("TextCustomizerInput using querySelector", () => {
  const mockComponent: FormComponent = {
    id: "1",
    type: "text",
    question: "Initial Question",
    placeholder: "Initial Placeholder",
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
      <TextCustomizerInput
        component={mockComponent}
        updateComponent={updateComponent}
        removeComponent={removeComponent}
      />
    );

    const inputs = container.querySelectorAll("input");
    expect(inputs.length).toBeGreaterThanOrEqual(2);
    expect(inputs[0].value).toBe("Initial Question");
    expect(inputs[1].value).toBe("Initial Placeholder");

    const switchButton = container.querySelector('[role="switch"]');
    expect(switchButton?.getAttribute("aria-checked")).toBe("false");

    const removeButton = container.querySelector("button");
    expect(removeButton?.textContent?.toLowerCase()).toContain("remove");
  });

  it("calls updateComponent when title input is changed", async () => {
    const { container } = render(
      <TextCustomizerInput
        component={mockComponent}
        updateComponent={updateComponent}
        removeComponent={removeComponent}
      />
    );

    const titleInput = container.querySelectorAll("input")[0];
    await userEvent.clear(titleInput!);
    await userEvent.type(titleInput!, "New Question");

    expect(updateComponent).toHaveBeenCalled();
  });

  it("calls updateComponent when placeholder is changed", async () => {
    const { container } = render(
      <TextCustomizerInput
        component={mockComponent}
        updateComponent={updateComponent}
        removeComponent={removeComponent}
      />
    );

    const placeholderInput = container.querySelectorAll("input")[1];
    await userEvent.clear(placeholderInput!);
    await userEvent.type(placeholderInput!, "New Placeholder");

    expect(updateComponent).toHaveBeenCalled();
  });

  it("toggles required switch", async () => {
    const { container } = render(
      <TextCustomizerInput
        component={mockComponent}
        updateComponent={updateComponent}
        removeComponent={removeComponent}
      />
    );

    const switchButton = container.querySelector('[role="switch"]');
    await userEvent.click(switchButton!);

    expect(updateComponent).toHaveBeenCalledWith(
      expect.objectContaining({ required: true })
    );
  });

  it("calls removeComponent on button click", async () => {
    const { container } = render(
      <TextCustomizerInput
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
