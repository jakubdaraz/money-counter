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
      <Card>
        <Card.Body>
          <Card.Title>Inputs</Card.Title>
          <MortgageProperties
            dataChange={(childValue: MortgageConfig) =>
              valueChanged(childValue)
            }
          ></MortgageProperties>
        </Card.Body>
      </Card>

      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>Results</Card.Title>
          {value?.config ? (
            <div className="results">
              Capital required {value.startingCapital}
              <div className="months">{getResults(value, 50)}</div>
            </div>
          ) : (
            <div>Press submit</div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

function getResults(config: AppState, months: number) {
  const results = [];
  for (let i = 0; i < months; i++) {
    results.push(resultMonth(config, i));
  }
  return results;
}

function resultMonth(config: AppState, month: number) {
  const date = new Date();
  date.setMonth(date.getMonth() + month);
  const funds = remainingFunds(config, month);
  return (
    <div className="mb-3">
      <h4>
        {date.getFullYear()} {date.getMonth() + 1}
      </h4>
      <div style={{ color: funds < 0 ? "red" : "unset" }}>{funds}</div>
    </div>
  );
}

function remainingFunds(state: AppState, month: number) {
  const config = state.config;
  return (
    config.currentFunds -
    state.startingCapital -
    month * config.monthlyCosts +
    month * config.monthlyIncome +
    Math.floor(month / 12) * config.yearlyIncome
  );
}

export default App;
