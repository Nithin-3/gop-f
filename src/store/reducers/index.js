import { combineReducers } from 'redux';
import authReducer from './main/authReducer'

export default combineReducers({
	auth: authReducer
});
