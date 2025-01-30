import React, { useState } from "react";
import "../src/styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus("Sending...");

    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="contact-container">
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>If you have any questions or need assistance, feel free to reach out!</p>
      </section>

      <section className="contact-details">
        <div className="contact-card">
          <h3>Our Office</h3>
          <p>
            Blood Donation App Headquarters<br />
            123 Kinathukadavu Street<br />
            Coimbatore, Tamilnadu, 631027<br />
            Phone: 6381869191
          </p>
        </div>

        <div className="contact-card">
          <h3>Email Us</h3>
          <p>yasvanth.p2023it@sece.ac.in</p>
        </div>
      </section>

      <section className="contact-form">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
          />
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {formStatus && <p className="form-status">{formStatus}</p>}
        </form>
      </section>
    </div>
  );
};

export default Contact;
