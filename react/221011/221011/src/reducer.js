const Reducer = {}
const SIGN_IN = "SIGN_IN"
const SIGN_OUT = "SIGN_OUT"
const SIGN_UP = "SIGN_UP"

Reducer.reducer = function(state, action) {
    switch(action.type) {
        case SIGN_IN: 
            return {
                ...state,
                
            }
        case SIGN_OUT: 
            return {
                //뭔가 상태를 지워야겠지
            }
        default: 
            return state
    }
}