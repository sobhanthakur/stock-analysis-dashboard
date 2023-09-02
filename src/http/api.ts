import axios, { AxiosResponse } from 'axios';
type AxiosGetFunction<T = any> = () => Promise<AxiosResponse<T>>;

export const getAllStocks: AxiosGetFunction = async () => {
  const res = await axios.get(
    `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=cjocu31r01qlfp4fh56gcjocu31r01qlfp4fh570`
  );
  return res;
};

export const getCandleChart = async (
  symbol: string,
  resolution: string,
  from: number,
  to: number
) => {
  const res = await axios.get(
    `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=cjocu31r01qlfp4fh56gcjocu31r01qlfp4fh570`
  );
  return res;
};
