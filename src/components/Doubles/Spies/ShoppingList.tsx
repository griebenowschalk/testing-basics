import { useState } from "react";

export function ShoppingList(props: {
  groceries: string[];
  selectItem: (item: string) => void;
}) {
  const [items, setItems] = useState<
    {
      text: string;
      checked: boolean;
    }[]
  >(props.groceries.map((item) => ({ text: item, checked: false })));
  // Check for duplicates in groceries array
  const hasDuplicates =
    props.groceries.length !== new Set(props.groceries).size;
  if (hasDuplicates) {
    return <p style={{ color: "red" }}>List has duplicates!</p>;
  }

  function handleItemChecked(item: string) {
    setItems((prevItems) => {
      return prevItems.map((prevItem) => {
        if (prevItem.text === item) {
          return { ...prevItem, checked: !prevItem.checked };
        }
        return prevItem;
      });
    });
    props.selectItem(item);
  }

  return (
    <ul>
      {items.map((item) => {
        return (
          <li
            style={{
              textDecoration: item.checked ? "line-through" : "none",
            }}
            key={item.text}
            onClick={() => handleItemChecked(item.text)}
          >
            {item.text}
          </li>
        );
      })}
    </ul>
  );
}
