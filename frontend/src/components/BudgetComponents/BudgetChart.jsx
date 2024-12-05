import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react"; // Import Clerk's useAuth
import supabase from '../../supabase/supabaseClient';

export default function BudgetChart() {
  const [chartData, setChartData] = useState([]);
  const { userId } = useAuth(); // NEW Get the current user's ID

  useEffect(() => {
    if (!userId) return; // NEW Ensure userId is available

    const fetchChartData = async () => {
      try {
        // Fetch budgets for the logged-in user
        const { data: budgets, error: budgetsError } = await supabase
          .from("budgets")
          .select("*")
          .eq("userId", userId); // CHECK THAT THE CURRENT USERID MATCHES THE ONE IN THE DATABASE
        if (budgetsError) throw budgetsError;

        // Fetch expenses for the logged-in user
        const { data: expenses, error: expensesError } = await supabase
          .from("expenses")
          .select("*")
          .eq("userId", userId); // CHECK THAT THE CURRENT USERID MATCHES THE ONE IN THE DATABASE
        if (expensesError) throw expensesError;

        let remaining = 0; // Line 16 in Original Code
         // Retrieve the total expenses for each budget by checking if budget.id (mapped from budgets) matches expense.budgetId (from expenses)
        const aggregateData = budgets.map((budget) => {
          const totalExpenses = expenses
            .filter((expense) => expense.budgetId === budget.id)
            .reduce((sum, expense) => sum + expense.amount, 0);
          remaining += budget.max - totalExpenses;

          return {
            id: budget.id,
            value: totalExpenses,
            label: budget.name,
          };
        });
        // Our logic checks for expenses with budgetId, no need to map through it again
        const uncategorized = expenses // Line 31 in Original Code
          .filter((expense) => expense.budgetId === "Uncategorized")
          .reduce((sum, expense) => sum + expense.amount, 0);

        
        remaining -= uncategorized;

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
      } catch (error) {
        console.error("Error fetching data", error); // Catch error in case Supabase can't find the record
      }
    };

    fetchChartData();
  }, [userId]); // Refetch whenever userId changes

  return (
    <PieChart
      colors={["#bfa697", "#eeeaea", "#de9d76", "#f5b26b", "#ffca93", "#5A464C"]}
      series={[{ data: chartData }]}
      width={800}
      height={400}
    />
  );
}
