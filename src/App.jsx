import { useState, useRef, useEffect } from "react";
import "./App.css";
import firstHeart from "./assets/icons8-broken-heart.gif";
import secondHeart from "./assets/secondheart.gif";
import backHeart from "./assets/backheart.png";
import gif1 from "./GIFS/gif1.gif";
import gif2 from "./GIFS/gif2.gif";
import gif3 from "./GIFS/gif3.gif";
import gif4 from "./GIFS/gif4.gif";
import gif5 from "./GIFS/gif5.gif";
import gif6 from "./GIFS/gif6.gif";
import gif7 from "./GIFS/gif7.gif";

function App() {
  const questions = [
    "Czy pójdziesz ze mną do kina?",
    "Czy pójdziesz ze mną na kolację?",
    "Czy będziesz moją walentynką?",
  ];
  const gifs = [gif1, gif2, gif4, gif5, gif6, gif7];
  const [questionIndex, setQuestionIndex] = useState(0);
  const [position, setPosition] = useState({ left: "", top: "" });
  const [showNoButton, setShowNoButton] = useState(true);
  const [isLastQuestionAnswered, setIsLastQuestionAnswered] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([
    false,
    false,
    false,
  ]);
  const [heartGif, setHeartGif] = useState(firstHeart);
  const [lastButtonClicked, setLastButtonClicked] = useState(null);
  const [yesButtonText, setYesButtonText] = useState("Tak");
  const wrapperRef = useRef(null);
  const noBtnRef = useRef(null);

  useEffect(() => {
    if (isLastQuestionAnswered) {
      document.body.classList.add("pink-red-gradient");
      setHeartGif(secondHeart);
      animateHearts();
      setYesButtonText("Ja Ciebie też");
    } else {
      document.body.classList.remove("pink-red-gradient");
    }
  }, [isLastQuestionAnswered]);

  const animateHearts = () => {
    const numberOfHearts = 10;
    for (let i = 0; i < numberOfHearts; i++) {
      createHeart(i * 200);
    }
    createGif3(); // Dodajemy gif3.gif razem z generowaniem serc
  };

  const createGif3 = () => {
    const gif = document.createElement("img");
    gif.src = gif3; // Używamy zaimportowanego gif3
    gif.style.position = "fixed";
    gif.style.maxWidth = "50%"; // Ograniczamy maksymalną szerokość do 50%
    gif.style.maxHeight = "50%"; // Ograniczamy maksymalną wysokość do 50%
    gif.style.left =
      Math.random() * (window.innerWidth - gif.offsetWidth) + "px"; // Zmieniamy to, aby gif nie wychodził poza prawą krawędź ekranu
    gif.style.top =
      Math.random() * (window.innerHeight - gif.offsetHeight) + "px"; // Zmieniamy to, aby gif nie wychodził poza dolną krawędź ekranu
    gif.style.animation = "fade-in-out 2s linear infinite";
    document.body.appendChild(gif);
    setTimeout(() => {
      document.body.removeChild(gif);
      if (isLastQuestionAnswered) {
        createGif3();
      }
    }, 2000);
  };

  const createHeart = (delay) => {
    setTimeout(() => {
      const heart = document.createElement("img");
      heart.src = backHeart;
      heart.style.position = "fixed";
      heart.style.left = Math.random() * window.innerWidth + "px";
      heart.style.top = Math.random() * window.innerHeight + "px";
      heart.style.animation = "fade-in-out 2s linear infinite";
      document.body.appendChild(heart);
      setTimeout(() => {
        document.body.removeChild(heart);
        if (isLastQuestionAnswered) {
          createHeart(0);
        }
      }, 2000);
    }, delay);
  };

  const handleYesClick = () => {
    setAnsweredQuestions((prev) => {
      const newAnsweredQuestions = [...prev];
      newAnsweredQuestions[questionIndex] = true;
      return newAnsweredQuestions;
    });

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setShowNoButton(false);
      setIsLastQuestionAnswered(true);
    }

    setLastButtonClicked("yes");

    if (isLastQuestionAnswered) {
      animateGifs(); // Dodajemy animację gifów
    }
  };

  const animateGifs = () => {
    const numberOfGifs = 2; // Maksymalna liczba gifów
    for (let i = 0; i < numberOfGifs; i++) {
      createGif(i * 2000); // Każdy gif pojawia się co 2 sekundy
    }
  };

  const createGif = (delay) => {
    setTimeout(() => {
      const gif = document.createElement("img");
      const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
      gif.src = randomGif;
      gif.style.position = "fixed";
      gif.style.maxWidth = "50%"; // Ograniczamy maksymalną szerokość do 50%
      gif.style.maxHeight = "50%"; // Ograniczamy maksymalną wysokość do 50%
      gif.style.left =
        Math.random() * (window.innerWidth - gif.offsetWidth) + "px"; // Zmieniamy to, aby gif nie wychodził poza prawą krawędź ekranu
      gif.style.top =
        Math.random() * (window.innerHeight - gif.offsetHeight) + "px"; // Zmieniamy to, aby gif nie wychodził poza dolną krawędź ekranu
      gif.style.animation = "fade-in-out 2s linear infinite";
      document.body.appendChild(gif);
      setTimeout(() => {
        document.body.removeChild(gif);
        if (isLastQuestionAnswered) {
          createGif(0);
        }
      }, 2000);
    }, delay);
  };

  const handleNoHover = () => {
    if (wrapperRef.current && noBtnRef.current) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const noBtnRect = noBtnRef.current.getBoundingClientRect();
      const i =
        Math.floor(Math.random() * (wrapperRect.width - noBtnRect.width)) + 1;
      const j =
        Math.floor(Math.random() * (wrapperRect.height - noBtnRect.height)) + 1;

      setPosition({ left: `${i}px`, top: `${j}px` });
    }

    setLastButtonClicked("no");
  };

  return (
    <div className="wrapper" ref={wrapperRef}>
      {lastButtonClicked === "yes" && <div>Poprawna odpowiedź ❤️</div>}
      {lastButtonClicked === "no" && <div>Błędna odpowiedź 😠</div>}
      <img className="serce" src={heartGif} alt="serce"></img>
      {isLastQuestionAnswered ? (
        <>
          <h2 className="question header-part1">Ty moją jesteś!</h2>
          <h2 className="question header-part2">Kocham cię</h2>
        </>
      ) : (
        <h2 className="question">{questions[questionIndex]}</h2>
      )}
      <div className="btn-group">
        <button
          className={`yes-btn ${!showNoButton ? "centered" : ""}`}
          onClick={handleYesClick}
        >
          {yesButtonText}
        </button>
        {showNoButton && (
          <button
            className="no-btn"
            ref={noBtnRef}
            style={{
              position: "absolute",
              left: position.left,
              top: position.top,
            }}
            onMouseOver={handleNoHover}
          >
            Nie
          </button>
        )}
      </div>
      <div className="checkbox-group">
        {answeredQuestions.map((isChecked, index) => (
          <div key={index}>
            <span>{index + 1}. </span>
            <div className={`checkbox ${isChecked ? "checked" : ""}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
