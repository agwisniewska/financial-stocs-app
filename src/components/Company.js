import React from "react";
import {withStyles} from "@material-ui/styles";

const styles = () => ({
  logoWrapper: {
    height: "64px",
    width: "64px",
  },
  logo: {
    height: "64px",
    width: "64px",
  },
  content: {},
  contentTitle: {},
  locationDates: {},
  stocks: {},
  companyCard: {
    maxHeight: "64px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "1rem 0",
  }
});
const Company = (props) => {
  const {company, classes} = props;
  console.error(company);
  return (
    <div className={classes.companyCard}>
      <div className={classes.logoWrapper}>
        <img className={classes.logo}
             src={company.logo}/>
      </div>
      <div className={classes.content}>

        <div className={classes.title}>
          <b className={classes.contentTitle}>{company.name} </b>
          <span> {company.symbol} </span>
          <small>{company.domain}  </small>
        </div>
        <div className={classes.locationDates}>
          <span> {company.region} </span>
          <span> {company.tradingHours}</span>
          <span> {company.timeZone} </span>
        </div>
        <div className={classes.stocks}>
          <span> {company.close} </span>
          <span> {company.difference} </span>
          {company.closeDate && <span> Closed: </span>}
        </div>
      </div>
      <span onClick={() => props.deleteCompany(company)}>x</span>
    </div>

  )
};

export default withStyles(styles)(Company);