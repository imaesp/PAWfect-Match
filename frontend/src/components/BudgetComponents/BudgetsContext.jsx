import React, { useContext } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const BudgetsProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  // Return objects matching the budgetId
  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  // Add an expense object to expenses (localStorage)
  function addExpense({ description, amount, budgetId }) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }

  // Add a budget object to budgets (localStorage) if it does not already exist
  function addBudget({ name, max }) {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }

  // Returns arrays of objects not matching the provided id
  function deleteBudget({ id }) {
    // Return an array of objects where expense.budgetId is not equal to id (amends expenses in localStorage)
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) {
          return expense;
        }
        // Append the uncategorized budget
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });

    // Return an array of objects where budget.id is not equal to id (amends the budgets in localStorage)
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }

  // Return an array of objects where expense.id is not equal to id (amends expenses in localStorage)
  function deleteExpense({ id }) {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
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
