import React, { useState, useEffect } from 'react';
import './Contact.css';
import instagram from '../assets/images/instagram.png';
import facebook from '../assets/images/facebook.png';
import phone from '../assets/images/phone.png';

const Contact = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Start the curtain animation after component mounts
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000); // Animation duration: 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="contact-container">
      {/* Curtain Animation Images */}
      <div className={`curtain-animation ${animationComplete ? 'hidden' : ''}`}>
        {/* Images coming from RIGHT to LEFT */}
        <img 
          src="/assets/images/mv1.png" 
          alt="Move & Glow" 
          className="curtain-image curtain-right-to-left curtain-image-1"
        />
        <img 
          src="/assets/images/mv3.png" 
          alt="Move & Glow" 
          className="curtain-image curtain-right-to-left curtain-image-3"
        />
        
        {/* Images coming from LEFT to RIGHT */}
        <img 
          src="/assets/images/mv2.png" 
          alt="Move & Glow" 
          className="curtain-image curtain-left-to-right curtain-image-2"
        />
        <img 
          src="/assets/images/mv4.png" 
          alt="Move & Glow" 
          className="curtain-image curtain-left-to-right curtain-image-4"
        />
      </div>

      {/* Contact Box (shown after animation) */}
      <div className={`contact-content ${animationComplete ? 'visible' : 'hidden'}`}>
        <div className="contact">
          <section className="contact-box">
            <h2>Contact Us</h2>
            <div className="contact-item">
              <img src={instagram} alt="Instagram" />
              <a href="https://www.instagram.com/move_and_glow_juice/" target="_blank" rel="noopener noreferrer">
                Follow us on Instagram
              </a>
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
      </div>

      {/* If user wants to skip animation */}
      {!animationComplete && (
        <button 
          className="skip-animation-btn" 
          onClick={() => setAnimationComplete(true)}
        >
          Skip Animation
        </button>
      )}
    </div>
  );
};

export default Contact;