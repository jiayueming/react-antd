import { combineReducers } from 'redux-immutable';
import { reducer as configReducer } from './config';
import { reducer as commonReducer } from './common';

const reducer = combineReducers({
	config: configReducer,
	common: commonReducer
});

export default reducer;