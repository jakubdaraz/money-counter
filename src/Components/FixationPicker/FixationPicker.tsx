import "bootstrap/dist/css/bootstrap.min.css";
import { MortgageFixations } from "./Fixations.interface";

function FixationPicker({ fixations, fixationSelected }) {
  const data = fixations as MortgageFixations;
  return (
    <div>
      {Object.keys(data?.perFixations)?.map((key) => {
        const fixation = data.perFixations[key];
        return <div onClick={() => fixationSelected(fixation)}>{key}</div>;
      })}
    </div>
  );
}

export default FixationPicker;
