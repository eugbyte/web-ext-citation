import React from "react";

interface Prop {
    handleChange: (args: any) => void;
}

export function Dropdown({handleChange}: Prop): JSX.Element {

  return <div>
    <select onChange={handleChange}>
      <option className="text-xs">Styled (default)</option>
      <option className="text-xs">Plain text</option>
    </select>
  </div>
}