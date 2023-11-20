import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import RangeSlider from "react-bootstrap-range-slider";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { SpendingPlanConfig } from "Components/App/SpengingPlan.interface";

function MortgageProperties({ dataChange }) {
  const maxPropertyValue = 300000;
  const percentage = 0.8;
  const defaultState: SpendingPlanConfig = {
    costs: {
      useActualMortgage: false,
      mortgageOverride: 950,
      mortgageConfig: {
        propertyValue: 230000,
        loanDuration: 30,
        percentage,
      },
      monthlyCosts: [],
      monthlyCostsOverride: 1000,
    },
    income: {
      monthlyIncome: 250,
      yearlyIncome: 37000,
      yearlyIncomeMonth: 4,
    },

    currentFunds: 50000,
  };
  const [value, setValue] = useState(defaultState);

  const update = (newValue: SpendingPlanConfig) => {
    setValue(newValue);
    // update automatically since we don't need to wait for any BE calls
    if (!newValue?.costs?.useActualMortgage) {
      dataChange(newValue);
    }
  };

  return (
    <Form className="form">
      <Form.Group className="mb-3" controlId="useActualMortgage">
        <Form.Label>Use actual mortgage</Form.Label>
        <Form.Check
          type="checkbox"
          checked={value.costs.useActualMortgage}
          onChange={() =>
            update({
              ...value,
              costs: {
                ...value.costs,
                useActualMortgage: !value.costs.useActualMortgage,
              },
            })
          }
        ></Form.Check>
      </Form.Group>
      {value.costs.useActualMortgage ? (
        <div>
          <Form.Group className="mb-3" controlId="propertyValue">
            <Form.Label>Property value</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter property value"
              value={value.costs.mortgageConfig.propertyValue}
              onChange={(changeEvent) =>
                update({
                  ...value,
                  costs: {
                    ...value.costs,
                    mortgageConfig: {
                      ...value.costs.mortgageConfig,
                      propertyValue: +changeEvent.target.value,
                    },
                  },
                })
              }
              max={maxPropertyValue}
            />
            <RangeSlider
              value={value.costs.mortgageConfig.propertyValue}
              onChange={(changeEvent) =>
                update({
                  ...value,
                  costs: {
                    ...value.costs,
                    mortgageConfig: {
                      ...value.costs.mortgageConfig,
                      propertyValue: +changeEvent.target.value,
                    },
                  },
                })
              }
              max={maxPropertyValue}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="loanDuration">
            <div>
              <Form.Label>Loan Duration</Form.Label>
            </div>
            <RangeSlider
              value={value.costs.mortgageConfig.loanDuration}
              onChange={(changeEvent) =>
                update({
                  ...value,
                  costs: {
                    ...value.costs,
                    mortgageConfig: {
                      ...value.costs.mortgageConfig,
                      loanDuration: +changeEvent.target.value,
                    },
                  },
                })
              }
              min={4}
              max={30}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="percentage">
            <Form.Label>Percentage</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={value.costs.mortgageConfig.percentage}
              onChange={(changeEvent) =>
                update({
                  ...value,
                  costs: {
                    ...value.costs,
                    mortgageConfig: {
                      ...value.costs.mortgageConfig,
                      percentage: +changeEvent.target.value,
                    },
                  },
                })
              }
            >
              <option value="0.6">60%</option>
              <option value="0.65">65%</option>
              <option value="0.7">70%</option>
              <option value="0.75">75%</option>
              <option value="0.8">80%</option>
              <option value="0.9">90%</option>
              <option value="1">100%</option>
            </Form.Select>
          </Form.Group>
        </div>
      ) : (
        <Form.Group className="mb-3" controlId="mortgageOverride">
          <Form.Label>Mortgage fixation amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter mortgage fixation amount"
            value={value.costs.mortgageOverride}
            onChange={(changeEvent) =>
              update({
                ...value,
                costs: {
                  ...value.costs,
                  mortgageOverride: +changeEvent.target.value,
                },
              })
            }
          />
        </Form.Group>
      )}

      <Form.Group className="mb-3" controlId="monthlyCosts">
        <Form.Label>Monthly costs</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter monthly costs"
          value={value.costs.monthlyCostsOverride}
          onChange={(changeEvent) =>
            update({
              ...value,
              costs: {
                ...value.costs,
                monthlyCostsOverride: +changeEvent.target.value,
              },
            })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="monthlyIncome">
        <Form.Label>Monthly income</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter monthly income"
          value={value.income.monthlyIncome}
          onChange={(changeEvent) =>
            update({
              ...value,
              income: {
                ...value.income,
                monthlyIncome: +changeEvent.target.value,
              },
            })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="yearlyIncome">
        <Form.Label>Yearly income</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter yearly income"
          value={value.income.yearlyIncome}
          onChange={(changeEvent) =>
            update({
              ...value,
              income: {
                ...value.income,
                yearlyIncome: +changeEvent.target.value,
              },
            })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="currentFunds">
        <Form.Label>Current funds</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter current funds"
          value={value.currentFunds}
          onChange={(changeEvent) =>
            update({
              ...value,
              currentFunds: +changeEvent.target.value,
            })
          }
        />
      </Form.Group>

      <Button variant="primary" onClick={() => dataChange(value)}>
        Submit
      </Button>
    </Form>
  );
}

export default MortgageProperties;
