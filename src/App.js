import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import CitySearch from "./CitySearch";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/icons/Send";
import { withStyles } from "@material-ui/core";
import store from "./Redux/Store";
import { getWeather } from "./Redux/actions";
import WeatherForADay from "./WeatherForADay";
import Divider from "@material-ui/core/Divider";
import Header from "./Header";
import LocationIcon from "@material-ui/icons/LocationOn";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCity: ""
    };
  }
  submitCity() {
    this.setState({ chosenCity: this.props.city });
    fetch(
      "http://api.openweathermap.org/data/2.5/forecast?id=" +
        this.props.cityId +
        "&APPID=9499813c157646096efc0a95cdd5667a&units=metric"
    )
      .then(response => response.json())
      .then(data => store.dispatch(getWeather(data)));
  }
  goToLocation() {
    window.open(
      "http://www.google.com/maps/place/" +
        this.props.cityInfos.coord.lat +
        "," +
        this.props.cityInfos.coord.lon,
      "_blank"
    );
  }
  render() {
    const { classes } = this.props;
    if (this.props.weather.length !== 0) {
      var today = new Date(this.props.weather[0].dt_txt);
      var tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      var twoDay = new Date();
      twoDay.setDate(today.getDate() + 2);
      var threeDay = new Date();
      threeDay.setDate(today.getDate() + 3);
      var fourDay = new Date();
      fourDay.setDate(today.getDate() + 4);
    }
    return (
      <div className="App">
        <Header submitCity={() => this.submitCity()} />
        <div style={{ width: "100%" }}>
          {this.state.chosenCity !== "" && (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline"
                }}
              >
                <Typography
                  color="primary"
                  variant="display2"
                  style={{ marginBottom: 3, marginTop: 50 }}
                >
                  {this.state.chosenCity}
                </Typography>
                <Button
                  color="secondary"
                  mini
                  className={classes.button}
                  onClick={() => this.goToLocation()}
                >
                  {" "}
                  <LocationIcon />
                </Button>
              </div>
              <Divider style={{ marginBottom: "20px" }} />
            </div>
          )}
          {this.props.weather.length !== 0 && (
            <div style={{ width: "fit-content", margin: "auto" }}>
              <WeatherForADay date={today} />
              <WeatherForADay date={tomorrow} />
              <WeatherForADay date={twoDay} />
              <WeatherForADay date={threeDay} />
              <WeatherForADay date={fourDay} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    date: state.date,
    city: state.city,
    cityId: state.cityId,
    weather: state.weather.list,
    cityInfos: state.weather.city
  };
}

export default connect(mapStateToProps)(withStyles(styles)(App));
