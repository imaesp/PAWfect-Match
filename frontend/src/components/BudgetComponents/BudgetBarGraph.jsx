import React from 'react'
import { Barplot } from "./Barplot";

function BudgetBarGraph({ data, width = 700, height = 400 }) {
  return (
    <Barplot data={data} width={width} height={height} />
  )
}

export default BudgetBarGraph