export const changeDate = date => ({
  type: "CHANGE_DATE",
  date
});

export const changeCity = city => ({
    type: "CHANGE_CITY",
    city
  });

export const getWeather = infos => ({
    type: "GET_WEATHER",
    infos
});