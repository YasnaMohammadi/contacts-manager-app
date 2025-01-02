import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { useImmer } from "use-immer";
import { ToastContainer,toast } from "react-toastify";

import _ from 'lodash';

import { ContactContext } from "./context/contactContext";

import {
  AddContact, 
  EditContact, 
  ViewContact, 
  Contacts, 
  Navbar
} from "./components";

import { createContact, deleteContact, getAllContacts, getAllGroups } from "./services/contactService";

import './App.css';
import { 
  CONNENT, 
  CURRENTLINE, 
  FOREGROUND, 
  PURPLE, 
  YELLOW 

} from "./helpers/colors";

const App= () => {
  const [loading,setLoading]=useImmer(false);
  const [contacts,setContacts]=useImmer([]);
  const [filteredContacts,setFilteredContacts] = useImmer([]);
  const [groups,setGroups]=useImmer([])

  const navigate=useNavigate();

  useEffect(()=>{
    const fetchData=async ()=>{
      try {
        setLoading(true);
        const {data:contactsData}=await getAllContacts();
        const {data:groupsData}=await getAllGroups();

        setContacts(contactsData);
        setFilteredContacts(contactsData);

        setGroups(groupsData);

        setLoading(false);

      } catch (err){
        console.log(err.message);
        setLoading(false);
      }
    };

    fetchData();
  },[]);

const createContactForm=async values=>{
    try{
      setLoading((draft)=>!draft);

      const {status,data}=await createContact(values);

      if(status===201){
        toast.info("مخاطب با موفقیت ساخته شد",{icon:"🚀"});
        setContacts(draft => {
          draft.push(data)
        });
        setFilteredContacts(draft => {
          draft.push(data)
        });
        
        setLoading((prevLoading)=>!prevLoading)

        navigate("/contacts")
      }
    }catch(err){
      console.log(err.message);
      
      setLoading((prevLoading)=>!prevLoading)
    }
  };

  const confirmDelete = (contactId,contactFullname) => {
    confirmAlert({
      customUI : ({onClose}) => {
        return (
          <div
            dir="rtl"
            style={{
              backgroundColor: CURRENTLINE,
              border: `1px solid ${PURPLE}`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{color:YELLOW}}>پاک کردن مخاطب</h1>
            <p style={{color: FOREGROUND}}>
              مطمئنی که می خواهی مخاطب {contactFullname} رو پاک کنی
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{backgroundColor: PURPLE}}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{backgroundColor: CONNENT}}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };
  
  const removeContact=async (contactId) => {

    const contactBackup=[...contacts];

    try{
      setContacts((draft)=>draft.filter((c)=>c.id!==contactId));
      setFilteredContacts((draft)=>draft.filter((c)=>c.id!==contactId));
      
      toast.error("مخاطب با موفقیت حذف شد",{icon:"💣"});

      const status=await deleteContact(contactId);
      
      if(status!==200){
        setContacts((draft)=>draft.filter((c)=>c.id!==contactId));
        setFilteredContacts((draft)=>draft.filter((c)=>c.id!==contactId));

      }
    } catch(err) {
      console.log(err.message);

      setContacts(contactBackup);
      setFilteredContacts(contactBackup);

    }
  }

  const contactSearch=_.debounce( ( query ) => {
    
    if(!query){ setFilteredContacts([...contacts]) }

    console.log(query);

      setFilteredContacts(
        contacts.filter((contact) => {
          return contact.fullname
            .toLowerCase()
            .includes(query.toLowerCase());
        })
      );
      setFilteredContacts((draft)=>
        draft.filter((c)=>
          c.fullname.toLowerCase().includes(query.toLowerCase())
        )
      );
  },1000);

  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      setContacts,
      setFilteredContacts,
      contacts,
      filteredContacts,
      groups,
      deleteContact:confirmDelete,
      createContact:createContactForm,
      contactSearch,
    }}>
      <div className="App">
        
        <ToastContainer rtl={true} position="top-right" theme="colored"/>
        
        <Navbar/>
        <Routes>
          <Route path="/" element={<Navigate to="/contacts"/>}/>
          <Route path="/contacts" element={<Contacts />}/>
          <Route path="/contacts/add" element={<AddContact/>}/>
          <Route path="/contacts/:contactId" element={<ViewContact/>}/>
          <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
        </Routes>
      </div>
    </ContactContext.Provider>
  );
};

export default App;
