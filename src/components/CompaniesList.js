import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import Company from "./Company";
import {withStyles} from "@material-ui/styles";
import Button from "@material-ui/core/Button/Button";
import ExtractData from "../services/alpha-vantage/extractData";
import ClearBitExtractData from "../services/clearbit/extractData";

const styles = () => ({
  paper: {
    padding: '1rem',
    textAlign: 'center',
  },
  container: {
    padding: "2rem"
  }
});

class CompaniesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      errorMessage: "",
      requestSent: false,
      keysAvailable: false
    }
  }

  componentDidMount() {
    const localStorageSymbols = Object.keys(localStorage);
    this.setState(() => ({keysAvailable: localStorageSymbols.length}));
    let companies = [];

    localStorageSymbols.forEach(async (symbol) => {
      const formattedSymbol = symbol.toUpperCase();
      let companyData = null;
      companyData = await ExtractData.addMainCompanyInfoToCompany(companyData, formattedSymbol);
      companyData = await ExtractData.addTimeSeriesToCompany(companyData, formattedSymbol);
      if (companyData && companyData.name) {
        let name = companyData.name.replace(" L.P. ", "").replace("Inc.", "");
        companyData = await ClearBitExtractData.addLogoAndDomainToCompany(companyData, name);
      }

      if (companyData) {
        companies.push(companyData);
        // TODO: how to do it properly outside forEach...
        this.setState(() => ({companies: companies, requestSent: true}))
      }
    });

  }


  deleteCompany = (value) => {
    const filteredCompanies = this.state.companies.filter(company => company.symbol !== value.symbol);
    this.setState({companies: filteredCompanies});
    localStorage.removeItem(value.symbol);
  };

  redirect = () => {
    this.props.history.push("/track-company")
  };

  render() {
    return (<Grid
      container
      direction="row"
      justify="center"
      alignItems="center">
      {this.state.companies && this.state.companies.map((company, index) => {
        return (<Grid key={index}
                      item
                      xs={12}
                      sm={12}>
          <Company deleteCompany={this.deleteCompany}
                   company={company}/>
        </Grid>)
      })}
      {this.state.requestSent && this.state.keysAvailable && (this.state.companies.length === 0) &&
      <p> No results found </p>}
      {!this.state.requestSent && !this.state.keysAvailable && !this.state.companies.length &&
      <p> No tracked companies yet.
        <Button variant="contained"
                color="primary"
                onClick={this.redirect}> Start tracking your company </Button></p>}
    </Grid>);
  }
}

CompaniesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompaniesList);

