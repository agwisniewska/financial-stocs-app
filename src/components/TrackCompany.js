import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button/Button"
import TextField from "@material-ui/core/TextField/TextField";
import {withStyles} from "@material-ui/styles";

const styles = () => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: '1rem',
    textAlign: 'center',
    minHeight: "20vh",
    margin: "2rem 0 0 0"
  },
});

class TrackCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedSymbol: ""
    }
  }

  handleSubmit = () => {
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

    const {classes} = this.props;
    return (<Grid
      container
      direction="row"
      justify="center"
      alignItems="center">
      <Grid item
            xs={12}
            sm={6}>
        <Paper className={classes.paper}>


            <TextField
              id="outlined-name"
              label="Company symbol"
              value={this.state.searchedSymbol}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
          <small> Provide the stock exchange symbol of a company you want to track</small>

          <Button variant="contained"
                    color="primary"
                    onClick={this.handleSubmit}>Add </Button>


        </Paper>
      </Grid>
    </Grid>)
  }
};

export default withStyles(styles)(TrackCompany);