import React, { useEffect, useState } from 'react';
import { Area, XAxis, YAxis, ResponsiveContainer, AreaChart } from 'recharts';
import {
  createDate,
  convertDateToUnixTimestamp,
  convertUnixTimestampToDate,
} from '../helpers/date-helper';
import { chartConfig } from '../common/config';
import { getCandleChart } from '../http/api';

const Graphs: React.FC<{ prices: string }> = ({ prices }) => {
  const [data, setData] = useState([]);
  const formatData = (data: any) => {
    return data[prices[0].toLocaleLowerCase()].map(
      (item: any, index: number) => {
        return {
          value: item.toFixed(2),
          date: convertUnixTimestampToDate(data.t[index]),
        };
      }
    );
  };
  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig['1Y'];
      const endDate = new Date();
      const startDate = createDate(endDate, -days, -weeks, -months, -years);
      const startTimestampUnix = convertDateToUnixTimestamp(startDate);
      const endTimestampUnix = convertDateToUnixTimestamp(endDate);
      return { startTimestampUnix, endTimestampUnix };
    };

    const updateChartData = async () => {
      try {
        const { startTimestampUnix, endTimestampUnix } = getDateRange();
        const resolution = chartConfig['1Y'].resolution;
        const result = await getCandleChart(
          'MSFT',
          resolution,
          startTimestampUnix,
          endTimestampUnix
        );
        setData(formatData(result.data));
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };
    updateChartData();
  }, [prices]);

  return (
    <>
      <ResponsiveContainer>
        <AreaChart data={data}>
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
    </>
  );
};

export default Graphs;
