import React, { useEffect, useState } from "react";
import { Legend, Pie, PieChart } from "recharts";
import "../styles/PieMaker.css";

const PieMaker = ({ answers }) => {
  const [hasVotes, setHasVotes] = useState(false);
  
  useEffect(() => {
    const votes = answers.filter((answer) => answer.value > 0);
    votes.length ? setHasVotes(true) : setHasVotes(false);
  }, [answers]);

  let renderLabel = function (entry) {
    if (entry.value === 0) {
      return;
    }
   const votesCast = answers.reduce((previousAnswer, currentAnswer) => {
      return previousAnswer + currentAnswer.value;
    }, 0);
    return `${entry.name.slice(0, 25)} ${(
      (entry.value / votesCast) *
      100
    ).toFixed(1)}%`;
  };

  return (
    <div className="pie__chart">
      {hasVotes ? (
        <>
        <PieChart width={1000} height={500}>
          <Legend />
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
        <p></p>
        </>
      ) : (
        <img
          src={require("../images/pie.png")}
          alt="Pie-holder"
          width="400"
        ></img>
      )}
    </div>
  );
};

export default PieMaker;
