import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import contactReducer from './contact/contact.reducers'
import userReducer from './user/user.reducers'
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const rootReducer = combineReducers({
    contact: contactReducer,
    user: userReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk))

export default store
