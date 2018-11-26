import React, { Component } from "react";
import "./style/App.css";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import store from "./Redux/Store";
import { getWeather } from "./Redux/actions";
import WeatherForADay from "./Component/WeatherForADay";
import Divider from "@material-ui/core/Divider";
import Header from "./Component/Header";
import LocationIcon from "@material-ui/icons/LocationOn";
import withWeatherInfos from "./Redux/withWeatherInfos";
import Icon from "@material-ui/icons/ExploreOutlined";

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
        <div style={{ width: "100%" , marginTop:'64px'}}>
          {this.state.chosenCity !== "" ? (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "baseline",
                  backgroundColor:'rgba(0,0,0,0.25)'
                }}
              >
                <Typography
                  variant="display2"
                  style={{ marginBottom: 3, marginTop: 50, color:'white' }}
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
              <Divider style={{ marginBottom: "20px", backgroundColor:'black' }} />
            </div>
          ):(
            <div style={{position: 'absolute',top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color:'#d1d6ef'}}>
              <Icon style={{fontSize: '300px'}}/>
              <Typography
                  variant="display1"
                  style={{ marginBottom: 3, marginTop: 50, color:'#d1d6ef'}}
                >
                  Search for a city to see its weather for the next 5 days
                </Typography>
            </div>
          )
          }
          {this.props.weather.length !== 0 && (
            <div style={{ width: "fit-content", margin: "auto" }}>
              <WeatherForADay date={today} weather={this.props.weather}/>
              <WeatherForADay date={tomorrow} weather={this.props.weather}/>
              <WeatherForADay date={twoDay} weather={this.props.weather}/>
              <WeatherForADay date={threeDay} weather={this.props.weather}/>
              <WeatherForADay date={fourDay} weather={this.props.weather}/>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withWeatherInfos(withStyles(styles)(App));
