const SLIDECOLLAPSED = 'SLIDECOLLAPSED'
export const mapStateToProps = (state) => {
    return {slidecollapsed: state.slidecollapsed}
}
export const mapDispatchToProps = (dispatch) => {
    return {onSlidecollapsed: () => dispatch({type: SLIDECOLLAPSED})}
}





