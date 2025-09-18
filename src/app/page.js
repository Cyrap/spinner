"use client"
import React, { useState, useRef } from "react";
import "./CaseOpening.css";

const items = [
  { id: 1, name: "AK-47 | Redline", img: "https://i.pinimg.com/736x/4d/78/9a/4d789a7d00d42df3c96ac808756ccc15.jpg" },
  { id: 2, name: "AWP | Asiimov", img: "https://i.pinimg.com/736x/1a/c3/e0/1ac3e098a2cebdaeefa31663d04abe1c.jpg" },
  { id: 3, name: "M4A4 | Howl", img: "https://i.pinimg.com/736x/11/38/c5/1138c5f1e93d3f5e03dbd2d671eb0d11.jpg" },
  { id: 4, name: "Glock-18 | Fade", img: "https://i.pinimg.com/736x/87/be/36/87be36f66374a2188fa15eaf07f01b03.jpg" },
  { id: 5, name: "Karambit | Doppler", img: "https://i.pinimg.com/736x/79/8c/80/798c809403713ea9092827f8cfea06d2.jpg" },
];

const CaseOpening = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [finalItem, setFinalItem] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const [counter, setCounter] = useState(0);

const whenToCallStopAfterSpinStarted = [4300, 5120, 6250, 7380, 8450];


  const intervalRef = useRef(null);
  const stopTimeoutRef = useRef(null);
  const isSpinningRef = useRef(false);

  const handleCounter = () => {
    setCounter(prev => {
      const newVal = prev >= 4 ? 0 : prev + 1;
      console.log("Counter updated:", newVal);
      return newVal;
    });
  };

  const spin = () => {
    handleCounter();
    setIsSpinning(true);
    isSpinningRef.current = true; // immediately reflect spinning
    setIsStopping(false);
    setFinalItem(null);

    let position = 0;
    const speed = 40;
    const itemWidth = window.innerWidth * 0.35;
    const stripWidth = items.length * itemWidth;

    // Start spinning
    intervalRef.current = setInterval(() => {
      position -= speed;
      if (Math.abs(position) >= stripWidth) {
        position = 0; // loop continuously
      }
      setTranslateX(position);
    }, 30);

    // Schedule automatic stop based on counter
    const stopDelay = whenToCallStopAfterSpinStarted[counter % whenToCallStopAfterSpinStarted.length];
    console.log("Stop will be called after (ms):", stopDelay);

    stopTimeoutRef.current = setTimeout(() => {
      console.log("Automatic stop triggered");
      stopSpin();
    }, stopDelay);
  };

  const stopSpin = () => {
    console.log("StopSpin called. isSpinningRef:", isSpinningRef.current);

    if (!isSpinningRef.current) return;

    clearInterval(intervalRef.current);
    clearTimeout(stopTimeoutRef.current);

    setIsStopping(true);
    isSpinningRef.current = false; // block further stop calls

    const winningIndex = counter
    console.log("Winning index:", winningIndex);

    const itemWidth = window.innerWidth * 0.35;
    const totalStripWidth = items.length * itemWidth;
    const extraRotations = 5;

    const finalPos = -((extraRotations * totalStripWidth + winningIndex * itemWidth) % (totalStripWidth * 2));
    console.log("Final position:", finalPos);

    setTranslateX(finalPos);

    setTimeout(() => {
      console.log("Spin ended. Winning item:", items[winningIndex]);
      setIsSpinning(false);
      setIsStopping(false);
      setFinalItem(items[winningIndex]);
    }, 2000); // deceleration duration
  };

  return (
	<>
	{
		finalItem ? <>
		 <div className="case-item">
              <img src={finalItem?.img} alt={finalItem?.name} />
              <p>{finalItem?.name}</p>
            </div>
		<button className="spin-btn" onClick={spin}>
			Дахин эргүүлэх
			</button>
		</>
		:
		 <div className="case-container">
      <div className="case-window">
        <div
          className={`case-strip ${isStopping ? "decelerate" : ""}`}
          style={{ transform: `translateX(${translateX}px)` }}
        >
          {/* Duplicate items to make continuous spin seamless */}
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

	}
   
	</>
  );
};

export default CaseOpening;
