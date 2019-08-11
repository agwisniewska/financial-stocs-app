import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import Company from "./Company";
import {withStyles} from "@material-ui/styles";
import AlphaVantageService from "../services/alpha-vantage";
import Helper from "../services";
import Button from "@material-ui/core/Button/Button";

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
    const keysAvailable = Helper.getLocalStorageKeys();
    this.setState({keysAvailable: keysAvailable.length});
    AlphaVantageService.populateCompanyData().then(companies => {
      console.error('companies', companies);
      this.setState({requestSent: true, companies: companies ? [...companies] : []});
    })
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
      {this.state.requestSent && !this.state.keysAvailable && !this.state.companies.length &&
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

