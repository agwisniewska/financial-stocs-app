import axios from 'axios';
import ClearBitService from "../clearbit";
import ExtractData from "./extractData";
import extractCompanyLogoAndDomain from "../clearbit/extractData";
import moment from "moment";

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_ALPHA_API_URL;

const AlphaVantageService = {
  fetchCompanyFinancialDataFromStock: (symbol) => {
    return axios.get(`${API_URL}query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${API_KEY}`);
  },

  fetchCompanyDailyTimeSeries: (symbol) => {
    return axios.get(`${API_URL}query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`);
  },

  populateCompanyData: async () => {
    const localStorageSymbols = Object.keys(localStorage);

    let companies = [];

    localStorageSymbols.forEach(async (symbol) => {
      let mainInfoExtractedData = null;
      let timeSeriesExtractedData = null;
      let logoAndDomainExtractedData = null;
      let mainInfoResponse = null;
      let timeSeriesResponse = null;
      let logoAndDomainResponse = null;
      const formattedSymbol = symbol.toUpperCase();
      let companyData = null;
      let name;
      try {
        mainInfoResponse = await AlphaVantageService.fetchCompanyFinancialDataFromStock(formattedSymbol);
        if (mainInfoResponse.data && !mainInfoResponse.data.hasOwnProperty("Note")) {
          mainInfoExtractedData = ExtractData.extractMainCompanyInformation(mainInfoResponse);
          const date = moment(new Date()).format("YYYY-MM-DD");
          companyData = {date, ...mainInfoExtractedData};
          name = mainInfoExtractedData.name.replace(" L.P. ", "").replace("Inc.", "");
        }

      } catch (e) {
        throw new Error(e);
      }
      try {
        timeSeriesResponse = await AlphaVantageService.fetchCompanyDailyTimeSeries(symbol);
        if (timeSeriesResponse.data && !timeSeriesResponse.data.hasOwnProperty("Note")) {
          timeSeriesExtractedData = ExtractData.extractCompanyTimeSeriesData(timeSeriesResponse);
          companyData = {...companyData, ...timeSeriesExtractedData};
        }
      } catch (e) {
        throw new Error(`Error while time series requesting ${e}`);
      }

      try {
        if (name) {
          logoAndDomainResponse = await ClearBitService.fetchCompanyLogoAndDomain(name);
          if (logoAndDomainResponse) {
            logoAndDomainExtractedData = extractCompanyLogoAndDomain(logoAndDomainResponse);
            companyData = {...companyData, ...logoAndDomainExtractedData};
          }
        }
      } catch (e) {
        throw new Error(`Error while login domain requesting ${e}`);
      }
      if (companyData) {
        companies.push(companyData);
      }
    });
    return companies;
  }

};

export default AlphaVantageService;