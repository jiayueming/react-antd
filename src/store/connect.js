const SLIDECOLLAPSED = 'SLIDECOLLAPSED'
export const mapStateToProps = (state) => {
    return {slidecollapsed: state.slidecollapsed}
}
export const mapDispatchToProps = (dispatch) => {
    console.log('66757')
    return {onSlidecollapsed: () => dispatch({type: SLIDECOLLAPSED})}
}





