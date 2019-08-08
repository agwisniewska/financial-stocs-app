import moment from "moment";

const ExtractData = {
  extractMainCompanyInformation: (response) => {
    const matchesData = response.data.bestMatches && response.data.bestMatches[0];
    if (!matchesData)  {
      return
      // throw new Error("Update your api key to make more requests");
    }
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
    let date = moment(new Date()).format("YYYY-MM-DD");
    const timeSeriesData = response && response.data && response.data["Time Series (Daily)"];
    if (!timeSeriesData)  {
      return
      // throw new Error("Update your api key to make more requests");
    }
    date = timeSeriesData[date] ? date : date.subtract(1, 'days');
    return {
      open: timeSeriesData[date]["1. open"],
      close: timeSeriesData[date]["4. close"],
      difference: timeSeriesData[date]["4. close"] / timeSeriesData[date]["1. open"]
    };

  }
};

export default ExtractData;