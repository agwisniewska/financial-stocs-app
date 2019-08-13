import moment from "moment";
import AlphaVantageService from "./index";

const ExtractData = {
  extractMainCompanyInformation: (response) => {
    const matchesData = response.data.bestMatches && response.data.bestMatches[0];
    if (matchesData) {
      return {
        symbol: matchesData["1. symbol"],
        name: matchesData["2. name"],
        region: matchesData["4. region"],
        tradingHours: `${matchesData["5. marketOpen"]} - ${matchesData["6. marketClose"]}`,
        currency: matchesData["8. currency"],
        timeZone: matchesData["7. timezone"]
      };
    }
  },

  addMainCompanyInfoToCompany: async (companyData, symbol) => {
    try {
      let mainInfoResponse = null;
      let mainInfoExtractedData = null;
      let date = null;
      mainInfoResponse = await AlphaVantageService.fetchCompanyFinancialDataFromStock(symbol);
      if (mainInfoResponse && mainInfoResponse.data && !mainInfoResponse.data.hasOwnProperty("Note")) {
        mainInfoExtractedData = ExtractData.extractMainCompanyInformation(mainInfoResponse);
        date = moment(new Date()).format("YYYY-MM-DD");
      }
      return {date: date, ...companyData, ...mainInfoExtractedData};
    } catch (e) {
      throw new Error(`Error while main info requesting ${e}`);
    }
  },

  extractCompanyTimeSeriesData: (response) => {
    let timeSeriesData = response && response.data && response.data["Time Series (Daily)"];
    if (timeSeriesData) {
      let latestDate = Object.keys(timeSeriesData).sort().pop();
      if (timeSeriesData[latestDate]) {
        return {
          open: timeSeriesData[latestDate]["1. open"],
          close: parseInt(timeSeriesData[latestDate]["4. close"]).toFixed(2),
          difference: parseInt(timeSeriesData[latestDate]["4. close"] - timeSeriesData[latestDate]["1. open"]).toFixed(2),
          percentage: parseInt(timeSeriesData[latestDate]["4. close"] / timeSeriesData[latestDate]["1. open"] * 100 - 100).toFixed(2),
          sessionDate: latestDate
        };
      }
    }
  },

  addTimeSeriesToCompany: async (companyData, symbol) => {
    try {
      let timeSeriesResponse = null;
      let timeSeriesExtractedData = null;
      timeSeriesResponse = await AlphaVantageService.fetchCompanyDailyTimeSeries(symbol);
      if (timeSeriesResponse && timeSeriesResponse.data && !timeSeriesResponse.data.hasOwnProperty("Note")) {
        timeSeriesExtractedData = ExtractData.extractCompanyTimeSeriesData(timeSeriesResponse);
      }
      return {...companyData, ...timeSeriesExtractedData};
    } catch (e) {
      throw new Error(`Error while time series requesting ${e}`);
    }

  },
};

export default ExtractData;