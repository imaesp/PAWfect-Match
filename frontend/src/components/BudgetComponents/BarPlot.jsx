import { useBudgets } from "./BudgetsContext";
import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { format, isSameMonth, parseISO } from "date-fns";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

export const Barplot = ({ width, height }) => {
  const { budgets, expenses } = useBudgets();
  const [scope, setScope] = useState("all"); // all, monthly
  const axesRef = useRef(null);

  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  function getBudgetExpenses(budgetId) {
    if (!expenses) return [];
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  const filteredBudgets = useMemo(() => {
    const now = new Date();
    if (scope === "monthly") {
      return budgets.filter((budget) => 
        isSameMonth(parseISO(budget.created_at), now)
      );
    }
    return budgets;
  }, [budgets, scope]);

  // X-axis: budget names
  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(filteredBudgets.map((d) => d.name))
      .range([0, boundsWidth])
      .padding(0.4);
  }, [filteredBudgets, width]);

  // Y-axis: maximum budget value
  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([
        0,
        d3.max(filteredBudgets, (d) => 
          Math.max(d.max, getBudgetExpenses(d.id).reduce((acc, e) => acc + e.amount, 0))
        ) || 0
      ])
      .range([boundsHeight, 0]);
  }, [filteredBudgets, expenses, height]);

  const colorScale = d3
    .scaleOrdinal()
    .domain(filteredBudgets.map((d) => d.name))
    .range(d3.schemeSet2);

  // Draw axes using D3
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();

    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", `translate(0,${boundsHeight})`)
      .call(xAxisGenerator)
      .selectAll("text")
      .attr("transform", "rotate(-40)")
      .style("text-anchor", "end");

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  return (
    <div>
      {/* Scope Buttons */}
      <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <button onClick={() => setScope("all")}>All Time</button>
        <button onClick={() => setScope("monthly")}>This Month</button>
      </div>

      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${MARGIN.left},${MARGIN.top})`}
        >
          {filteredBudgets.map((budget) => {
            const expensesSum = getBudgetExpenses(budget.id).reduce((acc, e) => acc + e.amount, 0);
            const barWidth = xScale.bandwidth() / 2;

            return (
              <g key={budget.id}>
                {/* Budget bar */}
                <rect
                  x={xScale(budget.name)}
                  y={yScale(budget.max)}
                  width={barWidth}
                  height={boundsHeight - yScale(budget.max)}
                  fill="#4CAF50"
                />
                {/* Expenses bar */}
                <rect
                  x={xScale(budget.name) + barWidth}
                  y={yScale(expensesSum)}
                  width={barWidth}
                  height={boundsHeight - yScale(expensesSum)}
                  fill="#FF6B6B"
                />
              </g>
            );
          })}
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${MARGIN.left},${MARGIN.top})`}
        />
      </svg>
    </div>
  );
};
