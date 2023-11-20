import { MortgageConfig } from "Components/MortgageProperties/MortgageConfig.interface";

export interface SpendingPlanConfig {
  currentFunds: number;
  income: IncomeConfig;
  costs: CostsConfig;
}

export interface IncomeConfig {
  monthlyIncome: number;
  yearlyIncomeMonth: number;
  yearlyIncome: number;
}

export interface CostsConfig {
  useActualMortgage: boolean;
  mortgageOverride: number;
  mortgageConfig: MortgageConfig;
  monthlyCostsOverride: number;
  monthlyCosts: Cost[];
}

export interface Cost {
  value: number;
  name: string;
}
