
const INITIAL_STATE = {
    contacts: null,
    currContact: null
}

export default function contactReducer(state = INITIAL_STATE, action) { //action : {type: 'SET_CURR_ROBOT', robot:robot}
    switch (action.type) {
        case 'SET_CURR_CONTACT':
            return {
                ...state,
                currContact: action.currContact
            }
        case 'SET_CONTACTS':
            return {
                ...state,
                contacts: action.contacts
            }
        case 'REMOVE_CURR_CONTACT':
            return {
                ...state,
                currContact: null
            }
        case 'UPDATE_CONTACTS':
            const idx = state.contacts.findIndex(currContact => {
                return currContact._id === action.contact._id
            })
            return {
                ...state,
                contacts: [
                    ...state.contacts.slice(0, idx),
                    action.contact,
                    ...state.contacts.slice(idx + 1)
                ]
            }
        default:
            return state
    }
}