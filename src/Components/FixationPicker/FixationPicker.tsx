import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./FixationPicker.css";
import { MortgageFixations } from "./Fixations.interface";

function FixationPicker({ fixations, fixationSelected }) {
  const data = fixations as MortgageFixations;
  const [selectedFixation, setSelectedFixation] = React.useState(-1);

  return (
    <div>
      {Object.keys(data?.perFixations)?.map((key) => {
        const fixation = data.perFixations[key];
        return (
          <div
            onClick={() => {
              setSelectedFixation(fixation.fixation);
              fixationSelected(fixation);
            }}
            className={
              "fixation " +
              (selectedFixation === fixation.fixation ? "selected" : "")
            }
          >
            {key} years - {fixation.loanInterestRate}% -{" "}
            {fixation.installmentAmount}
          </div>
        );
      })}
    </div>
  );
}

export default FixationPicker;
