import { useEffect, useState } from 'react';
import './App.scss';
import ChartForm from './components/ChartForm.component';
import Graphs from './components/Graphs.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCandleChart, searchSymbol } from './http/api';
import { FormModel } from './models/stock.model';
import { prices as Prices } from './common/constants';
import {
  convertDateToUnixTimestamp,
  convertUnixTimestampToDate,
} from './helpers/date-helper';

const initialState = {
  prices: Prices.OPEN,
  startDate: new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  ).toDateString(),
  endDate: new Date().toDateString(),
  search: '',
};
const App: React.FC = () => {
  const [formData, setFormData] = useState<FormModel>(initialState);
  const { prices, startDate, endDate, search } = formData;
  const [candleData, setCandleData] = useState<any[]>([]);
  const [bestMatches, setBestMatches] = useState([]);
  const [symbol, setSymbol] = useState(['MSFT']);

  const changeFormData: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const addSymbol = (s: string) => {
    if (symbol.length === 3) {
      alert('You can add upto 3 stocks');
      return;
    } else {
      setSymbol([...symbol, s]);
    }
  };

  const removeSymbol = (s: string) => {
    if (symbol.length === 1) {
      alert('Atleast one stock is needed');
      return;
    } else {
      let updatedSymbol = symbol.filter((sym) => sym !== s);
      setSymbol(updatedSymbol);
    }
  };

  const updateBestMatches = async () => {
    try {
      if (search) {
        const searchResults = await searchSymbol(search);

        const result = searchResults.data.result;
        setBestMatches(result);
      }
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };

  const clear = (): void => {
    setFormData({ ...formData, search: '' });
    setBestMatches([]);
  };

  const formatData = (data: any) => {
    return data[prices[0].toLocaleLowerCase()]?.map(
      (item: any, index: number) => {
        return {
          value: item.toFixed(2),
          date: convertUnixTimestampToDate(data.t[index]),
        };
      }
    );
  };

  const getDateRange = () => {
    const startTimestampUnix = convertDateToUnixTimestamp(startDate);
    const endTimestampUnix = convertDateToUnixTimestamp(endDate);
    return { startTimestampUnix, endTimestampUnix };
  };

  const updateChartData = async () => {
    try {
      const { startTimestampUnix, endTimestampUnix } = getDateRange();

      const stockPromises = symbol.map(async (s) => {
        const response = await getCandleChart(
          s,
          'D',
          startTimestampUnix,
          endTimestampUnix
        );
        return formatData(response.data);
      });

      const stockData = await Promise.all(stockPromises);
      console.log(stockData);
      setCandleData(stockData);
    } catch (error) {
      // setCandleData([]);
      // setSymbol('MSFT');
      alert(error);
    }
  };

  const handleDateChange: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    updateChartData();
  };

  useEffect(() => {
    updateChartData();
  }, [prices, symbol]);

  return (
    <div className="container-fluid mt-5 row">
      <div className="col-lg-9">
        <Graphs candleData={candleData} />
      </div>
      <div className="col-lg-3">
        <ChartForm
          prices={prices}
          changeFormData={changeFormData}
          handleDateChange={handleDateChange}
          search={search}
          bestMatches={bestMatches}
          updateBestMatches={updateBestMatches}
          clear={clear}
          addSymbol={addSymbol}
          removeSymbol={removeSymbol}
          symbol={symbol}
        />
      </div>
    </div>
  );
};

export default App;
