import userService from '../../services/user.service'

const getLoggedInUser = () => {
    return async (dispatch) => {
        const user = await userService.getUser()
        return dispatch(setUser(user))
    }
}

const setUser = (user) => {
    return { type: 'SET_CURR_USER', user }
}


const signUp = (name) => {
    return async (dispatch) => {
        const user = await userService.signUp(name)
        return dispatch(setUser(user))
    }
}


const checkLogin = (name) => {
    return async (dispatch) => {
        const user = await userService.checkLogin(name)
        if (user) return dispatch(setUser(user))
    }
}


const addMove = (contact, amount) => {
    return async (dispatch) => {
        const user = await userService.addMove(contact, amount)
        return dispatch(setUser(user))
    }
}

export default {
    getLoggedInUser,
    checkLogin,
    signUp,
    addMove,
}