import React from "react";
import { CITATION_OPTION } from "src/models/util";
import styles from './dropdown.module.css';

interface Prop {
    handleChange: (args: any) => void;
    defaultValue: CITATION_OPTION 
}

export function Dropdown({handleChange, defaultValue}: Prop): JSX.Element {

  return <div className="w-full">
    <label htmlFor="dropdown" className="text-xs font-bold block">Format:</label>
    <select className={`${styles.dropDown} text-xs border shadow-md`} 
      onChange={handleChange} 
      defaultValue={defaultValue}
      id="dropdown">
      <option value={CITATION_OPTION.SAL}>SAL</option>
      <option value={CITATION_OPTION.SAL_WO_COLOR}>SAL (no colour)</option>
      <option disabled value={CITATION_OPTION.OXFORD}>Oxford</option>
    </select>
  </div>
}