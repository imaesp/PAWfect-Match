import * as d3 from "d3";
import { useEffect } from "react";

export default function Mock({ data, width, height }) {
  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select("#d3-chart");
    svg.selectAll("*").remove(); // Clear previous chart

    const radius = Math.min(width, height) / 2;

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(["#bfa697", "#eeeaea", "#de9d76", "#f5b26b", "#ffca93", "#5A464C", "#97bfb6", "#786858", "#d9cbb5", "#a6eae9", "#cfc9c9", "#b0a8a8", "#76b9de", "#f3c5b2", "#af775e", "#6bb2f5", "#e89d5c", "#d7a572", "#93afff", "#ffd8aa", "#e2b87b", "#465a54", "#7c6a71", "#42373c", "#c4a58c", "#dbc7ad", "#f4e4d7", "#83674e", "#695c4b", "#967355", "#9a4f4f", "#6d7080", "#7391a6"]);

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = g
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (_, i) => color(i))
      .attr("stroke", "#fff")
      .attr("stroke-width", "2px");

    // Optional: Add labels
    g.selectAll("text")
      .data(pie(data))
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text((d) => d.data.label);
  }, [data, width, height]);

  return (
    <svg id="d3-chart" width={width} height={height}></svg>
  );
}
