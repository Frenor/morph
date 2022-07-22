import { Category, Value } from "./hooks";
import { useEffect, useState } from "react";
import { CategoryTable } from "./components/CategoryTable/CategoryTable";

interface ExclusionsProps {
    categories: Category[];
    toggleExclusion: (value1: Value, value2: Value) => void;
    getExclusionsForValue: (value: Value) => Value[];
}

export const Exclusions = ({
    categories, toggleExclusion, getExclusionsForValue,
}: ExclusionsProps) => {
    const [activeCategory, setActiveCategory] = useState<Category>(categories[0]);
    const [activeValue, setActiveValue] = useState<Value>();

    useEffect(() => {
        if (categories.length > 0) {
            setActiveCategory(categories[0]);
            if (categories[0].values.length > 0) {
                setActiveValue(categories[0].values[0]);
            }
        }
    }, [categories]);

    const remainingCategories = categories.filter((category) => category !== activeCategory);
    if (categories.length === 0 || !activeCategory || activeCategory.values.length === 0) {
        return <h2>Exclusions</h2>;
    }

    return (<>
            <h2>Exclusions</h2>
            <select
                onChange={ (e) => {
                    const category = categories[parseInt(e.target.value)];
                    setActiveCategory(category!);
                    setActiveValue(category!.values[0]);
                } }
            >
                { categories.map((category, index) => (
                    <option key={ index } value={ index }>
                        { category.name }
                    </option>)) }
            </select>
            <div style={ {display: "flex", flexDirection: "row", gap: "1em"} }>
                <CategoryTable
                    categories={ [activeCategory] }
                    onValueClick={ (value) => setActiveValue(value) }
                    selectedValues={ activeValue && [activeValue] }
                />
                <CategoryTable
                    categories={ remainingCategories }
                    excludedValues={ activeValue && getExclusionsForValue(activeValue) }
                    onValueClick={ (value) => {
                        if (activeValue) {
                            toggleExclusion(activeValue, value);
                        }
                    } }
                />
            </div>
        </>);
};
