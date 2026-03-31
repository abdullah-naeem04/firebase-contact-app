import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchContact from "./components/SearchContact";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddUpdateContact from "./components/AddUpdateContact";
import { ToastContainer, Slide } from "react-toastify";
import NoContact from "./components/NoContact";
const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsList);
          return contactsList;
        });
      } catch (error) {
        console.log("Error fetching contacts:", error);
      }
    };
    getContacts();
  }, []);
  const filteredContact = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div>
      <Navbar />
      <SearchContact
        onOpen={onOpen}
        setSelectedContact={setSelectedContact}
        contacts={contacts}
        filteredContact={filteredContact}
      />
      {filteredContacts.length > 0 ? (
        <ContactCard
          contacts={filteredContacts}
          onOpen={onOpen}
          setSelectedContact={setSelectedContact}
        />
      ) : (
        <NoContact />
      )}
      <AddUpdateContact
        onClose={onClose}
        isOpen={isOpen}
        selectedContact={selectedContact}
      />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </div>
  );
};

export default App;
