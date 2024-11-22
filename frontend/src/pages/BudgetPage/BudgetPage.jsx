import BudgetApp from "../../components/BudgetComponents/BudgetApp";
import BudgetChart from "../../components/BudgetComponents/BudgetChart";
import "./BudgetPage.scss";

export default function BudgetPage() {
  return (
    <div className="budget-pg">
      <BudgetChart />
      <BudgetApp />
    </div>
  );
}
