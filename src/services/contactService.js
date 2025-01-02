import axios from "axios";

const SERVER_URL="http://localhost:9000";

// @desc Get All Contacts
// @route GTE http://localhost:9000/contacts 
export const getAllContacts= () => {
    const url=`${SERVER_URL}/contacts`;
    return axios.get(url);
}

// @desc Get Contacts With Contact ID
// @route GTE http://localhost:9000/contacts/:contactId
export const getContact= (contactId)=>{
    const url=`${SERVER_URL}/contacts/${contactId}`;
    return axios.get(url);
}

// @desc Get All Groups
// @route GTE http://localhost:9000/groups 
export const getAllGroups=() => {
    const url=`${SERVER_URL}/groups`;
    return axios.get(url);
}

// @desc Get Group Name With Group ID
// @route GTE http://localhost:9000/groups/:groupId 
export const getGroup=(groupID) => {
    const url=`${SERVER_URL}/groups/${groupID}`;
    return axios.get(url);
}

// @desc Mount New Contact With Object Contact
// @route POST http://localhost:9000/contacts
export const createContact=(contact) => {
    const url=`${SERVER_URL}/contacts`;
    return axios.post(url,contact);
}

// @desc Update Contact With Object Contact And Contact ID
// @route PUT http://localhost:9000/contacts/:contactId
export const updateContact=(contact,contactId) => {
    const url=`${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url,contact);
}

// @desc Delet Contact With Contact ID
// @route DELETE http://localhost:9000/contacts/:contactId
export const deleteContact=(contactId) => {
    const url=`${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url);
}