import { useState } from 'react';
import { prices as Prices } from '../common/constants';
import { StockModel } from '../models/stock.model';
const ChartForm: React.FC<{
  stocks: StockModel[];
  setPrices: React.Dispatch<React.SetStateAction<string>>;
  prices: string
}> = ({ stocks, setPrices, prices }) => {
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  return (
    <>
      <div className="filter-container p-3">
        <div className="card-title text-center mb-2">Prices</div>
        <div className="row">
          <div className="col-lg-6">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="prices"
                value={Prices.OPEN}
                checked={prices === Prices.OPEN}
                onChange={(event) => setPrices(event.target.value)}
              />
              <label className="form-check-label">
                <span className="inner-text">{Prices.OPEN}</span>
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="prices"
                value={Prices.CLOSE}
                checked={prices === Prices.CLOSE}
                onChange={(event) => setPrices(event.target.value)}
              />
              <label className="form-check-label">
                <span className="inner-text">{Prices.CLOSE}</span>
              </label>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="prices"
                value={Prices.LOW}
                checked={prices === Prices.LOW}
                onChange={(event) => setPrices(event.target.value)}
              />
              <label className="form-check-label">
                <span className="inner-text">{Prices.LOW}</span>
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="prices"
                value={Prices.HIGH}
                checked={prices === Prices.HIGH}
                onChange={(event) => setPrices(event.target.value)}
              />
              <label className="form-check-label">
                <span className="inner-text">{Prices.HIGH}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 filter-container p-3">
        <div className="card-title text-center mb-2">Time Range</div>
        <div className="row mt-1">
          <div className="col-lg-6">
            <input
              type="date"
              className="form-control"
              value={startDate || ''}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="col-lg-6">
            <input
              type="date"
              className="form-control"
              value={endDate || ''}
              onChange={handleEndDateChange}
            />
          </div>
          <div className="col-lg-12 mt-2">
            <button type="button" className="btn btn-primary custom-button">
              Update Dates
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartForm;
