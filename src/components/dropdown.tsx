import React from "react";
import { CITATION_OPTION } from "src/models/util";

interface Prop {
    handleChange: (args: any) => void;
    defaultValue: CITATION_OPTION 
}

export function Dropdown({handleChange, defaultValue}: Prop): JSX.Element {

  return <div>
    <select className="text-xs text-blue-500" onChange={handleChange} defaultValue={defaultValue}>
      <option value={CITATION_OPTION.SAL}>SAL</option>
      <option value={CITATION_OPTION.SAL_WO_COLOR}>SAL (w/o colour)</option>
      <option disabled value={CITATION_OPTION.OXFORD}>Oxford</option>
    </select>
  </div>
}