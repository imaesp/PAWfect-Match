import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";

/*
The following code retrieves data from local storage to generate a pie chart.
*/

export default function BudgetChart() {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const storedBudgets = localStorage.getItem("budgets");
    const storedExpenses = localStorage.getItem("expenses");
    if (storedBudgets && storedExpenses) {
      const budgets = JSON.parse(storedBudgets);
      const expenses = JSON.parse(storedExpenses);
      let remaining = 0;
      // Retrieve the total expenses for each budget by checking if budget.id (mapped from budgets) matches expense.budgetId (from expenses)
      const aggregateData = budgets.map((budget) => {
        const totalExpenses = expenses
          .filter((expense) => expense.budgetId === budget.id)
          .reduce((sum, expense) => sum + expense.amount, 0);
        remaining = remaining + budget.max - totalExpenses;
        return {
          id: budget.id,
          value: totalExpenses,
          label: budget.name,
        };
      });
      let uncategorized = 0;
      expenses.map((expense) => {
        const uncategorizedTotal = expenses
          .filter((expense) => expense.budgetId === "Uncategorized")
          .reduce((sum, expense) => sum + expense.amount, 0);
        uncategorized = uncategorizedTotal;
      });
      remaining -= uncategorized;
      // Push the uncategorized and remaining values to aggregateData
      aggregateData.push({
        id: "uncategorized",
        value: uncategorized,
        label: "Uncategorized",
      });
      aggregateData.push({
        id: "remaining",
        value: remaining,
        label: "Remaining",
      });
      setChartData(aggregateData);
    }
  }, []);
  return (
    <PieChart
      colors={[
        // "#4a4a48",
        // "#7e7067",
        // "#a4968e",
        "#bfa697",
        // "#ece2d8",
        "#eeeaea",
        "#de9d76",
        "#f5b26b",
        "#ffca93",
      ]}
      series={[
        {
          data: chartData,
        },
      ]}
      width={800}
      height={400}
    />
  );
}
