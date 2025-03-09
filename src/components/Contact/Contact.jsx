import { BsFillTelephoneFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import styles from "./Contact.module.css";

export default function Contact({ name, number, onDelete }) {
  return (
    <div className={styles.card}>
      <ul>
        <li className={styles.card_info}>
          <IoPerson />
          {name}
        </li>
        <li className={styles.card_info}>
          <BsFillTelephoneFill />
          {number}
        </li>
      </ul>
      <button className={styles.btn} type="button" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}
