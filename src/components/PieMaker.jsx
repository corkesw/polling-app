import React from "react";
import { Pie, PieChart } from "recharts";
import "../styles/PieMaker.css";

const PieMaker = ({ answers }) => {
  let renderLabel = function (entry) {
    if (entry.value === 0) return;
    const votesCast = answers.reduce((previousAnswer, currentAnswer) => {
      // console.log(previousAnswer, currentAnswer.value)
      return previousAnswer + currentAnswer.value;
    }, 0);
    // console.log(votesCast);
    return `${entry.name.slice(0, 25)} ${(
      (entry.value / votesCast) *
      100
    ).toFixed(1)}%`;
  };

  return (
    <div className="pieChart">
      <PieChart width={1000} height={500}>
        <Pie
          data={answers}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={170}
          label={renderLabel}
          labelLine={false}
        />
      </PieChart>
    </div>
  );
};

export default PieMaker;
