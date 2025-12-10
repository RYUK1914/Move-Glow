import React, { useEffect } from 'react';
import './Home.css';
import bottles from '../assets/videos/bottles.mp4';
import post1 from '../assets/videos/post1.mp4';

const Home = () => {
  // Generate array for original images
  const originalImages = [
    'mov3.png', 'mov2.png', 'mov1.png', 'mov4.png', 'cat1.png', 'cat2.png',
    'cat8.png', 'cat7.png', 'f1.png', 'b2.png', '1c.png', 'cat4.png',
    'cat3.png', 'mov4.png', 'mov1.png', 'im5.png', 'im6.png', 'im7.png', 'im8.png'
  ];

  // Combine arrays for the train animation
  const allTrainImages = [...originalImages];

  // Scroll animation effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all paragraphs and headings
    document.querySelectorAll('.section-content, .section-content-alt, .paragraph-with-image, .content-with-image, .balanced-section, .locations-section').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <video src={bottles} autoPlay muted loop></video>
        <div className="hero-content">
          <h1>Welcome to Move&Glow</h1>
          <p>Discover the power of natural juices for a healthier, more vibrant you.</p>
        </div>
      </div>

      <div className="section">
        <div className="section-content">
          <h2>Why Choose Our Juices ?</h2>
          <p>Our juices are made from the finest organic ingredients, packed with vitamins and antioxidants to boost your health and energy levels.</p>
        </div>
        <div className="section-media">
          <video src={post1} autoPlay muted loop></video>
        </div>
      </div>

      {/* 100% Natural section - No image */}
      <div className="section">
        <div className="section-content">
          <h2>100% Natural & Sugar-Free</h2>
          <p>Our juice products are crafted with 100% natural ingredients, containing absolutely no added sugars. Pure taste, pure health.</p>
          <p>Perfect for sporty people who need clean energy without sugar crashes. Stay energized and perform at your peak.</p>
        </div>
      </div>

      {/* Fruit Benefits section - No images */}
      <div className="section">
        <div className="section-content">
          <h2>Powerful Fruit Benefits</h2>
          <p>Ananas boosts digestion and reduces inflammation. Kiwi provides vitamin C for immunity and recovery.</p>
          <p>Pomme supports hydration and energy. Citron detoxifies and alkalizes the body. Menths soothes digestion and refreshes.</p>
        </div>
        <div className="section-content-alt">
          <h2>Natural Energy for Athletes</h2>
          <p>Our sugar-free juices provide sustained energy for workouts and recovery. No artificial ingredients, just pure fruit power.</p>
          <p>Perfect before, during, and after exercise. Supports muscle function and reduces fatigue naturally.</p>
        </div>
      </div>

      {/* Body & Performance - No image */}
      <div className="section">
        <div className="section-content">
          <h2>Body & Performance</h2>
          <p>Ananas aids muscle recovery. Kiwi enhances endurance. Pomme maintains energy levels.</p>
          <p>Citron boosts metabolism and hydration. Menths improves breathing and digestion. Feel the difference in your performance.</p>
        </div>
      </div>

      {/* Boost Your Immunity - with unique image */}
      <div className="section balanced-section">
        <div className="balanced-content">
          <h2>Boost Your Immunity</h2>
          <p>Rich in vitamin C and other immune-boosting nutrients, our juices help keep you healthy and strong.</p>
        </div>
        <div className="balanced-media">
          <img src="/assets/images/cat1.png" alt="Immune Boost" />
        </div>
      </div>

      {/* Natural Energy - with unique image */}
      <div className="section balanced-section">
        <div className="balanced-media">
          <img src="/assets/images/cat7.png" alt="Natural Energy" />
        </div>
        <div className="balanced-content">
          <h2>Natural Energy</h2>
          <p>Get a natural energy boost without the crash from our carefully crafted juice blends.</p>
        </div>
      </div>

      {/* Premium Quality - with unique image */}
      <div className="section balanced-section">
        <div className="balanced-content">
          <h2>Premium Quality</h2>
          <p>Experience the difference with our premium selection of organic fruits and vegetables.</p>
        </div>
        <div className="balanced-media">
          <img src="/assets/images/cat8.png" alt="Premium Quality" />
        </div>
      </div>

      {/* Fresh Delivery - with unique image */}
      <div className="section balanced-section">
        <div className="balanced-media">
          <img src="/assets/images/mov1.png" alt="Fresh Delivery" />
        </div>
        <div className="balanced-content">
          <h2>Fresh Delivery</h2>
          <p>We deliver freshness to your doorstep with our carefully packaged juice bottles.</p>
        </div>
      </div>

      {/* Product Locations with video */}
      <div className="section locations-section">
        <div className="section-content">
          <h2>You can find our product in :</h2>
          <p>MONOPRIX ain zaghouin - Zéphyr - Carthage - El menzah-Marsa Aouina - Zayetine - Ennasr - Jardin de carthage</p>
        </div>
        <div className="section-media">
          <video src={post1} autoPlay muted loop></video>
        </div>
      </div>

      {/* Image Train Section */}
      <div className="image-train">
        <div className="image-train-inner">
          {allTrainImages.map((img, index) => (
            <img key={index} src={`/assets/images/${img}`} alt={img} />
          ))}
        </div>
      </div>

      {/* Additional Image Train for continuous flow */}
      <div className="image-train image-train-second">
        <div className="image-train-inner">
          {allTrainImages.map((img, index) => (
            <img key={`second-${index}`} src={`/assets/images/${img}`} alt={img} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;