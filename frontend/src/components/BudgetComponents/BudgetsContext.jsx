import React, { useContext, useState, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import { useAuth } from "@clerk/clerk-react"; // Import Clerk's useAuth
import supabase from "../../supabase/supabaseClient";

const BudgetsContext = React.createContext();
export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]); // We get rid of the custom hook.
  const [expenses, setExpenses] = useState([]); // We get rid of the custom hook.
  const { userId, getToken } = useAuth(); // Get the current user's ID and token retrieval function

  // Fetch budgets and expenses from Supabase on mount
  useEffect(() => {
    if (!userId) return; // Ensure userId is available

    const fetchBudgetsAndExpenses = async () => {
      try {
        const token = await getToken();

        // Attach the token as a Bearer token for Supabase requests
        // This is how we make sure that the user is authenticated
        supabase.auth.setSession({ access_token: token });

        // Fetch budgets for the logged-in user
        const { data: budgetsData, error: budgetsError } = await supabase
          .from("budgets")
          .select("*")
          .eq("userId", userId);
        if (budgetsError) throw budgetsError;

        // Fetch expenses for the logged-in user
        const { data: expensesData, error: expensesError } = await supabase
          .from("expenses")
          .select("*")
          .eq("userId", userId);
        if (expensesError) throw expensesError;

        setBudgets(budgetsData || []); // Ensure fallback to empty array
        setExpenses(expensesData || []);
      } catch (error) {
        console.error("Error fetching data from Supabase:", error);
        setBudgets([]); // Fallback in case of error
        setExpenses([]);
      }
    };

    fetchBudgetsAndExpenses();
  }, [userId]); // Refetch when userId changes

  // Retrieve expenses for a specific budget
  function getBudgetExpenses(budgetId) { // line 17 in orginal code
    if (!expenses) return []; // Check if null
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  // Add an expense to Supabase
  async function addExpense({ description, amount, budgetId }) {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .insert([{ id: uuidV4(), description, amount, budgetId, userId }])
        .select(); // Ensure the inserted row is returned
      if (error) throw error;

      setExpenses((prevExpenses) => [...prevExpenses, ...(data || [])]);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  }

  // Add a budget to Supabase
  async function addBudget({ name, max }) {
    try {
      // Check if a budget with the same name already exists
      const existingBudget = budgets.find((budget) => budget.name === name);
      if (existingBudget) return;

      const { data, error } = await supabase
        .from("budgets")
        .insert([{ id: uuidV4(), name, max, userId }])
        .select(); // Ensure the inserted row is returned
      if (error) throw error;

      setBudgets((prevBudgets) => [...prevBudgets, ...(data || [])]);
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  }

  // Delete a budget and update related expenses
  async function deleteBudget({ id }) {
    try {
      // Update expenses related to the deleted budget to uncategorized
      const { error: updateError } = await supabase
        .from("expenses")
        .update({ budgetId: UNCATEGORIZED_BUDGET_ID })
        .eq("budgetId", id)
        .eq("userId", userId); // Ensure only the user's data is affected
      if (updateError) throw updateError;

      // Delete the budget
      const { error: deleteError } = await supabase
        .from("budgets")
        .delete()
        .eq("id", id)
        .eq("userId", userId); // Ensure only the user's data is affected
      if (deleteError) throw deleteError;

      // Update state THX CHATGPT <3
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.budgetId !== id
            ? expense
            : { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
        )
      );
      setBudgets((prevBudgets) => prevBudgets.filter((budget) => budget.id !== id));
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  }

  // Delete an expense from Supabase
  async function deleteExpense({ id }) {
    try {
      const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id)
        .eq("userId", userId); // Ensure only the user's data is affected
      if (error) throw error;

      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
