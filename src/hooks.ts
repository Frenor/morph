import { useCallback, useEffect, useState } from "react";

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
  const [solutionCount, setSolutionCount] = useState<number>(0);

  const addCategory = (name: string) => {
    setCategories([...categories, { name, values: [] }]);
  };

  const removeCategory = (category: Category) => {
    setCategories(categories.filter((c) => c !== category));
  };

  const addValue = (category: Category, value: string) => {
    setCategories(
      categories.map((c) =>
        c === category
          ? {
              ...c,
              values: [...c.values, { name: value }],
            }
          : c
      )
    );
  };

  const removeValue = (category: Category, value: Value) => {
    setCategories(
      categories.map((c) =>
        c === category
          ? {
              ...c,
              values: c.values.filter((v) => v !== value),
            }
          : c
      )
    );
  };

  const addExclusion = (value1: Value, value2: Value) => {
    if (getExclusionsForValue(value1).includes(value2)) {
      return;
    }
    setExclusions([...exclusions, [value1, value2]]);
  };

  const removeExclusion = (value1: Value, value2: Value) => {
    setExclusions(
      exclusions
        .filter(([v1, v2]) => !(v1 === value1 && v2 === value2))
        .filter(([v1, v2]) => !(v1 === value2 && v2 === value1))
    );
  };

  const toggleExclusion = (value1: Value, value2: Value) => {
    if (getExclusionsForValue(value1).includes(value2)) {
      removeExclusion(value1, value2);
    } else {
      addExclusion(value1, value2);
    }
  };

  const getExclusionsForValue = useCallback(
    (value: Value): Value[] => {
      return exclusions.reduce((acc, [v1, v2]) => {
        if (v1 === value) {
          return [...acc, v2];
        }
        if (v2 === value) {
          return [...acc, v1];
        }
        return acc;
      }, [] as Value[]);
    },
    [exclusions]
  );

  const isExcluded = useCallback(
    (value1: Value, value2: Value): boolean => {
      return getExclusionsForValue(value1).includes(value2);
    },
    [getExclusionsForValue]
  );

  const getSolutionCountRecursive = useCallback(
    (
      categories: Category[],
      compareCategory?: Category,
      compareValue?: Value
    ): number => {
      if (!categories || categories.length === 0) {
        return 0;
      }

      categories.map((category) => {
        if (category.values.length === 0) {
          return 0;
        }
      });

      if (categories.length === 1) {
        return categories[0].values.reduce((acc, value) => {
          if (compareValue && isExcluded(value, compareValue)) {
            console.log(`Excluded ${value.name} from ${compareValue.name}`);
            return acc;
          }
          return acc + 1;
        }, 0);
      }

      const [firstCategory, ...restCategories] = categories;

      if (!compareCategory || !compareValue) {
        return firstCategory.values.reduce(
          (acc, value) =>
            acc +
            getSolutionCountRecursive(restCategories, firstCategory, value),
          0
        );
      }

      return firstCategory.values.reduce((acc, value) => {
        if (
          restCategories.some((restCategory) =>
            restCategory.values.some((restValue) =>
              isExcluded(value, restValue)
            )
          )
        ) {
          return acc;
        }
        if (compareValue && isExcluded(value, compareValue)) {
          return acc;
        }
        return (
          acc +
          getSolutionCountRecursive(
            restCategories,
            compareCategory,
            compareValue
          )
        );
      }, 0);
    },
    [isExcluded]
  );

  const [autoupdateSolutionCount, setAutoupdateSolutionCount] = useState(true);
  useEffect(() => {
    const numCombinations = categories.reduce(
      (reducer, category) => reducer * (category.values.length || 1),
      1
    );
    setAutoupdateSolutionCount(numCombinations < 100000);
  }, [categories]);

  const updateSolutionCount = useCallback(() => {
    setSolutionCount(
      getSolutionCountRecursive(categories, undefined, undefined)
    );
  }, [categories, getSolutionCountRecursive]);

  useEffect(() => {
    if (!autoupdateSolutionCount) {
      return;
    }
    if (categories.length === 0 || categories[0].values.length === 0) {
      return setSolutionCount(0);
    }
    updateSolutionCount();
  }, [autoupdateSolutionCount, categories, updateSolutionCount, exclusions]);

  return {
    categories,
    exclusions,
    solutions: solutionCount,
    addCategory,
    removeCategory,
    addValue,
    removeValue,
    toggleExclusion,
    getExclusionsForValue,
    solutionCount,
    updateSolutionCount,
    autoupdateSolutionCount,
  };
};
