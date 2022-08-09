import { Category, Value } from "./hooks";
import Button from "./components/Button/Button";

interface StatsProps {
  categories: Category[];
  exclusions: [Value, Value][];
  solutionCount: number;
  autoUpdateSolutionCount: boolean;
  updateSolutionCount: () => void;
}

export const Stats = ({
  categories,
  exclusions,
  solutionCount,
  autoUpdateSolutionCount,
  updateSolutionCount,
}: StatsProps) => {
  const numCategories = categories.length;
  const numCombinations = categories.reduce(
    (reducer, category) => reducer * (category.values.length || 1),
    1
  );
  const numExclusions = exclusions.length;
  const reductionPercentage = (1 - solutionCount / numCombinations) * 100;

  return (
    <>
      <h2>Stats</h2>
      <div>{numCategories} categories</div>
      <div>{numCombinations} combinations</div>
      <div>{numExclusions} exclusions</div>
      <div> - </div>
      <div>Solutions</div>
      <div>{solutionCount} solutions</div>
      <div>{reductionPercentage.toFixed(2)}% reduction</div>
      {!autoUpdateSolutionCount && (
        <Button onClick={updateSolutionCount}>Update solutions</Button>
      )}
    </>
  );
};
