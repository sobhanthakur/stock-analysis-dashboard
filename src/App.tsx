import { useEffect, useState } from 'react';
import './App.scss';
import ChartForm from './components/ChartForm.component';
import Graphs from './components/Graphs.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllStocks } from './http/api';
import { StockModel } from './models/stock.model';
import {prices as Prices} from './common/constants';

const App: React.FC = () => {
  const [stocks, setStocks] = useState<StockModel[]>([]);
  const [prices, setPrices] = useState<string>(Prices.OPEN);
  useEffect(() => {
    getAllStocks().then((data) => {
      setStocks(data?.data?.slice(0, 50));
    });
  }, []);
  return (
    <div className="container mt-5 row">
      <div className="col-lg-9">
        <Graphs prices={prices}/>
      </div>
      <div className="col-lg-3">
        <ChartForm stocks={stocks} prices={prices} setPrices={setPrices}/>
      </div>
    </div>
  );
};

export default App;
