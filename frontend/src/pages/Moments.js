import React, { useState, useEffect } from 'react';
import './Moments.css';

const Moments = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Generate array of moment images (1.jpg to 30.jpg)
  const momentImages = Array.from({ length: 30 }, (_, i) => `${i + 1}.jpg`);

  // Create train images array with img1.jpg to img25.jpg
  const trainImages = Array.from({ length: 25 }, (_, i) => `img${i + 1}.jpg`);

  // Images for under the header: img50.jpg to img55.jpg
  const headerImages = Array.from({ length: 20 }, (_, i) => `img${48 + i}.jpg`);

  // Double the train array for seamless animation
  const allTrainImages = [...trainImages, ...trainImages];

  useEffect(() => {
    // Start the curtain animation after component mounts
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000); // Animation duration: 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="moments-container">
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

      {/* If user wants to skip animation */}
      {!animationComplete && (
        <button 
          className="skip-animation-btn" 
          onClick={() => setAnimationComplete(true)}
        >
          Skip Animation
        </button>
      )}

      {/* Main Content (shown after animation) */}
      <div className={`moments-content ${animationComplete ? 'visible' : 'hidden'}`}>
        <div className="moments">
          <div className="moments-header">
            <h1>Our Moments</h1>
            <p>Capturing the freshness and joy of Move & Glow through the lens</p>
          </div>

          {/* Header Images Row - img50 to img55 */}
          <div className="header-images-row">
            <div className="header-images-container">
              {headerImages.map((img, index) => (
                <div key={index} className="header-image-item">
                  <img 
                    src={require(`../assets/train/${img}`)}
                    alt={`Special Moment ${48 + index}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Image Gallery Grid */}
          <div className="moments-gallery">
            {momentImages.map((img, index) => (
              <div key={index} className="moment-item">
                <img 
                  src={require(`../assets/moments/${img}`)} 
                  alt={`Move & Glow Moment ${index + 1}`}
                  loading="lazy"
                />
                <div className="moment-overlay">
                  <span className="moment-number">#{String(index + 1).padStart(2, '0')}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Image Train Animation - Using train images img1 to img25 */}
          <div className="image-train">
            <div className="image-train-inner">
              {allTrainImages.map((img, index) => (
                <div key={index} className="train-image-container">
                  <img 
                    src={require(`../assets/train/${img}`)}
                    alt={`Train Image ${img}`}
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
                    src={require(`../assets/train/${img}`)}
                    alt={`Train Image ${img}`}
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
      </div>
    </div>
  );
};

export default Moments;