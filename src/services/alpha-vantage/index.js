import axios from 'axios';

const API_KEY = 'the_unique_key_1243457';
const API_URL = 'https://www.alphavantage.co/';

const AlphaVantageService = {
  fetchCompanyFinancialDataFromStock: (symbol) => {
    return axios.get(`${API_URL}query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${API_KEY}`);
  },

  fetchCompanyDailyTimeSeries: (symbol) => {
    return axios.get(`${API_URL}query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
  }

};

export default AlphaVantageService;