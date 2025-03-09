import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import styles from "./ContactForm.module.css";

const initialValues = {
  contactName: "",
  contactTel: "",
};

const ContactSchema = Yup.object().shape({
  contactName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  contactTel: Yup.string()
    .matches(/^[0-9/-]{7,9}$/, "Only numbers and dashes allowed, min.7, max.9")
    .required("Required"),
});

export default function ContactForm({ onAddContact }) {
  const nameFieldId = useId();
  const telFieldId = useId();

  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.contactName,
      number: values.contactTel,
    };
    onAddContact(newContact);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label htmlFor={nameFieldId}>Name</label>
        <Field type="text" name="contactName" id={nameFieldId} />
        <ErrorMessage
          name="contactName"
          component="span"
          className={styles.error}
        />
        <label htmlFor={telFieldId}>Number</label>
        <Field type="tel" name="contactTel" id={telFieldId} />
        <ErrorMessage
          name="contactTel"
          component="span"
          className={styles.error}
        />
        <button type="submit" className={styles.btnSubmit}>
          Add Contact
        </button>
      </Form>
    </Formik>
  );
}
