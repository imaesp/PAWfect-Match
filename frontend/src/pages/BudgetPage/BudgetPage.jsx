import BudgetApp from "../../components/BudgetComponents/BudgetApp";
import BudgetChart from "../../components/BudgetComponents/BudgetChart";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./BudgetPage.scss";

const tips = [
  "Did you know? Pet care costs can range from $1,500 to $2,000 annually. Households with an income of $60,000 or more are often better equipped to cover these expenses, especially for dogs",
  "Adoption fees vary widely, ranging from $50 to $500 depending on the shelter and the animal's breed and age",
  "Did you know? Many shelters include spaying/neutering in the adoption fee, saving you $200–$500",
  "Expect to budget $200–$500 annually for routine vet visits and vaccinations",
  "Adjust your budget regularly to reflect changing circumstances",
  "Emergency medical care can cost $1,000–$5,000. Consider pet insurance to cover unexpected costs!",
  "Pet insurance can range from $20–$50 per month and helps with unexpected medical expenses",
  "Track expenses to identify and address areas of overspending",
  "Planning a vacation? Boarding a pet costs $25–$85 per night, or you can hire a sitter for $15–$50 per visit",
  "Certain breeds require regular grooming, costing $30–$90 per session",
  "Tip: Set aside $50–$100 per month in a pet emergency fund to cover unexpected costs",
  "Senior pets often have lower upfront costs but may need more frequent medical care",
  "Thinking about a puppy? Puppies can cost $2,000+ in their first year due to vaccinations, training, and supplies"
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
            <h1 className="main-budget me-auto">Budgets</h1>
            <div className="budgets-container">
              <BudgetApp />
            </div>
          </div>
      </div>
    </div>
    </div>
    
  );
}
