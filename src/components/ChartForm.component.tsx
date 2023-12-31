import { prices as Prices } from '../common/constants';
const ChartForm: React.FC<{
  changeFormData: React.ChangeEventHandler<HTMLInputElement>;
  handleDateChange: React.MouseEventHandler<HTMLButtonElement>;
  prices: string;
  search: string;
  bestMatches: any[];
  updateBestMatches: any;
  clear: any;
  symbol: string[];
  addSymbol: (e: string) => void;
  removeSymbol: (e: string) => void;
}> = ({
  changeFormData,
  prices,
  handleDateChange,
  search,
  bestMatches,
  updateBestMatches,
  clear,
  symbol,
  addSymbol,
  removeSymbol,
}) => {
  const colors = ['#8884d8', '#82ca9d', '#ffc658'];
  const isActive = (s:string) => {
    return s.includes('.');
  }
  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          value={search}
          name="search"
          className="form-control"
          placeholder="Search stock..."
          onChange={(event) => {
            changeFormData(event);
            updateBestMatches();
          }}
        />
        {search && (
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={clear}
            >
              <i className="fa fa-x"></i>
            </button>
          </div>
        )}
        {search && bestMatches.length > 0 && (
          <div className="dropdown-container mt-1">
            {bestMatches.map((item: any) => {
              return (
                <div
                  key={item.symbol}
                  className={`p-1 m-1 dropdown-list ${isActive(item.symbol) && 'inactive'}`}
                  onClick={() => addSymbol(item.symbol)}
                >
                  <span>{item.symbol}</span> {' - '}
                  <span>{item.description}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
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
                onChange={(event) => changeFormData(event)}
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
                onChange={(event) => changeFormData(event)}
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
                onChange={(event) => changeFormData(event)}
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
                onChange={(event) => changeFormData(event)}
              />
              <label className="form-check-label">
                <span className="inner-text">{Prices.HIGH}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 filter-container p-3 mb-1">
        <div className="card-title text-center mb-2">Time Range</div>
        <div className="row mt-1">
          <div className="col-lg-6">
            <input
              type="date"
              className="form-control"
              name="startDate"
              onChange={(event) => changeFormData(event)}
            />
          </div>
          <div className="col-lg-6">
            <input
              type="date"
              className="form-control"
              name="endDate"
              onChange={(event) => changeFormData(event)}
            />
          </div>
          <div className="col-lg-12 mt-2">
            <button
              type="button"
              className="btn btn-primary custom-button"
              onClick={(e) => handleDateChange(e)}
            >
              Update Dates
            </button>
          </div>
        </div>
      </div>

      <div className="p-2">
        {symbol.map((s, i) => (
          <div
            key={i}
            style={{ background: colors[i] }}
            className="row mb-2 symbol-styles"
          >
            <div className="col-lg-6">{s}</div>
            <div className="col-lg-6">
              <button
                className="btn btn-info btn-sm remove-button"
                onClick={() => removeSymbol(s)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChartForm;
