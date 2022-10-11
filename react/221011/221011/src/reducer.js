const SIGN_IN = "SIGN_IN"
const SIGN_OUT = "SIGN_OUT"
const SIGN_UP = "SIGN_UP"


const Reducer = {}

const UserInit = {}
UserInit.token = null
UserInit.email = null

Reducer.reducer = function(state, action) {
    switch(action.type) {
        case SIGN_IN: {
            return {
                ...state,
                email: action.action.email,
                token: action.action.token,
                //비밀번호를 넘겨야하나?
            }
        }
        case SIGN_OUT: 
            return {
                ...state,
                email: null,
                token: null,
            }
        default: 
            return state
    }
}

export { Reducer, UserInit }