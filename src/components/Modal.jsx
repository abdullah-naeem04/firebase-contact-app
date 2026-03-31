import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="grid place-items-center backdrop-blur-xs z-40 absolute top-0 h-screen w-screen">
          <div className="relative z-50 m-auto min-h-50 min-w-[80%] bg-white p-3">
            <div className="flex justify-end ">
              <AiOutlineClose
                onClick={onClose}
                className="cursor-pointer text-xl hover:scale-115 transition duration-200 ease-in-out"
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
