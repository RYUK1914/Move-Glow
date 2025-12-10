import React from 'react';
import './Contact.css';
import instagram from '../assets/images/instagram.png';
import facebook from '../assets/images/facebook.png';
import phone from '../assets/images/phone.png';

const Contact = () => {
  return (
    <div className="contact">
      <section className="contact-box">
        <h2>Contact Us</h2>
        <div className="contact-item">
          <img src={instagram} alt="Instagram" />
          <a href="https://www.instagram.com/move_and_glow_juice/" target="_blank" rel="noopener noreferrer">Follow us on Instagram</a>
        </div>
        <div className="contact-item">
          <img src={facebook} alt="Facebook" />
          <span>Follow us on Facebook</span>
        </div>
        <div className="contact-item">
          <img src={phone} alt="Phone" />
          <span>+216 52 232 666</span>
        </div>
        <div className="contact-item">
          <img src={phone} alt="Phone" />
          <span>+216 23 222 447</span>
        </div>
        
        
      </section>
    </div>
  );
};

export default Contact;
