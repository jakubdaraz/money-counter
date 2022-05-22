export interface MortgageFixations {
  currency: any;
  loanAmount: number;
  loanDuration: number;
  loanDurationMonths: number;
  perFixations: Record<string, Fixation>;
}

export interface Fixation {
  cadasterFee: number;
  estateInsurance: number;
  fixation: number;
  installmentAmount: number;
  lastInstallmentAmount: number;
  loanDuration: number;
  loanFee: number;
  loanInterestRate: number;
  ratingFee: number;
  rpmn: number;
  totalAmount: number;
}
