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
  content: {
    width: "100%"
  },
  title: {
    display: "flex",
    justifyContent: "space-between"
  },
  locationDates: {},
  stocks: {},
  deleteButton: {
    marginLeft: "5px",
    display: "flex",
    justifySelf: "flex-end"
  },
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
  return (
    <div className={classes.companyCard}>
      <div className={classes.logoWrapper}>
        {company && company.logo && <img className={classes.logo}
                                         src={company.logo}/>}
      </div>
      <div className={classes.content}>

        <div className={classes.title}>
          <div>
            <b className={classes.contentTitle}>{company.name} </b>
            <span> {company.symbol} </span>
            <small>{company.domain}  </small>
          </div>
          <div className={classes.deleteButton}
               onClick={() => props.deleteCompany(company)}>X
          </div>
        </div>
        <div className={classes.locationDates}>
          <span> {company.region} </span>
          <span> {company.tradingHours}</span>
          <span> {company.timeZone} </span>
        </div>
        <div className={classes.stocks}>
          <span><b> {company.close} </b> </span>
          {company.close && <span> {company.currency} </span>}
          <span> {company.difference} </span>
          {company.percentage && <span> {company.percentage}% </span>}
          {company.sessionDate && <span> Closed: {company.sessionDate} </span>}
        </div>
      </div>

    </div>

  )
};

export default withStyles(styles)(Company);