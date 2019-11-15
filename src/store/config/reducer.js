import { fromJS } from 'immutable';
import * as constants from './constants';
import { routerConfig as myRouterConfig } from '@/router/index'

const defaultState = fromJS({
    slidecollapsed: false,
    isSlide: false,
    routerConfig: {}
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.SLIDECOLLAPSED:
			console.log('yyy', !state.toObject().slidecollapsed)
			return state.set('slidecollapsed', !state.toObject().slidecollapsed);
		case constants.ROUTERCONFIG:
            console.log('3', myRouterConfig)
			return state.set('routerConfig', fromJS({routerConfig: myRouterConfig}));
		default:
			return state;
	}
}