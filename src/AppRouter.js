import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import CompaniesList from "./components/CompaniesList";
import TrackCompany from "./components/TrackCompany";
// import saveSearchedSymbolsInLocalStorage from "./services/internal/index"
import React from "react";


const routes = [
  {
    path: "/",
    exact: true,
    render: (props) => <CompaniesList {...props}/>,
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


export const AppRouter = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Stock Tracker</Link>
            </li>
            <li>
              <Link to="/track-company/">Track my company</Link>
            </li>

            <li>
              <Link to="/companies/">Companies</Link>
            </li>
          </ul>
        </nav>
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