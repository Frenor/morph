import React, { KeyboardEvent } from "react";
import { CategoryRow } from "./components/CategoryRow";
import { Category, Value } from "./hooks";
import { Stats } from "./Stats";

interface CategoryListProps {
  categories: Category[];
  addCategory: (name: string) => void;
  removeCategory: (category: Category) => void;
  addValue: (category: Category, value: string) => void;
  removeValue: (category: Category, value: Value) => void;
}

const handleKeyDown = (
  event: KeyboardEvent<HTMLInputElement>,
  addCategory: (name: string) => void
) => {
  if (event.key === "Enter") {
    event.preventDefault();
    event.stopPropagation();
    addCategory(event.target.value);
    event.target.value = "";
  }
};

const CategoryList = ({
  categories,
  addCategory,
  removeCategory,
  addValue,
  removeValue,
}: CategoryListProps) => (
  <>
    <div>Category ---------- Values</div>
    {categories.map((category, index) => (
      <CategoryRow
        key={index}
        category={category}
        removeCategory={() => removeCategory(category)}
        addValue={(name: string) => addValue(category, name)}
        removeValue={(value: Value) => removeValue(category, value)}
      />
    ))}
    Add category:{" "}
    <input
      type="text"
      onKeyDown={(event) => handleKeyDown(event, addCategory)}
    />
  </>
);

interface EditMorpProps {
  categories: Category[];
  addCategory: (name: string) => void;
  removeCategory: (category: Category) => void;
  addValue: (category: Category, value: string) => void;
  removeValue: (category: Category, value: Value) => void;
}

const Categories = ({
  categories,
  addCategory,
  removeCategory,
  addValue,
  removeValue,
}: EditMorpProps) => (
  <div>
    <h2>Categories</h2>
    <CategoryList
      categories={categories}
      addCategory={addCategory}
      removeCategory={removeCategory}
      addValue={addValue}
      removeValue={removeValue}
    />
  </div>
);

export default Categories;
