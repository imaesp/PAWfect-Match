import { useBudgets } from "./BudgetsContext";
import BudgetCard from "./BudgetCard";

/*
The following code returns a budget card consisting of total expenses/total budget.
*/

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);
  if (max === 0) {
    return null;
  }

  return (
    <BudgetCard
      className="reg-card"
      amount={amount}
      name="Total"
      max={max}
      hideButtons
    />
  );
}
