import React from "react";
import { useState } from "react";
import axios from "axios";
import * as styles from "./contactForm.module.css";

const ContactForm = ({ data }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactThrough, setContactThrough] = useState("Telefon");

  const [condition, setCondition] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("https://digitalocen-server-hw7vv.ondigitalocean.app/create/contact", {
        name,
        email,
        phone,
        contactThrough,
      })
      .then(() => {
        setCondition(true);

        setTimeout(() => {
          setCondition(false);
        }, 5000);
      });

    setName("");
    setEmail("");
    setPhone("");
    setContactThrough("Telefon");
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>{data.title}</h3>
      <p className={styles.subTitle}>{data.subTitle}</p>
      <div className={styles.formWrapper}>
        <form onSubmit={e => handleSubmit(e)}>
          <label>
            {data.labelInput1}
            <input
              className={styles.inputfield}
              required
              type="text"
              placeholder="Ange ditt namn.."
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label>
            {data.labelInput2}
            <input
              className={styles.inputfield}
              required
              type="text"
              placeholder="Ange email.."
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <label>
            {data.labelInput3}
            <input
              className={styles.inputfield}
              required
              type="number"
              placeholder="Ange telefonnummer.."
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </label>
          <div>
            <p className={styles.subTitleRadio}>Jag vill bli kontaktad via:</p>
            <div className={styles.radioBtns}>
              <div>
                <input
                  type="radio"
                  id="phone"
                  name="select"
                  value="Telefon"
                  className={styles.radio}
                  onClick={e => setContactThrough("Telefon")}
                />
                <label htmlFor="phone" className={styles.radioLabel}>
                  Telefon
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="email"
                  name="select"
                  value="Email"
                  className={styles.radio}
                  onClick={e => setContactThrough("Email")}
                />
                <label htmlFor="email" className={styles.radioLabel}>
                  Email
                </label>
              </div>
            </div>
          </div>
          <button className={styles.formSubmitBtn}>Skicka</button>
        </form>
        {condition && (
          <p className={styles.formFeedback}>
            Ditt formulär är skickat! Vi kontaktar er så fort vi kan.
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
