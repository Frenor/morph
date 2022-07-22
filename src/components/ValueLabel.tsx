import React from "react";
import Button from "./Button/Button";

interface ValueLabelProps {
  value: string;
  onRemove: () => void;
}

export const ValueLabel = ({ value, onRemove }: ValueLabelProps) => (
  <span style={{ margin: "5px" }}>
    {value}
    <Button onClick={onRemove}>x</Button>
  </span>
);
