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
  return (
    <>
      {candleData && (
        <ResponsiveContainer>
          <AreaChart data={candleData}>
            <defs>
              <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={'rgb(199 210 254)'}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={'rgb(199 210 254)'}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#312e81"
              fill="url(#chartColor)"
              fillOpacity={1}
              strokeWidth={0.5}
            />
            <XAxis dataKey="date" />
            <YAxis domain={['dataMin', 'dataMax']} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default Graphs;
