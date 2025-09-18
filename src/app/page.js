"use client"
import React, { useState, useRef } from "react";
import "./CaseOpening.css";

const items = [
  { id: 1, name: "AK-47 | Redline", img: "https://i.pinimg.com/736x/4d/78/9a/4d789a7d00d42df3c96ac808756ccc15.jpg" },
  { id: 2, name: "AWP | Asiimov", img: "https://i.pinimg.com/736x/1a/c3/e0/1ac3e098a2cebdaeefa31663d04abe1c.jpg" },
  { id: 3, name: "M4A4 | Howl", img: "https://i.pinimg.com/736x/11/38/c5/1138c5f1e93d3f5e03dbd2d671eb0d11.jpg" },
  { id: 4, name: "Glock-18 | Fade", img: "https://i.pinimg.com/736x/87/be/36/87be36f66374a2188fa15eaf07f01b03.jpg" },
  { id: 5, name: "Karambit | Doppler", img: "https://i.pinimg.com/736x/79/8c/80/798c809403713ea9092827f8cfea06d2.jpg" },
  { id: 6, name: "Desert Eagle | Blaze", img: "https://i.pinimg.com/736x/c6/4c/0e/c64c0e012db4cb285877d3496b88d8fe.jpg" },
];

const CaseOpening = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [finalItem, setFinalItem] = useState(null);
  const [translateX, setTranslateX] = useState(0);

  const containerRef = useRef(null);

  const spin = () => {
    setIsSpinning(true);
    setIsStopping(false);
    setFinalItem(null);

    // Start infinite fast spin (looping items)
    let position = 0;
    const speed = 40; // fast speed
    const itemWidth = window.innerWidth * 0.35; // 35vw in pixels
	const stripWidth = items.length * itemWidth; // each item ~260px wide

    containerRef.current = setInterval(() => {
      position -= speed;
      if (Math.abs(position) >= stripWidth) {
        position = 0; // reset loop
      }
      setTranslateX(position);
    }, 30);
  };

  const stopSpin = () => {
  if (!isSpinning) return;
  clearInterval(containerRef.current);

  setIsStopping(true);

  const winningIndex = Math.floor(Math.random() * items.length);

   const itemWidth = window.innerWidth * 0.35;
    const totalStripWidth = items.length * itemWidth;

  const extraRotations = 5; // how many times strip passes full length

  // Because we duplicated items in render, max translateX should not exceed stripWidth
  // Use modulo to wrap around
  const finalPos =
    -((extraRotations * totalStripWidth + winningIndex * itemWidth) % (totalStripWidth * 2));

  setTranslateX(finalPos);

  setTimeout(() => {
    setIsSpinning(false);
    setIsStopping(false);
    setFinalItem(items[winningIndex]);
  }, 8000); // matches CSS transition
};


  return (
    <div className="case-container">
      <div className="case-window">
        <div
          className={`case-strip ${isStopping ? "decelerate" : ""}`}
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {items.concat(items).map((item, idx) => (
            <div key={idx} className="case-item">
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
        <div className="case-indicator" />
      </div>

      {!isSpinning && !finalItem && (
        <button className="spin-btn" onClick={spin}>
          Эхлүүлэх
        </button>
      )}

      {isSpinning && !isStopping && (
        <button className="stop-btn" onClick={stopSpin}>
          Зогсоох
        </button>
      )}

      {finalItem && (
		<button className="spin-btn" onClick={spin}>
			Дахин эргүүлэх
		</button>
      )}
    </div>
  );
};

export default CaseOpening;
