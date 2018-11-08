var fullDate = new Date().toLocaleDateString();
var day = fullDate.split("/")[0];
var month = fullDate.split("/")[1];
var year = fullDate.split("/")[2];
    
var initialDate={
    date: year + "-" + month + "-" + day,
    city:'Paris',
    country:'FR',
    cityId:'6455259',
    weather:{list:[],city:{coord:{lat:'',lon:''}}}
}
var  SearchReducer = (state = initialDate, action) => {
    switch (action.type) {
        case 'CHANGE_DATE':
            return {...state, date : action.date}
        case 'CHANGE_CITY' : 
            return {...state, city: action.city.name,country: action.city.country,cityId:action.city.id}
        case 'GET_WEATHER' : 
            return {...state, weather: action.infos}
        default:
            return state;
    }
}
export default SearchReducer