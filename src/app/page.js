"use client"
import React, { useState, useRef } from "react";
import "./CaseOpening.css";

const items = [
  { id: 1, name: "sad", img: "https://i.pinimg.com/736x/df/3f/5f/df3f5fa2ac5eded91bdd472b26a0d6a5.jpg" },
  // sad
  { id: 2, name: "angry", img: "https://i.pinimg.com/736x/a6/6c/3e/a66c3e5ec81792f07aeba723c7155bfd.jpg" },
  // angry
  { id: 3, name: "", img: "https://i.pinimg.com/736x/ec/13/a7/ec13a753972c254761be4d9d5666d341.jpg" },
  // 
  { id: 4, name: "", img: "https://i.pinimg.com/736x/0f/43/c8/0f43c89bc0ba2f038eb589f8f7727816.jpg" },
  // 
  { id: 5, name: "", img: "https://i.pinimg.com/736x/a7/d4/65/a7d4653644eaa6dd28c7f594675de7c8.jpg" },
  // crying
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
