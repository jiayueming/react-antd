import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	loginData: [],
	reigsterData: {}
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.ACTION_LOGIN:
			return state.set('loginData', action.loginData);
		case constants.ACTION_REGISTER:
			return state.set('reigsterData', action.reigsterData);
		default:
			return state;
	}
}