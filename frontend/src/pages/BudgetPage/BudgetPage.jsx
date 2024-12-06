import BudgetApp from "../../components/BudgetComponents/BudgetApp";
import BudgetChart from "../../components/BudgetComponents/BudgetChart";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./BudgetPage.scss";

const tips = [
  "Set clear savings goals for both short-term and long-term needs.",
  "Pay yourself first by automatically transferring a portion of your income to savings.",
  "Build an emergency fund to cover 3–6 months of living expenses.",
  "Use high-yield savings accounts to maximize interest earned on savings.",
  "Save windfalls like bonuses, tax refunds, or gifts instead of spending them.",
  "Track your savings progress using apps or spreadsheets.",
  "Eliminate unnecessary subscriptions to cut down on recurring costs.",
  "Start small by saving a percentage of each paycheck and increasing it over time.",
  "Create a shopping list to avoid impulse purchases.",
  "Compare prices using tools or apps to find the best deals.",
  "Take advantage of discounts like student, senior, or membership discounts.",
  "Buy in bulk for non-perishable items to save money over time.",
  "Wait 24–48 hours before making big purchases to ensure they’re necessary.",
  "Avoid emotional spending by finding healthier ways to cope with stress or boredom.",
  "Use cash for discretionary spending to limit overspending.",
  "Look for quality over quantity and invest in durable products.",
  "Track all income and expenses using budgeting apps, spreadsheets, or manual methods.",
  "Use the 50/30/20 rule for budgeting: 50% for essentials, 30% for wants, and 20% for savings and debt repayment.",
  "Prioritize debt repayment, focusing on high-interest debt first.",
  "Automate bill payments and savings contributions to avoid missed deadlines.",
  "Adjust your budget regularly to reflect changing circumstances.",
  "Plan for non-monthly expenses like holidays, car maintenance, or annual bills.",
  "Track budget variances to identify and address areas of overspending.",
  "Create sinking funds by saving incrementally for specific goals like vacations or new gadgets."
];


const getRandomTip = () => {
  const shuffled = tips.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 1);
};


export default function BudgetPage() {

  const [randomTip, setRandomTip] = useState(getRandomTip());

  useEffect(() => {
    const factInterval = setInterval(() => {
        setRandomTip(getRandomTip());
    }, 5000); 

    return () => {
        clearInterval(factInterval);
    };
    }, []);

  return (
    <div className="budget-cont">
      <div className="tips-section row">
        <div className="col">
          <div className="tips-container container text-center rounded">
              {randomTip.map((tip, index) => (
                  <motion.div
                      key={tip + index}
                      initial={{ opacity: 0, scale: 0.0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                          delay: 0.5 * index,
                          duration: 1,
                          ease: [0, 0.71, 0.2, 1.01],
                      }}
                  >
                      <h3 className='tip'>{tip}</h3>
                  </motion.div>
              ))}
            </div>
          </div>
      </div>
      <div class="budget-section container text-center">
        <div class="row align-items-start">
          <div class="col">
            <h1 className="me-auto">Breakdown</h1>
            <div className="chart-container">
              <BudgetChart />
            </div>
          </div>
          <div class="col">
            <h1 className="me-auto">Budgets</h1>
            <div className="budgets-container">
              <BudgetApp />
            </div>
          </div>
      </div>
    </div>
    </div>
    
  );
}
