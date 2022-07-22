import "./style.css";
import { Category, Value } from "../../hooks";
import classNames from "classnames";
import { useState } from "react";

interface CategoryTableProps {
    categories: Category[];
    selectedValues?: Value[];
    excludedValues?: Value[];
    onValueClick: (value: Value) => void;
    onHoverExclude?: (value: Value) => Value[];
}

export function CategoryTable({
    categories, excludedValues, onValueClick, selectedValues, onHoverExclude,
}: CategoryTableProps) {
    const maxValueLength = categories.reduce((max, category) => Math.max(max,
        category.values.length
    ), 0);

    const [hoverExclusions, setHoverExclusions] = useState<Value[]>([]);

    return (<table className="category-table">
        <thead>
        <tr>
            { categories.map((category, index) => (
                <th key={ index }>{ category.name }</th>)) }
        </tr>
        </thead>
        <tbody>
        { [...Array(maxValueLength)].map((_, valueIndex) => (<tr key={ valueIndex }>
            { categories.map((category, categoryIndex) => {
                const value = category.values[valueIndex];
                return value ? (<td
                    className={ classNames(
                        {selected: selectedValues?.includes(value)},
                        {excluded: excludedValues?.includes(value)},
                        {hoverExcluded: hoverExclusions.includes(value)}

                    ) }
                    key={ categoryIndex + "-" + valueIndex }
                    onClick={ () => onValueClick(value) }
                    onMouseOver={ () => onHoverExclude && setHoverExclusions(onHoverExclude(value)) }
                >
                    { value.name }
                </td>) : (<td key={ categoryIndex + "-" + valueIndex }></td>);
            }) }
        </tr>)) }
        </tbody>
    </table>);
}
