import React, {useReducer} from 'react';
import {v4 as uuid} from 'uuid';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Jill Johnson',
                email: 'jill@gamil.com',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Sara Watson',
                email: 'sara@gamil.com',
                phone: '222-222-2222',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Harry White',
                email: 'harry@gamil.com',
                phone: '333-333-3333',
                type: 'professional'
            }
        ],
        current: null,
        filtered: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    const addContact = contact => {
        contact.id = uuid();
        dispatch({type: ADD_CONTACT, payload: contact});
    };

    const deleteContact = id => {
        dispatch({type: DELETE_CONTACT, payload: id});
    };

    const updateContact = contact => {
        dispatch({type: UPDATE_CONTACT, payload: contact});
    };

    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    };

    const setCurrent = contact => {
        dispatch({type: SET_CURRENT, payload: contact});
    };

    const filterContacts = filter => {
        dispatch({type: FILTER_CONTACTS, payload: filter});
    };

    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER});
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                deleteContact,
                updateContact,
                clearCurrent,
                setCurrent,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
