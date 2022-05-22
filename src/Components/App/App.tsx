import "./App.css";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import MortgageProperties from "../MortgageProperties/MortgageProperties";
import { MortgageConfig } from "Components/MortgageProperties/MortgageConfig.interface";
import React from "react";
import FixationPicker from "Components/FixationPicker/FixationPicker";
import {
  MortgageFixations,
  Fixation,
} from "Components/FixationPicker/Fixations.interface";
import axios from "axios";
import { stat } from "fs";

interface AppState {
  config?: MortgageConfig;
  startingCapital?: number;
  fixations?: MortgageFixations;
  selectedFixation?: Fixation;
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  valueChanged = (newValue: MortgageConfig) => {
    const loanAmount = Math.round(newValue.propertyValue * newValue.percentage);
    axios
      .get("http://localhost:8090/calculateMortgage?loanAmount=" + loanAmount)
      .then((response) => {
        const fixations = response.data;
        this.setState({
          ...this.state,
          config: newValue,
          fixations,
          startingCapital: Math.round(
            newValue.propertyValue * (1 - newValue.percentage)
          ),
        });
      });
  };

  render() {
    return (
      <div className="App">
        <Card>
          <Card.Body>
            <Card.Title>Inputs</Card.Title>
            <MortgageProperties
              dataChange={(childValue: MortgageConfig) =>
                this.valueChanged(childValue)
              }
            ></MortgageProperties>
          </Card.Body>
        </Card>

        {this.state?.fixations ? (
          <Card style={{ width: "30rem" }}>
            <Card.Body>
              <Card.Title>
                Fixations for loan amount - {this.state.fixations.loanAmount}
              </Card.Title>
              <FixationPicker
                fixations={this.state.fixations}
                fixationSelected={(fixation) =>
                  this.setState({ ...this.state, selectedFixation: fixation })
                }
              ></FixationPicker>
            </Card.Body>
          </Card>
        ) : (
          ""
        )}

        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title>Results</Card.Title>
            {this.state?.config ? (
              <div className="results">
                Capital required {this.state.startingCapital}
                <div className="months">{getResults(this.state, 50)}</div>
              </div>
            ) : (
              <div>Press submit</div>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }
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
  const remainingFunds =
    config.currentFunds -
    state.startingCapital -
    month * config.monthlyCosts -
    month * state.selectedFixation?.installmentAmount +
    month * config.monthlyIncome +
    Math.floor(month / 12) * config.yearlyIncome;
  return Math.round(remainingFunds);
}

export default App;
