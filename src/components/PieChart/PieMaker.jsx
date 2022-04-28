import React, { useEffect, useState } from "react"
import { Legend, Pie, PieChart } from "recharts"
import "../../styles/PieMaker.css"

const PieMaker = ({ answers, revealChart, renderStudentLabel }) => {
  console.log(renderStudentLabel)
  const [hasVotes, setHasVotes] = useState(false)
  const votesCast = answers.reduce((previousAnswer, currentAnswer) => {
    return previousAnswer + currentAnswer.value
  }, 0)
  useEffect(() => {
    const votes = answers.filter((answer) => answer.value > 0)
    votes.length ? setHasVotes(true) : setHasVotes(false)
  }, [answers])

  const RADIAN = Math.PI / 180
  const renderLabel = function ({
    value,
    cx,
    cy,
    outerRadius,
    innerRadius,
    midAngle,
  }) {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    if (value === 0) {
      return
    }

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${((value / votesCast) * 100).toFixed(0)}%`}
      </text>
    )
  }

  const renderLab = function (entry) {
    if (entry.value === 0) {
      return
    }

    return `${((entry.value / votesCast) * 100).toFixed(1)}%`
  }

  const formatter = (value, entry, index, votesCast) => {
    const { color } = entry
    const { payload } = entry
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
    )
  }

  return (
    <>
      <div className={revealChart ? "pie__chart" : "hidden__pie__chart"}>
        {hasVotes ? (
          <>
            {renderStudentLabel ? (
              <PieChart width={800} height={450} marginRight={30}>
                <Legend
                  chartWidth={690}
                  chartHeight={500}
                  payload={[{}]}
                  iconSize={0}
                  layout={"horizontal"}
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
            ) : (
              <PieChart width={800} height={450} marginRight={30}>
                <Legend
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
                  label={renderLab}
                  labelLine={false}
                />
              </PieChart>
            )}
          </>
        ) : (
          <img
            src={require("../../images/pie.png")}
            alt="Pie-holder"
            width="400"
          ></img>
        )}
      </div>
    </>
  )
}

export default PieMaker
