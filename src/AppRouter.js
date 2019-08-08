import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import CompaniesList from "./components/CompaniesList";
import TrackCompany from "./components/TrackCompany";
// import saveSearchedSymbolsInLocalStorage from "./services/internal/index"
import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';

const routes = [
  {
    path: "/",
    exact: true,
    render: (props) => <TrackCompany {...props}/>,
  },
  {
    path: "/track-company",
    render: (props) => <TrackCompany {...props}/>
  },
  {
    path: "/companies",
    render: (props) => <CompaniesList {...props}/>,
  }
];

const styles = () => ({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  }
});

const AppRouter = (props) => {
  const {classes} = props;
  return (

    <Router>
      <div>
        <AppBar className={classes.root} position="static">
          <Toolbar>
            <Button color="inherit">
              <Link className={classes.link}
                    to="/track-company">Track my company</Link></Button>
            <div>

            <Button>
              <Link className={classes.link}
                    to="/companies/">Companies</Link></Button>

            </div>
          </Toolbar>
        </AppBar>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={route.render}
          />))}
      </div>
    </Router>
  )
};

AppRouter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppRouter);