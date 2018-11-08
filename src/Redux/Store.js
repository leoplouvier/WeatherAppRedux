import { createStore } from 'redux'
import SearchReducer from './Reducer/SearchReducer'
var store = createStore(SearchReducer);
export default store;