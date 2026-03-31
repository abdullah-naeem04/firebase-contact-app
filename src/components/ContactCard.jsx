import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
const ContactCard = ({ contacts, onOpen, setSelectedContact }) => {
  const deleteContact = async (id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await deleteDoc(contactRef);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="max-w-2xl mx-auto">
        {contacts &&
          contacts.map((contact) => (
            <div
              key={contact.id}
              className=" flex justify-between items-center bg-(--yellow) p-2 m-3 rounded "
            >
              <div className="flex items-center gap-2 min-w-0">
                <HiOutlineUserCircle className="text-4xl text-(--orange) min-w-0 " />
                <div className="min-w-0">
                  <h2 className="">{contact.name}</h2>
                  <p className="font-light text-sm overflow-hidden truncate">
                    {contact.email}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <RiEditCircleLine
                  onClick={() => {
                    setSelectedContact(contact);
                    onOpen();
                  }}
                  className="text-2xl cursor-pointer"
                />
                <IoMdTrash
                  onClick={() => {
                    deleteContact(contact.id);
                    toast.success("Contact Deleted 🗑️");
                  }}
                  className="text-2xl text-purple-700 cursor-pointer"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ContactCard;
