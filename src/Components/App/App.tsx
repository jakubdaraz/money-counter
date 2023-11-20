import "./App.css";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import MortgageProperties from "../MortgageProperties/MortgageProperties";
import React from "react";
import FixationPicker from "Components/FixationPicker/FixationPicker";
import {
  MortgageFixations,
  Fixation,
} from "Components/FixationPicker/Fixations.interface";
import axios from "axios";
import { SpendingPlanConfig } from "./SpengingPlan.interface";

// const backend = "localhost:52830";
const backend = "92.52.46.38:52830";

interface AppState {
  config?: SpendingPlanConfig;
  startingCapital?: number;
  fixations?: MortgageFixations;
  selectedFixation?: Fixation;
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  valueChanged = (newValue: SpendingPlanConfig) => {
    if (newValue.costs.useActualMortgage) {
      const mortgageConfig = newValue.costs.mortgageConfig;
      const loanAmount = Math.round(
        mortgageConfig.propertyValue * mortgageConfig.percentage
      );
      axios
        .get(
          "http://" +
            backend +
            "/calculateMortgage?loanAmount=" +
            loanAmount +
            "&productType=HTB" +
            "&loanDuration=" +
            mortgageConfig.loanDuration
        )
        .then((response) => {
          const fixations = response.data;
          this.setState({
            ...this.state,
            config: newValue,
            fixations,
            startingCapital: Math.round(
              mortgageConfig.propertyValue * (1 - mortgageConfig.percentage)
            ),
          });
        });
    } else {
      this.setState({
        ...this.state,
        config: newValue,
        startingCapital: 0,
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Card>
          <Card.Body>
            <Card.Title>Inputs</Card.Title>
            <MortgageProperties
              dataChange={(childValue: SpendingPlanConfig) =>
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
                {this.state?.startingCapital > 0 ? (
                  <div className="capital">
                    Capital required {this.state.startingCapital}
                  </div>
                ) : (
                  ""
                )}
                <div>
                  Total Monthly Costs: {getTotalMonthlyCosts(this.state)}
                </div>
                <div>Total Yearly Costs: {getTotalYearlyCosts(this.state)}</div>
                <div>
                  Total Remaining Costs:{" "}
                  {getRemainingTotalYearlyCosts(this.state)}{" "}
                </div>
                <div className="years">
                  <div className="months">
                    {getResults(this.state, 0, 30 * 12)}
                  </div>
                </div>
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

function getTotalMonthlyCosts(state: AppState) {
  return (
    state.config.costs.monthlyCostsOverride +
    (state.selectedFixation?.fixation ?? state.config.costs.mortgageOverride)
  );
}

function getTotalYearlyCosts(state: AppState) {
  return 12 * getTotalMonthlyCosts(state);
}

function getRemainingTotalYearlyCosts(state: AppState) {
  let nextYearlyMonth = state.config.income?.yearlyIncomeMonth;
  const currentMonth = new Date().getMonth();
  if (currentMonth >= nextYearlyMonth) {
    nextYearlyMonth += 11;
  }
  return (nextYearlyMonth - currentMonth) * getTotalMonthlyCosts(state);
}

function getResults(config: AppState, monthsOffset: number, months: number) {
  const results = [];
  for (let i = monthsOffset; i < months; i++) {
    results.push(resultMonth(config, i));
  }
  return results;
}

function resultMonth(config: AppState, month: number) {
  const date = new Date();
  date.setMonth(date.getMonth() + month);
  const funds = remainingFunds(config, month);
  const newYear = date.getMonth() === 0;
  return (
    <div className="month">
      <div>
        <b>{newYear ? date.getFullYear() : ""} </b>
        {date.getMonth() + 1}
      </div>
      <div style={{ color: funds < 0 ? "red" : "unset" }}>{funds}</div>
    </div>
  );
}

function remainingFunds(state: AppState, month: number) {
  const config = state.config;
  const mortgageDebit = config.costs.useActualMortgage
    ? month < config.costs.mortgageConfig.loanDuration * 12
      ? month * state.selectedFixation?.installmentAmount
      : 0
    : month * state.config.costs.mortgageOverride;
  const remainingFunds =
    config.currentFunds -
    state.startingCapital -
    month * config.costs.monthlyCostsOverride -
    mortgageDebit +
    month * config.income.monthlyIncome +
    Math.floor(
      (new Date().getMonth() - config.income.yearlyIncomeMonth + month) / 12
    ) *
      config.income.yearlyIncome;
  return Math.round(remainingFunds);
}

export default App;
