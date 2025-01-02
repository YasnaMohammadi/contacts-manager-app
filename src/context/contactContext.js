import { createContext } from "react";

export const ContactContext=createContext({
    loading:false,
    setLoading:() => {},
    setContacts:() => {},
    contacts:[],
    filteredContacts:[],
    setFilteredContacts:()=>{},
    groups:[],
    deleteContact:() => {},
    updateContact:() => {},
    createContact:() => {},
    contactSearch:() => {},
});