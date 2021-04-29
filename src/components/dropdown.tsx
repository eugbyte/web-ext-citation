import React from "react";

interface Prop {
    handleChange: (args: any) => void;
}

export function Dropdown({handleChange}: Prop): JSX.Element {

  return <div>
    <select>
      <option>Plain text</option>
      <option></option>
    </select>
  </div>
}