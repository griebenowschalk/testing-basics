import { describe, it, expect } from "vitest";
import { ShoppingList1 } from "../components/Error/ShoppingList1";
import { render } from "@testing-library/react";

describe("Shopping List 1 test suite", () => {
  it("Throw error on list duplicate", () => {
    const groceries = ["apple", "banana", "apple"];
    expect(() =>
      render(<ShoppingList1 groceries={groceries} selectItem={() => {}} />)
    ).toThrow("Duplicate items found in groceries array");
  });

  it("Throw error on list duplicate - generic message", () => {
    const groceries = ["apple", "banana", "apple"];
    expect(() =>
      render(<ShoppingList1 groceries={groceries} selectItem={() => {}} />)
    ).toThrow(/Duplicate/);
  });
});
