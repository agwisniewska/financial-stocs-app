import moment from "moment";

const ExtractData = {
  extractMainCompanyInformation: (response) => {
    const matchesData = response.data.bestMatches && response.data.bestMatches[0];
    return {
      symbol: matchesData["1. symbol"],
      name: matchesData["2. name"],
      region: matchesData["4. region"],
      tradingHours: `${matchesData["5. marketOpen"]} ${matchesData["6. marketClose"]}`,
      currency: matchesData["8. currency"],
      timeZone: matchesData["7. timezone"]
    };
  },
  extractCompanyTimeSeriesData: (response) => {
    let timeSeriesData = response && response.data && response.data["Time Series (Daily)"];
    if (timeSeriesData) {
      let latestDate = Object.keys(timeSeriesData).sort().pop();
      if (timeSeriesData[latestDate]) {
        return {
          open: timeSeriesData[latestDate]["1. open"],
          close: timeSeriesData[latestDate]["4. close"],
          difference: timeSeriesData[latestDate]["4. close"] / timeSeriesData[latestDate]["1. open"]
        };
      }
    }
  }
};

export default ExtractData;