import axios from 'axios';
import ClearBitService from "../clearbit";
import ExtractData from "./actions/extractData";
import extractCompanyLogoAndDomain from "../clearbit/actions/extractData";
import moment from "moment";
const API_KEY = '8QRXF51LC7X7XHDM';
const API_URL = 'https://www.alphavantage.co/';

const AlphaVantageService = {
  fetchCompanyFinancialDataFromStock: (symbol) => {
    return axios.get(`${API_URL}query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${API_KEY}`);
  },

  fetchCompanyDailyTimeSeries: (symbol) => {
    return axios.get(`${API_URL}query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
  },

  populateCompanyData: () => {
    const companies = [];
    const localStorageSymbols = Object.keys(localStorage);

    localStorageSymbols.forEach(async (symbol) => {
      const mainInfoResponse = await AlphaVantageService.fetchCompanyFinancialDataFromStock(symbol);
      const mainInfoExtractedData = ExtractData.extractMainCompanyInformation(mainInfoResponse);
      const name = mainInfoExtractedData.name.replace(" L.P. ", "").replace("Inc.", "");
      const timeSeriesResponse = await AlphaVantageService.fetchCompanyDailyTimeSeries(symbol);
      const timeSeriesExtractedData = ExtractData.extractCompanyTimeSeriesData(timeSeriesResponse);

      const logoAndDomainResponse = await ClearBitService.fetchCompanyLogoAndDomain(name);
      const logoAndDomainExtractedData = extractCompanyLogoAndDomain(logoAndDomainResponse);

      const date = moment(new Date()).format("YYYY-MM-DD");
      const companyData = {
        date,
        ...mainInfoExtractedData,
        ...timeSeriesExtractedData,
        ...logoAndDomainExtractedData
      };

      companies.push(companyData);
      console.error(companies);

    });
    return companies;
  }

};

export default AlphaVantageService;