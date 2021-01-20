import React from "react";
import AwarenessCategory from "./AwarenessCategory";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Create AwarenessCategory", () => {
  afterEach(() => jest.clearAllMocks());

  test("looks for category input", () => {
    render(<AwarenessCategory />);
    const catText = screen.getByLabelText(/category name/i);
    expect(catText).toBeInTheDocument();
  });

  test("looks for description input", () => {
    render(<AwarenessCategory />);
    const descText = screen.getByLabelText(/description/i);
    expect(descText).toBeInTheDocument();
  });

  test("checks if save button is present", () => {
    render(<AwarenessCategory />);
    expect(
      screen
        .getAllByRole("button")
        .find((button) => button.textContent === "SAVE")
    ).toBeInTheDocument();
  });

  test("checks if save button is disabled by default", () => {
    render(<AwarenessCategory />);
    expect(
      screen
        .getAllByRole("button")
        .find((button) => button.textContent === "SAVE")
    ).toBeDisabled();
  });

  test("checks if save button is enabled if category name present", () => {
    render(<AwarenessCategory />);
    const catText = screen.getByLabelText(/category name/i);
    userEvent.type(catText, "Cat1");
    expect(
      screen
        .getAllByRole("button")
        .find((button) => button.textContent === "SAVE")
    ).toBeEnabled();
  });

  test("checks if category is not created without a name", () => {
    render(<AwarenessCategory />);
    const catText = screen.getByLabelText(/category name/i);
    userEvent.type(catText, "");
    expect(
      screen
        .getAllByRole("button")
        .find((button) => button.textContent === "SAVE")
    ).toBeDisabled();
  });

  test("checks if category is created with name and description", () => {});

  test("checks if category is created with name alone", () => {});
});
