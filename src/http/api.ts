import axios from 'axios';

const basePath = 'https://finnhub.io/api/v1';

export const getCandleChart = async (
  symbol: string,
  resolution: string,
  from: number,
  to: number
) => {
  try {
    console.log(`${basePath}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_API_KEY}`)
    const res = await axios.get(
      `${basePath}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${process.env.REACT_APP_API_KEY}`
    );
    return res;
  } catch (err: any) {
    const message = `An error has occured ${err.message}`;
    throw new Error(message);
  }
};

export const searchSymbol = async (query: string) => {
  try {
    const res = await axios.get(
      `${basePath}/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`
    );
    return res;
  } catch (err) {
    const message = `An error has occured`;
    throw new Error(message);
  }
};
