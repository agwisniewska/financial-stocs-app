import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_ALPHA_API_URL;

const AlphaVantageService = {
  throwResponseNot200Status: (response) => {
    if (response.status !== 200) {
      throw new Error(`Response status: ${response.status.code}`)
    } else {
      return response;
    }

  },
  fetchCompanyFinancialDataFromStock: (symbol) => {
    return axios.get(`${API_URL}query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${API_KEY}`)
      .then(AlphaVantageService.throwResponseNot200Status);
  },

  fetchCompanyDailyTimeSeries: (symbol) => {
    return axios.get(`${API_URL}query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`)
      .then(AlphaVantageService.throwResponseNot200Status);
  },
};

export default AlphaVantageService;