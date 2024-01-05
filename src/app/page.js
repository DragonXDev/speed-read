"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [displayingWords, setDisplayingWords] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);
  const [wordSpeed, setWordSpeed] = useState(1000); // speed in milliseconds

  const handleSubmit = (e) => {
    e.preventDefault();
    setWords(text.split(" "));
    setCurrentWordIndex(0);
    setCurrentWord(""); // Resetting the current word
    setAnimateCard(true);
    setTimeout(() => {
      setDisplayingWords(true);
    }, 1000); // Wait for the dimming to finish
  };

  useEffect(() => {
    let timer = null;

    if (
      displayingWords &&
      words.length > 0 &&
      currentWordIndex < words.length
    ) {
      timer = setInterval(() => {
        setCurrentWord(words[currentWordIndex]);
        if (currentWordIndex === words.length - 1) {
          setTimeout(() => {
            setDisplayingWords(false);
            setAnimateCard(false);
          }, wordSpeed);
          clearInterval(timer);
        } else {
          setCurrentWordIndex(currentWordIndex + 1);
        }
      }, wordSpeed);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [currentWordIndex, words, displayingWords, wordSpeed]);

  return (
    <div
      className={`bg-gray-900 min-h-screen flex items-center justify-center dim-transition ${
        displayingWords ? "dimmed" : ""
      }`}
    >
      {!displayingWords && (
        <div
          className={`${
            animateCard ? "animate-slide-up" : ""
          } p-8 bg-gray-800 rounded-lg shadow-lg`}
        >
          <h1 className="text-3xl font-bold mb-4 text-white text-center">
            Read Effectively
          </h1>
          <form onSubmit={handleSubmit} className="text-center">
            <input
              type="text"
              className="bg-black text-white w-full p-2 rounded mb-4"
              placeholder="Type something..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex items-center justify-center">
              <label htmlFor="wordSpeed" className="block text-white mr-2">
                Word Gap (ms):
              </label>
              <input
                type="range"
                id="wordSpeed"
                min="100"
                max="1000"
                value={wordSpeed}
                onChange={(e) => setWordSpeed(e.target.value)}
                className="mr-2"
              />
              <span className="text-white">{wordSpeed}</span>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
            >
              Read
            </button>
          </form>
        </div>
      )}
      {displayingWords && (
        <div className="p-4 text-white text-center text-6xl font-bold">
          <span>{currentWord}</span>
        </div>
      )}
    </div>
  );
}
