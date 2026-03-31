import { useState } from "react";
const useDisclose = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = () => {
    setIsOpen(true);
  };
  return { isOpen, onClose, onOpen };
};

export default useDisclose;
