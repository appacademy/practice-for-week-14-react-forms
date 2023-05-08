// ./src/ContactUs.js

import { useState, useEffect } from "react";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState([]);
  const [comments, setComments] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [formValid, setFormValid] = useState(false);

  function validateName(name) {
    const nameRegex = /^[a-zA-Z ]{3,}$/;
    return nameRegex.test(name);
  }

  function validateEmail(email) {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }
  const onSubmit = (e) => {
    // Prevent the default form behavior so the page doesn't reload.
    e.preventDefault();

    // Create a new object for the contact us information.
    const contactUsInformation = {
      name,
      email,
      phone,
      phoneType,
      comments,
      submittedOn: new Date(),
    };
    console.log(contactUsInformation);
    // Reset the form state.
    setName("");
    setEmail("");
    setPhone("");
    setPhoneType("");

    setComments("");
  };
  useEffect(() => {
    const err = [];
    if (!validateName(name)) {
      err.push("Invalid name");
      setMessage(err);
      setFormValid(false);
    }
    if (!validateEmail(email)) {
      err.push("Invalid email");
      setMessage(err);
      setFormValid(false);
    }
    if (!validatePhone(phone)) {
      err.push("Invalid phone number");
      setMessage(err);
      setFormValid(false);
    }
    if (validateName(name) && validateEmail(email) && validatePhone(phone)) {
      setFormValid(true);
      setMessage([]);
    }
    console.log(validateName(name), validateEmail(email), validatePhone(phone));
  }, [name, email, phone]);

  return (
    <div className="container">
      <h2>Contact Us</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="form-control"
            id="name"
            placeholder="Enter Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="form-control"
            id="email"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">phone</label>
          <input
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className="form-control"
            id="phone"
            placeholder="Enter phone"
          />
          <select
            disabled={!phone}
            className="form-control"
            name="phoneType"
            onChange={(e) => setPhoneType(e.target.value)}
            value={phoneType}
          >
            <option value="" disabled>
              Select a phone type...
            </option>
            <option>Home</option>
            <option>Work</option>
            <option>Mobile</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <textarea
            className="form-control"
            id="comments"
            name="comments"
            onChange={(e) => setComments(e.target.value)}
            value={comments}
          />
        </div>
        {message.map((msg) => {
          return (
            <small id="message" class="form-text text-muted">
              {msg}
            </small>
          );
        })}

        <button disabled={!formValid} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactUs;
