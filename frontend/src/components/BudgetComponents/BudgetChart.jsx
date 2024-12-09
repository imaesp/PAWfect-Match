import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react"; // Import Clerk's useAuth
import supabase from "../../supabase/supabaseClient";
import "./BudgetChart.scss";

export default function BudgetChart() {
  const [chartData, setChartData] = useState([]);
  const [chartWidth, setChartWidth] = useState(800); // Default width for larger screens
  const [chartHeight, setChartHeight] = useState(400); // Default height
  const { userId } = useAuth(); // NEW Get the current user's ID

  // Adjust chart size on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setChartWidth(window.innerWidth - 40); // Adjust width for small screens
        setChartHeight(300); // Adjust height for small screens
      } else {
        setChartWidth(800); // Default width for larger screens
        setChartHeight(400); // Default height for larger screens
      }
    };

    handleResize(); // Set initial size based on current window size
    window.addEventListener("resize", handleResize); // Add event listener for resize

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!userId) return; // Ensure userId is available

    const fetchChartData = async () => {
      try {
        // Fetch budgets for the logged-in user
        const { data: budgets, error: budgetsError } = await supabase
          .from("budgets")
          .select("*")
          .eq("userId", userId);
        if (budgetsError) throw budgetsError;

        // Fetch expenses for the logged-in user
        const { data: expenses, error: expensesError } = await supabase
          .from("expenses")
          .select("*")
          .eq("userId", userId);
        if (expensesError) throw expensesError;

        let remaining = 0;
        // Aggregate data based on budgets and expenses
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
        aggregateData.push({
          id: "remaining",
          value: remaining,
          label: "Remaining",
        });

        setChartData(aggregateData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchChartData();
  }, [userId]); // Refetch whenever userId changes

  return (
    <PieChart
      className="pie-chart"
      margin={{ top: -25, bottom: 50, left: 50, right: 50 }}
      colors={[
        "#bfa697",
        "#eeeaea",
        "#de9d76",
        "#f5b26b",
        "#ffca93",
        "#5A464C",
      ]}
      series={[{ data: chartData }]}
      width={chartWidth}
      height={chartHeight}
      slotProps={{
        legend: {
          direction: "row",
          position: { vertical: "bottom", horizontal: "middle" },
          padding: -10,
        },
      }}
    />
  );
}
