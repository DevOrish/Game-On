import contactService from '../../services/contact.service'

const loadContacts = () => {
    return async (dispatch) => {
        const contacts = await contactService.getContacts()
        return dispatch(setContacts(contacts))
    }
}

const setContacts = contacts => {
    return { type: 'SET_CONTACTS', contacts }
}



const loadCurrContact = (_id) => {
    return async (dispatch) => {
        const contact = await contactService.getContactById(_id)
        return dispatch(setCurrContact(contact))
    }
}

const setCurrContact = currContact => {
    return { type: 'SET_CURR_CONTACT', currContact }
}



const removeContact = (_id) => {
    return async (dispatch) => {
        await contactService.removeContact(_id)
        return dispatch(removeCurrContact())
    }
}

const removeCurrContact = () => {
    return { type: 'REMOVE_CONTACT'}
}



const saveContact = (contact) => {
    return async (dispatch) => {
        const savedContact = await contactService.saveContact(contact)
        return dispatch(updateContacts(savedContact))
    }
}

const updateContacts = (contact) => {
    return { type: 'UPDATE_CONTACTS',contact}
}

export default {
    loadContacts,
    loadCurrContact,
    removeContact,
    saveContact,
}