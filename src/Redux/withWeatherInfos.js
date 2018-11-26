import { connect } from "react-redux";

function mapStateToProps(state, ...props) {
    return {
      date: state.date,
      city: state.city,
      cityId: state.cityId,
      weather: state.weather.list,
      cityInfos: state.weather.city
    };
  }


export default function withWeatherInfos(component)  {
   return connect(mapStateToProps,null)(component)
}

