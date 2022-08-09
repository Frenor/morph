import React, { useState } from "react";
import "./App.css";
import Categories from "./Categories";
import { useMorph } from "./hooks";
import { Stats } from "./Stats";
import { Exclusions } from "./Exclusions";
import Button from "./components/Button/Button";
import { UseTable } from "./UseTable";

function App() {
  const [state, setState] = useState<"edit" | "use">("edit");
  const {
    categories,
    exclusions,
    solutionCount,
    addCategory,
    removeCategory,
    addValue,
    removeValue,
    toggleExclusion,
    getExclusionsForValue,
    autoupdateSolutionCount,
    updateSolutionCount,
  } = useMorph();

  return (
    <div className="App">
      <Button onClick={() => setState("edit")}>Edit</Button>
      <Button onClick={() => setState("use")}>Use</Button>
      {state === "edit" && (
        <>
          <Categories
            categories={categories}
            addCategory={addCategory}
            removeCategory={removeCategory}
            addValue={addValue}
            removeValue={removeValue}
          />
          <Exclusions
            categories={categories}
            toggleExclusion={toggleExclusion}
            getExclusionsForValue={getExclusionsForValue}
          />
          <Stats
            categories={categories}
            exclusions={exclusions}
            solutionCount={solutionCount}
            autoUpdateSolutionCount={autoupdateSolutionCount}
            updateSolutionCount={updateSolutionCount}
          />
        </>
      )}
      {state === "use" && (
        <UseTable
          categories={categories}
          getExclusionsForValue={getExclusionsForValue}
        />
      )}
    </div>
  );
}

export default App;
