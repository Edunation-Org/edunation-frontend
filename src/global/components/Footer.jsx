import React, { useState } from "react";
import s from "../styles/Footer.module.css";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name || formData.name.length < 2 || formData.name.length > 100) {
      newErrors.name = "Name must be between 2 and 100 characters.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone number validation
    if (!formData.phoneNumber || formData.phoneNumber.length < 8 || formData.phoneNumber.length > 20) {
      newErrors.phoneNumber = "Phone number must be between 8 and 20 characters.";
    }

    // Message validation
    if (!formData.message || formData.message.length < 10 || formData.message.length > 3000) {
      newErrors.message = "Message must be between 10 and 3000 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for the field being edited
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", phoneNumber: "", message: "" });
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <footer id="contact-section" className={s.footerContainer}>
      <h2 className={s.footerTitle}>Contact Us</h2>
      <div className={s.footerContent}>
        <div className={s.contactForm}>
          <h3>Send us a message</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className={s.errorText}>{errors.name}</p>}
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className={s.errorText}>{errors.email}</p>}
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              {errors.phoneNumber && <p className={s.errorText}>{errors.phoneNumber}</p>}
            </label>
            <label>
              Message:
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              {errors.message && <p className={s.errorText}>{errors.message}</p>}
            </label>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <div className={s.contactDirectly}>
          <h3>Or try calling us directly</h3>
          <p>Phone Numbers:</p>
          <ul>
            <li>209-500-7184</li>
            <li>313-349-9975</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
