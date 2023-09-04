import React from 'react';
import {
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
} from 'recharts';

const Graphs: React.FC<{ candleData: any }> = ({ candleData }) => {
  console.log(candleData);
  const colors = ['#8884d8', '#82ca9d', '#ffc658'];
  return (
    <>
      {candleData && (
        <ResponsiveContainer height={450}>
          <AreaChart
            data={candleData[0]}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <XAxis
              dataKey="date"
              angle={-10}
              tick={{ fontSize: 12, dy: 10 }}
              interval="preserveStartEnd"
            />
            <YAxis domain={['dataMin', 'dataMax']} />
            
            <Tooltip />
            {candleData.map((c: any, i: number) => (
              <Area
                key={i}
                type="monotone"
                data={c}
                dataKey="value"
                stroke={colors[i]}
                fill={colors[i]}
                // fillOpacity={0.4}
                stackId="1"
                strokeWidth={0.5}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default Graphs;
