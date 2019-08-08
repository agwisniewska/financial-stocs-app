import React from "react";

export default class TrackCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedSymbol: ""
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {searchedSymbol} = this.state;
    const symbolsSavedInLocalStorage = localStorage.getItem(searchedSymbol) === "true";
    if (!symbolsSavedInLocalStorage) {
      localStorage.setItem(`${searchedSymbol}`, searchedSymbol);
    }
    this.props.history.push('/companies');
  };

  handleChange = (event) => {
    this.setState({
      searchedSymbol: event.target.value
    })
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Company Symbol
          <input type="text"
                 placeholder="Company symbol"
                 value={this.state.searchedSymbol}
                 onChange={(event) => this.handleChange(event)}/>
          <small> Provide the stock exchange symbol of a company you want to track </small>
        </label>
        <input type="submit"
               value="Track"/>
      </form>
    )
  }
};
