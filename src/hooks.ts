import { useEffect, useState } from "react";

export interface Value {
    name: string;
}

export interface Category {
    name: string;
    values: Value[];
}

export const useMorph = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [exclusions, setExclusions] = useState<[Value, Value][]>([]);
    const [solutions, setSolutions] = useState<[Value[]?]>([]);

    const addCategory = (name: string) => {
        setCategories([...categories, {name, values: []}]);
    };

    const removeCategory = (category: Category) => {
        setCategories(categories.filter((c) => c !== category));
    };

    const addValue = (category: Category, value: string) => {
        setCategories(categories.map((c) => c === category ? {
            ...c, values: [...c.values, {name: value}],
        } : c));
    };

    const removeValue = (category: Category, value: Value) => {
        setCategories(categories.map((c) => c === category ? {
            ...c, values: c.values.filter((v) => v !== value),
        } : c));
    };

    const addExclusion = (value1: Value, value2: Value) => {
        if (getExclusionsForValue(value1).includes(value2)) {
            return;
        }
        setExclusions([...exclusions, [value1, value2]]);
    };

    const removeExclusion = (value1: Value, value2: Value) => {
        setExclusions(exclusions.filter(([v1, v2]) => !(v1 === value1 && v2 === value2))
        .filter(([v1, v2]) => !(v1 === value2 && v2 === value1)));
    };

    const toggleExclusion = (value1: Value, value2: Value) => {
        if (getExclusionsForValue(value1).includes(value2)) {
            removeExclusion(value1, value2);
        } else {
            addExclusion(value1, value2);
        }
    }

    const getExclusionsForValue = (value: Value): Value[] => {
        return exclusions.reduce((acc, [v1, v2]) => {
            if (v1 === value) {
                return [...acc, v2];
            }
            if (v2 === value) {
                return [...acc, v1];
            }
            return acc;
        }, [] as Value[]);
    };


    const getSolutions = (categories: Category[]): [Value[]?] => {
        if (categories.length === 0) {
            return [];
        }
        if (categories.length === 1) {
            const solutions: [Value[]?] = [];
            for (const value of categories[0].values) {
                solutions.push([value]);
            }
            return solutions;
        }
        const solutions: [Value[]?] = [];
        for (const value of categories[0].values) {
            const solutionsForValue = getSolutions(categories.slice(1));

            const exclusions = getExclusionsForValue(value);
            for (const solution of solutionsForValue) {
                if (solution && !solution.some((v) => exclusions.includes(v))) {
                    solutions.push([value, ...solution]);
                }
            }
        }
        return solutions;
    }

    const updateSolutions = () => {
        console.log("updateSolutions");
        const solutions = getSolutions(categories);
        setSolutions(solutions);
    };


    return {
        categories,
        exclusions,
        solutions,
        addCategory,
        removeCategory,
        addValue,
        removeValue,
        toggleExclusion,
        getExclusionsForValue,
        updateSolutions,
    };
};
