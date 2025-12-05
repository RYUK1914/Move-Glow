import React from 'react';
import './Home.css';
import bottles from '../assets/videos/bottles.mp4';
import post1 from '../assets/videos/post1.mp4';
import post2 from '../assets/videos/post2.mp4';
import post3 from '../assets/videos/post3.mp4';
import post4 from '../assets/videos/post4.jpg';
import post5 from '../assets/videos/post5.jpg';
import post6 from '../assets/videos/post6.jpg';
import post7 from '../assets/videos/post7.jpg';

const Home = () => {
  // Generate array for original images
  const originalImages = [
    'mov3.png', 'mov2.png', 'mov1.png', 'mov4.png', 'cat1.png', 'cat2.png',
    'cat8.png', 'cat7.png', 'f1.png', 'b2.png', '1c.png', 'cat4.png',
    'cat3.png', 'mov4.png', 'mov1.png', 'im5.png', 'im6.png', 'im7.png', 'im8.png'
  ];

  // Combine arrays for the train animation
  const allTrainImages = [...originalImages];

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

      <div className="section">
        <div className="section-media">
          <video src={post2} autoPlay muted loop></video>
        </div>
        <div className="section-content">
          <h2>Fresh & Natural</h2>
          <p>We source our fruits and vegetables directly from local farms to ensure maximum freshness and nutritional value.</p>
        </div>
      </div>

      {/* New video section - post3 */}
      <div className="section">
        <div className="section-content">
          <h2>Organic Goodness</h2>
          <p>Experience the pure taste of nature with our 100% organic juice blends, free from additives and preservatives.</p>
        </div>
        <div className="section-media">
          <video src={post3} autoPlay muted loop></video>
        </div>
      </div>

      {/* Two images on left, two on right - First set with new images */}
      <div className="section two-images">
        <div className="section-content">
          <h2>Boost Your Immunity</h2>
          <p>Rich in vitamin C and other immune-boosting nutrients, our juices help keep you healthy and strong.</p>
        </div>
        <div className="section-media">
          <img src={post4} alt="Immunity Boost 1" />
          <img src="/assets/images/im4.png" alt="Immunity Boost 2" />
        </div>
      </div>

      <div className="section two-images">
        <div className="section-media">
          <img src={post5} alt="Energy Boost 1" />
          <img src="/assets/images/mov2.png" alt="Energy Boost 2" />
        </div>
        <div className="section-content">
          <h2>Natural Energy</h2>
          <p>Get a natural energy boost without the crash from our carefully crafted juice blends.</p>
        </div>
      </div>

      {/* New two-image section with post6 and post7 */}
      <div className="section two-images">
        <div className="section-content">
          <h2>Vibrant Colors</h2>
          <p>Our juices capture the vibrant colors and flavors of fresh fruits and vegetables in every bottle.</p>
        </div>
        <div className="section-media">
          <img src={post6} alt="Vibrant Colors 1" />
          <img src={post7} alt="Vibrant Colors 2" />
        </div>
      </div>

      {/* Two images on left, two on right - Second set */}
      <div className="section two-images">
        <div className="section-media">
          <img src="/assets/images/cat1.png" alt="Premium Quality 1" />
          <img src="/assets/images/cat2.png" alt="Premium Quality 2" />
        </div>
        <div className="section-content">
          <h2>Premium Quality</h2>
          <p>Experience the difference with our premium selection of organic fruits and vegetables.</p>
        </div>
      </div>

      <div className="section two-images">
        <div className="section-content">
          <h2>Fresh Delivery</h2>
          <p>We deliver freshness to your doorstep with our carefully packaged juice bottles.</p>
        </div>
        <div className="section-media">
          <img src="/assets/images/cat7.png" alt="Fresh Delivery 1" />
          <img src="/assets/images/cat8.png" alt="Fresh Delivery 2" />
        </div>
      </div>

      <div className="section">
        <div className="section-content">
          <h2>You can find our product in :</h2>
          <p>MONOPRIX ain zaghouin - Zéphyr - Carthage - El menzah-Marsa Aouina - Zayetine - Ennasr - Jardin de carthage</p>
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