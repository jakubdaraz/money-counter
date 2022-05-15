import "./App.css";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import MortgageProperties from "../MortgageProperties/MortgageProperties";
import { MortgageConfig } from "Components/MortgageProperties/MortgageConfig.interface";

interface AppState {
  config: MortgageConfig;
  startingCapital?: number;
}

function App() {
  const [value, setValue] = useState({} as AppState);

  const valueChanged = (newValue: MortgageConfig) => {
    console.log(newValue);
    setValue({
      ...value,
      config: newValue,
      startingCapital: Math.round(
        newValue.propertyValue * (1 - newValue.percentage)
      ),
    });
  };

  return (
    <div className="App">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Inputs</Card.Title>
          <Card.Body>
            <MortgageProperties
              dataChange={(childValue: MortgageConfig) =>
                valueChanged(childValue)
              }
            ></MortgageProperties>
          </Card.Body>
        </Card.Body>
      </Card>

      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Results</Card.Title>
          <Card.Body>
            {value?.config ? (
              <div className="results">
                Capital required {value.startingCapital}
              </div>
            ) : (
              <div>Press submit</div>
            )}
          </Card.Body>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
