import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const AddUpdateContact = ({ onClose, isOpen, selectedContact }) => {
  const isUpdate = !!selectedContact;

  const handleSubmit = async (values) => {
    try {
      if (isUpdate) {
        const contactRef = doc(db, "contacts", selectedContact.id);
        await updateDoc(contactRef, values);
        onClose();
        toast.success("Contact Updated Successfully ✅");
      } else {
        const contactRef = collection(db, "contacts");
        await addDoc(contactRef, values);
        onClose();
        toast.success("Contact Added Successfully 🎉");
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        validationSchema={contactSchema}
        enableReinitialize
        initialValues={{
          name: selectedContact?.name || "",
          email: selectedContact?.email || "",
        }}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label>Name</label>
            <Field name="name" className="h-10 border px-2" />
            <div className="text-xs text-red-500">
              <ErrorMessage name="name" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label>Email</label>
            <Field name="email" type="email" className="h-10 border px-2" />
            <div className="text-xs text-red-500">
              <ErrorMessage name="email" />
            </div>
          </div>

          <button
            type="submit"
            className="bg-(--dark-yellow) px-4 py-2 self-end rounded cursor-pointer text-white"
          >
            {isUpdate ? "Update Contact" : "Add Contact"}
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default AddUpdateContact;
