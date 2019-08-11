import axios from 'axios';
import ClearBitService from "../clearbit";
import ExtractData from "./extractData";
import extractCompanyLogoAndDomain from "../clearbit/extractData";
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
    const localStorageSymbols = Object.keys(localStorage).filter(key => key !== "");
    let mainInfoResponse;
    let timeSeriesResponse;
    let logoAndDomainResponse;
    let mainInfoExtractedData;
    let timeSeriesExtractedData;
    let logoAndDomainExtractedData;
    let name;

    localStorageSymbols.forEach(async (symbol) => {
      const formattedSymbol = symbol.toUpperCase();
      try {
        mainInfoResponse = await AlphaVantageService.fetchCompanyFinancialDataFromStock(formattedSymbol);
        if (mainInfoResponse) {
          mainInfoExtractedData = ExtractData.extractMainCompanyInformation(mainInfoResponse);
          mainInfoExtractedData.name.replace(" L.P. ", "").replace("Inc.", "");
        }
      } catch (e) {
        throw new Error(e);
      }
      try {
        timeSeriesResponse = await AlphaVantageService.fetchCompanyDailyTimeSeries(symbol);
        console.log(timeSeriesResponse);
        if (timeSeriesResponse) {
          ExtractData.extractCompanyTimeSeriesData(timeSeriesResponse);
        }
      } catch (e) {
        throw new Error(`Error while time series requesting ${e}`);
      }

      try {
        logoAndDomainResponse = await ClearBitService.fetchCompanyLogoAndDomain(name);
        if (logoAndDomainResponse) {
          logoAndDomainExtractedData = extractCompanyLogoAndDomain(logoAndDomainResponse)
        }
      } catch (e) {
        throw new Error(`Error while login domain requesting ${e}`);
      }

      const date = moment(new Date()).format("YYYY-MM-DD");
      const companyData = {
        date,
        ...mainInfoExtractedData,
        ...timeSeriesExtractedData,
        ...logoAndDomainExtractedData
      };

      companies.push(companyData);

    });
    return companies;
  }

};

export default AlphaVantageService;