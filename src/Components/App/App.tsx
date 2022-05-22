import "./App.css";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import MortgageProperties from "../MortgageProperties/MortgageProperties";
import { MortgageConfig } from "Components/MortgageProperties/MortgageConfig.interface";
import React from "react";
import FixationPicker from "Components/FixationPicker/FixationPicker";
import { MortgageFixations } from "Components/FixationPicker/Fixations.interface";

interface AppState {
  config?: MortgageConfig;
  startingCapital?: number;
  fixations?: MortgageFixations;
}

class App extends React.Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      fixations: {
        perFixations: {
          "1": {
            fixation: 1,
            loanInterestRate: 1.09,
            installmentAmount: 325.79,
            rpmn: 1.31,
            totalAmount: 120653.94,
            loanFee: 175.0,
            ratingFee: 250.0,
            cadasterFee: 66.0,
            estateInsurance: 100.0,
            loanDuration: 30,
            lastInstallmentAmount: 204.33,
          },
          "2": {
            fixation: 2,
            loanInterestRate: 1.49,
            installmentAmount: 344.64,
            rpmn: 1.71,
            totalAmount: 127374.28,
            loanFee: 175.0,
            ratingFee: 250.0,
            cadasterFee: 66.0,
            estateInsurance: 100.0,
            loanDuration: 30,
            lastInstallmentAmount: 157.52,
          },
          "3": {
            fixation: 3,
            loanInterestRate: 1.99,
            installmentAmount: 369.12,
            rpmn: 2.22,
            totalAmount: 136083.31,
            loanFee: 175.0,
            ratingFee: 250.0,
            cadasterFee: 66.0,
            estateInsurance: 100.0,
            loanDuration: 30,
            lastInstallmentAmount: 78.23,
          },
          "5": {
            fixation: 5,
            loanInterestRate: 2.19,
            installmentAmount: 379.19,
            rpmn: 2.42,
            totalAmount: 139661.37,
            loanFee: 175.0,
            ratingFee: 250.0,
            cadasterFee: 66.0,
            estateInsurance: 100.0,
            loanDuration: 30,
            lastInstallmentAmount: 41.16,
          },
          "7": {
            fixation: 7,
            loanInterestRate: 2.29,
            installmentAmount: 384.29,
            rpmn: 2.52,
            totalAmount: 141469.32,
            loanFee: 175.0,
            ratingFee: 250.0,
            cadasterFee: 66.0,
            estateInsurance: 100.0,
            loanDuration: 30,
            lastInstallmentAmount: 18.21,
          },
          "10": {
            fixation: 10,
            loanInterestRate: 2.59,
            installmentAmount: 399.82,
            rpmn: 2.83,
            totalAmount: 146971.87,
            loanFee: 175.0,
            ratingFee: 250.0,
            cadasterFee: 66.0,
            estateInsurance: 100.0,
            loanDuration: 30,
            lastInstallmentAmount: 345.31,
          },
        },
        loanAmount: 100000.0,
        loanDuration: 30,
        currency: null,
        loanDurationMonths: 360,
      },
    };
  }

  valueChanged = (newValue: MortgageConfig) => {
    this.setState({
      ...this.state,
      config: newValue,
      startingCapital: Math.round(
        newValue.propertyValue * (1 - newValue.percentage)
      ),
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
              <Card.Title>Fixations</Card.Title>
              <FixationPicker
                fixations={this.state.fixations}
                fixationSelected={(fixation) => console.log(fixation)}
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
  return (
    config.currentFunds -
    state.startingCapital -
    month * config.monthlyCosts +
    month * config.monthlyIncome +
    Math.floor(month / 12) * config.yearlyIncome
  );
}

export default App;
