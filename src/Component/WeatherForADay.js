import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import MeteoCard from "./MeteoCard";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from '@material-ui/core/Divider';

const styles = {
  card: {
    width: "fit-content",
    marginBottom: 20
  },
  content: {
    display: "flex",
    flexDirection: "row"
  },
  title: {
    marginBottom:' 0.5em',
    marginTop: '0.5em',
    textAlign: 'start',
    marginLeft: '2.5em'
  },
  media: {
    objectFit: "contain"
  }
};

class WeatherForADay extends Component {
  render() {
    const { classes } = this.props;
    if (this.props.weather.length !== 0) {
      var today = this.props.date;
      var todayArray = today.toLocaleDateString().split("/");
      var todayAPIFormat =
        todayArray[2] + "-" + todayArray[1] + "-" + todayArray[0];
    }
    return (
      this.props.weather.length !== 0 && (
        <div>
          
          <Card className={classes.card}>
          <Typography
            variant="title"
            color="primary"
            className={classes.title}
          >
            {today.toDateString()}
          </Typography>
          <Divider />
            <CardContent className={classes.content}>
              {this.props.weather.map(
                w =>
                  w.dt_txt.split(" ")[0] === todayAPIFormat && (
                    <MeteoCard
                      key={w.dt}
                      hour={w.dt_txt}
                      min={w.main.temp_min}
                      max={w.main.temp_max}
                      weather={w.weather[0].main}
                      temp={w.main.temp}
                    />
                  )
              )}
            </CardContent>
          </Card>
        </div>
      )
    );
  }
}

export default withStyles(styles)(WeatherForADay);
