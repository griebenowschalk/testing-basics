import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShoppingList } from "../components/Doubles/Spies/ShoppingList";
import * as Utils from "../components/Doubles/Spies/Utils";

describe("Shopping List test suite", () => {
  const groceries = ["Apple", "Banana", "Cherry"];
  it("should select ingredients - local spy", async () => {
    const someFunction = (item: string) => {
      console.log(`Selected item ${item}`);
    };

    // Wrap the function in an object to be able to spy on it
    const someFunctionWrapper = {
      function: someFunction,
    };

    // Spy on the function
    const someFunctionSpy = vi.spyOn(someFunctionWrapper, "function");

    render(
      <ShoppingList
        groceries={groceries}
        selectItem={someFunctionWrapper.function}
      />
    );

    const user = userEvent.setup();

    // Check if the shopping list is rendered
    const shoppingList = screen.getByRole("list");
    expect(shoppingList).toBeInTheDocument();

    // Check if the ingredient items are rendered
    const ingredientItems = within(shoppingList).getAllByRole("listitem");
    expect(ingredientItems).toHaveLength(groceries.length);

    // Click on the first ingredient item
    await user.click(ingredientItems[0]);
    expect(someFunctionSpy).toHaveBeenCalledOnce();
    expect(someFunctionSpy).toHaveBeenCalledWith(groceries[0]);
  });

  it("should select ingredients - global spy", async () => {
    // Spy on the global function already as an Object so no wrapper is needed
    const onItemSelectSpy = vi.spyOn(Utils, "onItemSelect");

    render(
      <ShoppingList groceries={groceries} selectItem={Utils.onItemSelect} />
    );

    const user = userEvent.setup();

    const shoppingList = screen.getByRole("list");
    expect(shoppingList).toBeInTheDocument();

    const ingredientItems = within(shoppingList).getAllByRole("listitem");
    expect(ingredientItems).toHaveLength(groceries.length);

    await user.click(ingredientItems[0]);
    expect(onItemSelectSpy).toHaveBeenCalledOnce();
    expect(onItemSelectSpy).toHaveBeenCalledWith(groceries[0]);
  });

  it("should select ingredients - external spy and Date spy", async () => {
    const onItemSelectSpy = vi.spyOn(Utils, "onItemSelectWithTime");
    const dateSpy = vi.spyOn(Date, "now");

    render(
      <ShoppingList
        groceries={groceries}
        selectItem={Utils.onItemSelectWithTime}
      />
    );

    const user = userEvent.setup();

    const shoppingList = screen.getByRole("list");
    const ingredientItems = within(shoppingList).getAllByRole("listitem");

    await user.click(ingredientItems[0]);
    expect(onItemSelectSpy).toHaveBeenCalledOnce();
    expect(onItemSelectSpy).toHaveBeenCalledWith(groceries[0]);
    expect(dateSpy).toHaveBeenCalled();
  });

  it("should select ingredients - mock", async () => {
    const onItemSelectMock = vi.fn();

    render(<ShoppingList groceries={groceries} selectItem={onItemSelectMock} />);

    const user = userEvent.setup();

    const shoppingList = screen.getByRole("list");
    const ingredientItems = within(shoppingList).getAllByRole("listitem");

    await user.click(ingredientItems[0]);
    expect(onItemSelectMock).toHaveBeenCalledOnce();
    expect(onItemSelectMock).toHaveBeenCalledWith(groceries[0]);
  });
});
