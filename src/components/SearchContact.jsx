import { MdOutlineSearch } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
const SearchContact = ({
  contacts,
  onOpen,
  setSelectedContact,
  filteredContact,
}) => {
  return (
    <div className="flex justify-center p-4 my-5">
      <div className="flex items-center bg-transparent rounded-full w-96 sm:w-lg relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl">
          <MdOutlineSearch />
        </span>
        <input
          onChange={filteredContact}
          type="text"
          placeholder="Search contacts"
          className="border border-white rounded-full px-4 py-2 w-full outline-none pl-12 text-white placeholder:text-white placeholder:opacity-70 placeholder:font-extralight placeholder:text-sm sm:placeholder:text-base"
        />
        <button
          onClick={() => {
            setSelectedContact(null);
            onOpen();
          }}
          className="ml-2 p-3 rounded-full  bg-white text-gray-700 hover:bg-gray-200 cursor-pointer hover:scale-110 transistion ase-in-out duration-200"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default SearchContact;
