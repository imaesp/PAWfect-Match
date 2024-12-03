import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./BudgetsContext";
import BudgetCard from "./BudgetCard";

/*
The following code returns a budget card for uncategorized expenses.
*/

export default function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );
  if (amount === 0) {
    return null;
  }

  return <BudgetCard amount={amount} name="Uncategorized" {...props} />;
}
