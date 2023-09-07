import React from 'react';
import {
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
} from 'recharts';

const Graphs: React.FC<{ candleData: any,symbol: string[] }> = ({ candleData,symbol }) => {
  console.log(candleData);
  const colors = ['#8884d8', '#82ca9d', '#ffc658'];
  return (
    <>
      {candleData.length > 0 &&  (
        <ResponsiveContainer height={450}>
          <AreaChart
            data={candleData}
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
            {symbol.map((s: any, i: number) => (
              <Area
                key={i}
                type="monotone"
                dataKey={s}
                stroke={colors[i]}
                fill={colors[i]}
                fillOpacity={0.8}
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

export default React.memo(Graphs);
