export interface StockModel {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  isin: unknown;
  mic: string;
  shareClassFIGI: string;
  symbol: string;
  symbol2: string;
  type: string;
}

export interface FormModel {
  prices: string;
  startDate: Date;
  endDate: Date;
  search: string
}
