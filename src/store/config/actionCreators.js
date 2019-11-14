import * as constants from './constants';

export const onSlidecollapsed = () => {
	return (dispatch) => {
        dispatch({type: constants.SLIDECOLLAPSED})
    }
}

export const getRouterConfig = () => {
	return (dispatch)=>{
		dispatch({
			type: constants.ROUTERCONFIG
		})
	}
}

// export const toggleSlide = () => {
//     return (dispatch) => {
//         dispatch({type: action_slidecollapsed.type})
//     }
// }
