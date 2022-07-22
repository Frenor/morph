import { Category, Value } from "./hooks";
import Button from "./components/Button/Button";

interface StatsProps {
    categories: Category[];
    exclusions: [Value, Value][];
    solutions: [Value[]?];
    updateSolutions: () => void;
}

export const Stats = ({
    categories,
    exclusions,
    solutions,
    updateSolutions
}: StatsProps) => {
    const numCategories = categories.length;
    const numCombinations = categories.reduce((reducer,
        category
    ) => reducer * (category.values.length || 1), 1);
    const numExclusions = exclusions.length;
    const numSolutions = solutions.length;
    const reductionPercentage = (1 - (numSolutions / numCombinations)) * 100;

    return (<>
        <h2>Stats</h2>
        <div>{ numCategories } categories</div>
        <div>{ numCombinations } combinations</div>
        <div>{ numExclusions } exclusions</div>
        <div> - </div>
        <div>Solutions</div>
        <div>{ numSolutions } solutions</div>
        <div>{ reductionPercentage.toFixed(2) }% reduction</div>
        <Button onClick={ () => updateSolutions() }>Update Solutions</Button>
    </>);
};
