import React, { KeyboardEvent } from "react";
import { ValueLabel } from "./ValueLabel";
import { Category, Value } from "../hooks";
import Button from "./Button/Button";

interface CategoryRowProps {
  category: Category;
  removeCategory: () => void;
  addValue: (name: string) => void;
  removeValue: (value: Value) => void;
}

const handleKeyDown = (
  event: KeyboardEvent<HTMLInputElement>,
  addValue: (name: string) => void
) => {
  if (event.key === "Enter") {
    event.preventDefault();
    event.stopPropagation();
    addValue(event.target.value);
    event.target.value = "";
  }
};

export const CategoryRow = ({
  category,
  removeCategory,
  addValue,
  removeValue,
}: CategoryRowProps) => (
  <div>
    {category.name}
    <Button onClick={removeCategory}>remove</Button>
    {category.values.map((value, index) => (
      <ValueLabel
        key={index}
        value={value.name}
        onRemove={() => removeValue(value)}
      />
    ))}
    <input type="text" onKeyDown={(event) => handleKeyDown(event, addValue)} />
  </div>
);
