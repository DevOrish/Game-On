import utilService from './utils.service'

export default {
    getUser,
    signUp,
    addMove,
    checkLogin,
}

var gUsers = _createUsers()

function _createUsers() {
    var users = utilService.loadFromStorage('users')
    if (!users) {
        users = [
            {
                _id: utilService.makeId(),
                name: "Shuki",
                coins: 100,
                moves: []
            },
            {
                _id: utilService.makeId(),
                name: "Shula Mualem",
                coins: 100,
                moves: []
            },
            {
                _id: utilService.makeId(),
                name: "Zigmond",
                coins: 100,
                moves: []
            },
            {
                _id: utilService.makeId(),
                name: "Mulu Mendi",
                coins: 100,
                moves: []
            }
        ]
        utilService.saveToStorage('users', users)
    }
    gUsers = users
    return gUsers
}


function addMove(contact, amount) {
    var loggedInUser = getUser()    
    if (loggedInUser.coins < amount) return utilService.showToast('Not enough BTC\'s in your wallet','warning')    
    loggedInUser.moves.unshift({
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount
    })
    loggedInUser.coins -= amount
    utilService.saveToStorage('loggedInUser', loggedInUser)
    return Promise.resolve(loggedInUser)
}

function getUser() {
    var loggedInUser = utilService.loadFromStorage('loggedInUser')    
    if (!loggedInUser) {
        loggedInUser = gUsers[3]
        utilService.saveToStorage('loggedInUser', loggedInUser)
    }
    return loggedInUser
}

function signUp(name) {
    const newUser = {
        _id: utilService.makeId(),
        name,
        coins: 100,
        moves: []
    }
    gUsers.push(newUser)
    utilService.saveToStorage('users', gUsers)
    utilService.saveToStorage('loggedInUser', newUser)
    return Promise.resolve(newUser)
}

function checkLogin(name) {
    var user = gUsers.find(user => {
        return user.name === name
    })    
    if (!user) return Promise.reject('Nope')
    utilService.saveToStorage('loggedInUser', user)
    return Promise.resolve(user)
}