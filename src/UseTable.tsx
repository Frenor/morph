import { Category, Value } from "./hooks";
import { CategoryTable } from "./components/CategoryTable/CategoryTable";
import { useEffect, useState } from "react";

interface UseTableProps {
    categories: Category[]
    getExclusionsForValue: (value: Value) => Value[];
}

export function UseTable({categories, getExclusionsForValue}: UseTableProps) {
    const [selectedValues, setSelectedValues] = useState<Value[]>([]);
    const [excludedValues, setExcludedValues] = useState<Value[]>([]);

    useEffect(() => {
        setExcludedValues(selectedValues.reduce((acc, value) => {
            const exclusions = getExclusionsForValue(value);
            return acc.concat(exclusions);
        }, [] as Value[]));
    }, [selectedValues, getExclusionsForValue]);

    const toggleValue = (value: Value) => {
        const category = categories.find(category => category.values.includes(value));
        if (excludedValues.includes(value)) {
            return;
        }
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter((v) => v !== value));
        } else {
            setSelectedValues([...selectedValues.filter((v) => !category!.values.includes(
                v)), value]);
        }
    }

    return <CategoryTable categories={ categories } selectedValues={ selectedValues }
                          excludedValues={ excludedValues }
                          onValueClick={ (value) => toggleValue(value) }
                          onHoverExclude={ (value) => getExclusionsForValue(value) } />;
}
