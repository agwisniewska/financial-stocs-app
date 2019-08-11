import React, {Component} from "react";
import AlphaVantageService from "../services/alpha-vantage/index"
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
import Company from "./Company";
import {withStyles} from "@material-ui/styles";
import RequestStatuses from "../consts/requestStatuses"

const styles = () => ({
  paper: {
    padding: '1rem',
    textAlign: 'center',
  },
});

class CompaniesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      errorMessage: "",
      requestStatus: RequestStatuses.NOT_SENT
    }
  }

  componentDidMount() {
    let companies = null;
    try {
      this.setState({requestStatus: RequestStatuses.IN_PROGRESS});
      companies = AlphaVantageService.populateCompanyData();
      this.setState({requestStatus: RequestStatuses.SUCCESS, companies: companies});

    } catch (e) {
      this.setState({errorMessage:e.message, requestStatus: RequestStatuses.FAILURE})
    }
  }

  deleteCompany = (value) => {
    const filteredCompanies = this.state.companies.filter(company => company.symbol !== value.symbol);
    this.setState({companies: filteredCompanies});
    localStorage.removeItem(value.symbol);
  };

  render() {
    const {classes} = this.props;
    return (<Grid
      container
      direction="row"
      justify="center"
      alignItems="center">
      {this.state.companies && this.state.companies.map((company, index) => {
        return (<Grid key={index}
                      item
                      xs={12}
                      sm={3}>
            <Company deleteCompany={this.deleteCompany} company={company}/>
        </Grid>)
      })}
      {this.state.errorMessage}
    </Grid>);
  }
}

CompaniesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompaniesList);

