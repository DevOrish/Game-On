const INITIAL_STATE = {
    loggedInUser: null,
}

export default function contactReducer(state = INITIAL_STATE, action) { 
    switch (action.type) {
        case 'SET_CURR_USER':
            return {
                ...state,
                loggedInUser: action.user
            }
        default:
            return state
    }
}