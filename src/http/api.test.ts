// MyApiService.test.ts
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getCandleChart } from './api';

const mock = new MockAdapter(axios);

describe('MyApiService', () => {
  afterEach(() => {
    mock.reset(); // Reset Axios mock before each test
  });

  it('fetches data successfully', async () => {
    const responseData: any = {
      c: [253.25],
    };
    mock
      .onGet(
        'https://finnhub.io/api/v1/stock/candle?symbol=MSFT&resolution=D&from=1662316200&to=1693852200&token=' +
          process.env.REACT_APP_API_KEY
      )
      .reply(200, responseData);

    const result = await getCandleChart('MSFT', 'D', 1662316200, 1693852200);
    expect(result.data).toEqual(responseData);
  });
});
