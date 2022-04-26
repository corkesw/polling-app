import React, { useEffect, useState } from "react";
import { Legend, Pie, PieChart } from "recharts";
import "../styles/PieMaker.css";

const PieMaker = ({ answers }) => {
  const [hasVotes, setHasVotes] = useState(false);
  const votesCast = answers.reduce((previousAnswer, currentAnswer) => {
    return previousAnswer + currentAnswer.value;
  }, 0);
  useEffect(() => {
    const votes = answers.filter((answer) => answer.value > 0);
    votes.length ? setHasVotes(true) : setHasVotes(false);
  }, [answers]);

  const renderLabel = function (entry) {
    if (entry.value === 0) {
      return;
    }

    return `${((entry.value / votesCast) * 100).toFixed(1)}%`;
  };

  const formatter = (value, entry, index) => {
    const { color } = entry;
    const { payload } = entry;
    return (
      <div className="pie__legend">
        <span style={{ color }}>{value}</span>
        <span> {payload.value}</span>
        {index === answers.length - 1 ? (
          <>
            <span className="total__count">Total</span>
            <span className="total__count">{votesCast}</span>
          </>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <div className="pie__chart">
        {hasVotes ? (
          <>
            <PieChart width={800} height={450}>
              <Legend
                iconType="square"
                iconSize="0"
                formatter={formatter}
                align="right"
                layout="vertical"
                verticalAlign="middle"
                width="100px"
              />
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
          </>
        ) : (
          <img
            src={require("../images/pie.png")}
            alt="Pie-holder"
            width="400"
          ></img>
        )}
      </div>
    </>
  );
};

export default PieMaker;
