import { describe, it, expect } from "vitest";
import { ShoppingList2 } from "../components/Error/ShoppingList2";
import { render, screen } from "@testing-library/react";

describe("Shopping List 2 test suite", () => {
  it("Throw error on list duplicate", () => {
    const groceries = ["apple", "banana", "apple"];
    render(<ShoppingList2 groceries={groceries} selectItem={() => {}} />);

    const errorMessage = screen.getByRole("paragraph");
    expect(errorMessage).toHaveTextContent(/duplicate/);
  });
});
