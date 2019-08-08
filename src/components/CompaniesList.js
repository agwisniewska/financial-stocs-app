import React from "react";
import AlphaVantageService from "../services/alpha-vantage/index"
import moment from "moment";
import ClearBitService from "../services/clearbit";

export default class CompaniesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      currentDate: moment(new Date()).format("YYYY-MM-DD")
    }
  }

  async componentDidMount() {
    const companies = [];
    const localStorageSymbols = Object.keys(localStorage);

    localStorageSymbols.forEach(async (symbol) => {
      const mainInfoResponse = await AlphaVantageService.fetchCompanyFinancialDataFromStock(symbol);
      const matchesData = mainInfoResponse.data.bestMatches && mainInfoResponse.data.bestMatches[0];
      let companyData = {
        symbol: matchesData["1. symbol"],
        name: matchesData["2. name"],
        region: matchesData["4. region"],
        tradingHours: `${matchesData["5. marketOpen"]} ${matchesData["6.marketClose"]}`,
        currency: matchesData["8. currency"],
        timeZone: matchesData["7. timezone"]
      };

      const timeSeriesResponse = await AlphaVantageService.fetchCompanyDailyTimeSeries(symbol);
      const timeSeriesData = timeSeriesResponse && timeSeriesResponse.data && timeSeriesResponse.data["Time Series (Daily)"];
      companyData = {
        ...companyData,
        open: timeSeriesData[this.state.currentDate]["1. open"],
        close: timeSeriesData[this.state.currentDate]["4. close"],
        difference: timeSeriesData[this.state.currentDate]["4. close"] / timeSeriesData[this.state.currentDate]["1. open"]
      };

      const logoAndDomainResponse = await ClearBitService.fetchCompanyLogoAndDomain(matchesData["2. name"]);
      companyData = {
        ...companyData,
        logo: logoAndDomainResponse.data.logo,
        domain: logoAndDomainResponse.data.domain,
      };

      console.error(companyData);

    });

  }

  render() {
    return (<div>
      {this.state.companies.map((company) => (
        <p>{company.name}!</p>
      ))}
    </div>);
  }
}

