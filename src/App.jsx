import { useState, useRef } from "react";
import "./App.css";
import moleImg from "./assets/mole-removebg.png";
import whackedMoleImg from "./assets/whacked_mole-removebg-preview.png";

function App() {
  const [mole, setMole] = useState(["hidden", "hidden", "hidden"]);
  const [counter, setCounter] = useState(10);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const [isClickedInside, setIsClickedInside] = useState(false);

  function moveMole(moleNumber) {
    const newMole = [...mole];
    newMole[moleNumber] = "visible";
    setMole(newMole);
    setIsClickedInside(false)
    
    // Use a timeout to remove the moving class after animation
    setTimeout(() => {
      const moleClass = `.mole${moleNumber + 1}`;
      const currentMole = document.querySelector(moleClass);
      if (currentMole) {
        const direction =
        moleNumber % 2 === 0 ? "movingMoleUp" : "movingMoleDown";
        currentMole.classList.add(direction);
        setTimeout(() => {
          currentMole.classList.remove("movingMole");
          const newMole = [...mole];
          newMole[moleNumber] = "hidden";
          setMole(newMole);
          setIsClickedInside(false)
        }, 5000);
      }
    }, 0);
  }

  function handleClick2() {
    const interval = 6000; // Interval between each move (1 second)
    let movesLeft = counter;

    const moveMoleWithDelay = () => {
      if (movesLeft > 0) {
        const random = Math.floor(Math.random() * 3);
        moveMole(random);
        movesLeft--;
        setCounter(movesLeft);
        setTimeout(moveMoleWithDelay, interval);
      } else {
        setCounter(10); // Reset the counter after all moves are completed
      }
    };

    moveMoleWithDelay();
  }

  const handleClick = (event) => {
    const images = [img1Ref.current, img2Ref.current, img3Ref.current];
    for (let img of images) {
      if (img.classList[1] == "visible") {
        const rect = img.getBoundingClientRect();

        const clickX = event.clientX;
        const clickY = event.clientY;

        const isInside =
          clickX >= rect.left &&
          clickX <= rect.right &&
          clickY >= rect.top &&
          clickY <= rect.bottom;

        setIsClickedInside(isInside);
        break;
      }
    }
  };

  return (
    <>
      <button onClick={handleClick2}>Start</button>
      <div>moves Left: {counter}</div>
      <div>
        {isClickedInside ? (
          <p>Clicked inside the image!</p>
        ) : (
          <p>Clicked outside the image!</p>
        )}
      </div>
      <div onClick={handleClick} className="container">
        <img
          className={`mole1 ${mole[0]} ${isClickedInside ? 'whacked' : '' }`}
          src={isClickedInside ? whackedMoleImg : moleImg}
          alt="Mole"
          ref={img1Ref}
          ></img>
        <img
          className={`mole2 ${mole[1]} ${isClickedInside ? 'whacked' : '' }`}
          src={isClickedInside ? whackedMoleImg : moleImg}
          alt="Mole"
          ref={img2Ref}
          ></img>
        <img
          className={`mole3 ${mole[2]} ${isClickedInside ? 'whacked' : '' }`}
          src={isClickedInside ? whackedMoleImg : moleImg}
          alt="Mole"
          ref={img3Ref}
        ></img>
      </div>
    </>
  );
}

export default App;
