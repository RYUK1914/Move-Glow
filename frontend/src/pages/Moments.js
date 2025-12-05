import React from 'react';
import './Moments.css';

const Moments = () => {
  // Generate array of moments images (1.jpg to 30.jpg)
  const momentImages = Array.from({ length: 30 }, (_, i) => `${i + 1}.jpg`);

  // Double the array for seamless animation
  const allTrainImages = [...momentImages, ...momentImages];

  return (
    <div className="moments">
      <div className="moments-header">
        <h1>Our Moments</h1>
        <p>Capturing the freshness and joy of Move&Glow through the lens</p>
      </div>

      {/* Image Gallery Grid */}
      <div className="moments-gallery">
        {momentImages.map((img, index) => (
          <div key={index} className="moment-item">
            <img 
              src={require(`../assets/moments/${img}`)} 
              alt={`Move&Glow Moment ${index + 1}`}
              loading="lazy"
            />
            <div className="moment-overlay">
              <span className="moment-number">#{String(index + 1).padStart(2, '0')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Image Train Animation - Same as Home page */}
      <div className="image-train">
        <div className="image-train-inner">
          {allTrainImages.map((img, index) => (
            <div key={index} className="train-image-container">
              <img 
                src={require(`../assets/moments/${img}`)} 
                alt={`Moment ${img}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Second Image Train for continuous flow */}
      <div className="image-train image-train-second">
        <div className="image-train-inner">
          {allTrainImages.map((img, index) => (
            <div key={`second-${index}`} className="train-image-container">
              <img 
                src={require(`../assets/moments/${img}`)} 
                alt={`Moment ${img}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="moments-footer">
        <h2>More Than Just Juice</h2>
        <p>Every bottle tells a story of freshness, health, and vibrant living.</p>
        <p>Follow our journey as we bring nature's best to your table.</p>
      </div>
    </div>
  );
};

export default Moments;