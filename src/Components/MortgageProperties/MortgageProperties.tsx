import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import RangeSlider from "react-bootstrap-range-slider";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { MortgageConfig } from "./MortgageConfig.interface";

function MortgageProperties({ dataChange }) {
  const maxPropertyValue = 300000;
  const percentage = 0.8;
  const defaultState: MortgageConfig = {
    propertyValue: 230000,
    loanDuration: 30,
    percentage,
    monthlyCosts: 1000,
    monthlyIncome: 250,
    yearlyIncome: 37000,
    yearlyIncomeMonth: 4,
    currentFunds: 50000,
  };
  const [value, setValue] = useState(defaultState);

  const update = (newValue: MortgageConfig) => {
    setValue(newValue);
  };

  return (
    <Form className="form">
      <Form.Group className="mb-3" controlId="propertyValue">
        <Form.Label>Property value</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter property value"
          value={value.propertyValue}
          onChange={(changeEvent) =>
            update({
              ...value,
              propertyValue: +changeEvent.target.value,
            })
          }
          max={maxPropertyValue}
        />
        <RangeSlider
          value={value.propertyValue}
          onChange={(changeEvent) =>
            update({
              ...value,
              propertyValue: +changeEvent.target.value,
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
          value={value.loanDuration}
          onChange={(changeEvent) =>
            update({
              ...value,
              loanDuration: +changeEvent.target.value,
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
          value={value.percentage}
          onChange={(changeEvent) =>
            update({
              ...value,
              percentage: +changeEvent.target.value,
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

      <Form.Group className="mb-3" controlId="monthlyCosts">
        <Form.Label>Monthly costs</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter monthly costs"
          value={value.monthlyCosts}
          onChange={(changeEvent) =>
            update({
              ...value,
              monthlyCosts: +changeEvent.target.value,
            })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="monthlyIncome">
        <Form.Label>Monthly income</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter monthly income"
          value={value.monthlyIncome}
          onChange={(changeEvent) =>
            update({
              ...value,
              monthlyIncome: +changeEvent.target.value,
            })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="yearlyIncome">
        <Form.Label>Yearly income</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter yearly income"
          value={value.yearlyIncome}
          onChange={(changeEvent) =>
            update({
              ...value,
              yearlyIncome: +changeEvent.target.value,
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
