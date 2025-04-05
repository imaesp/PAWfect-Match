import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import supabase from "../../supabase/supabaseClient";
import Mock from "./MockChart";
import "./BudgetChart.scss";

export default function BudgetChart() {
  const [chartData, setChartData] = useState([]);
  const [chartWidth, setChartWidth] = useState(800);
  const [chartHeight, setChartHeight] = useState(400);
  const { userId } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setChartWidth(window.innerWidth - 40);
        setChartHeight(300);
      } else {
        setChartWidth(800);
        setChartHeight(400);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchChartData = async () => {
      try {
        const { data: budgets, error: budgetsError } = await supabase
          .from("budgets")
          .select("*")
          .eq("userId", userId);
        if (budgetsError) throw budgetsError;

        const { data: expenses, error: expensesError } = await supabase
          .from("expenses")
          .select("*")
          .eq("userId", userId);
        if (expensesError) throw expensesError;

        let remaining = 0;
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

        const uncategorized = expenses
          .filter((expense) => expense.budgetId === "Uncategorized")
          .reduce((sum, expense) => sum + expense.amount, 0);

        remaining -= uncategorized;

        aggregateData.push({
          id: "uncategorized",
          value: uncategorized,
          label: "Uncategorized",
        });
        
        if (remaining > 0) {
          aggregateData.push({
            id: "remaining",
            value: remaining,
            label: "Remaining",
          });
      }

        setChartData(aggregateData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchChartData();
  }, [userId]);

  return (
    <>
      {chartData.length > 0 ? (
        <Mock data={chartData} width={chartWidth} height={chartHeight} />
      ) : (
        <p>Loading chart...</p>
      )}
    </>
  );
}




