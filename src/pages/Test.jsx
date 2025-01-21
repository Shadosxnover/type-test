import React, { useState, useEffect, useRef } from 'react';
import { getText } from '../utils/words';
import { saveTestResult } from '../utils/storage';
import { Timer, Target, Award, RotateCcw, Type } from 'lucide-react';

function Test() {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [timer, setTimer] = useState(60);
  const [timeLeft, setTimeLeft] = useState(timer);
  const [testActive, setTestActive] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errorCount, setErrorCount] = useState(0);
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);
  const textContainerRef = useRef(null);
  const activeWordRef = useRef(null);

  useEffect(() => {
    setText(getText());
  }, []);

  useEffect(() => {
    if (activeWordRef.current && textContainerRef.current) {
      const container = textContainerRef.current;
      const element = activeWordRef.current;
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      if (elementRect.bottom > containerRect.bottom || elementRect.top < containerRect.top) {
        const scrollTo = container.scrollTop + (elementRect.bottom - containerRect.bottom) + 30;
        container.scrollTo({ top: scrollTo, behavior: 'smooth' });
      }
    }
  }, [currentWordIndex, input]);

  useEffect(() => {
    if (testActive && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
        calculateWPM();
      }, 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0 && testActive) {
      endTest();
    }
  }, [testActive, timeLeft]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        if (testComplete || (testActive && timeLeft > 0)) {
          startTest();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [testComplete, testActive, timeLeft]);

  const startTest = () => {
    const newText = getText();
    setText(newText);
    setTestActive(true);
    setTestComplete(false);
    setTimeLeft(timer);
    setInput('');
    setWpm(0);
    setAccuracy(100);
    setErrorCount(0);
    setCurrentWordIndex(0);
    setResult(null);
    inputRef.current?.focus();
  };

  const endTest = () => {
    setTestActive(false);
    setTestComplete(true);
    const newResult = { wpm, accuracy, errorCount, wordsTyped: currentWordIndex, date: new Date() };
    setResult(newResult);
    saveTestResult(newResult);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (!testActive && inputValue.length === 1) {
      setTestActive(true);
    }

    if (!testComplete) {
      setInput(inputValue);

      if (inputValue.endsWith(' ')) {
        const words = text.split(' ');
        const currentWord = words[currentWordIndex];
        const typedWord = inputValue.trim();

        let wordErrors = 0;
        for (let i = 0; i < Math.max(currentWord.length, typedWord.length); i++) {
          if (currentWord[i] !== typedWord[i]) {
            wordErrors++;
          }
        }
        setErrorCount(prev => prev + wordErrors);

        if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex(prev => prev + 1);
          setInput('');
        } else {
          endTest();
        }
      }

      calculateWPM();
      updateAccuracy();
    }
  };

  const calculateWPM = () => {
    const words = text.split(' ').slice(0, currentWordIndex);
    const minutes = (timer - timeLeft) / 60;
    if (minutes > 0) {
      const calculatedWPM = Math.round(words.length / minutes);
      setWpm(calculatedWPM);
    }
  };

  const updateAccuracy = () => {
    const words = text.split(' ');
    const totalCharacters = words
      .slice(0, currentWordIndex)
      .join(' ').length + input.length;

    if (totalCharacters === 0) return;

    const calculatedAccuracy = Math.round(
      ((totalCharacters - errorCount) / totalCharacters) * 100
    );
    setAccuracy(Math.max(0, calculatedAccuracy));
  };

  const setTestDuration = (duration) => {
    setTimer(duration);
    if (testActive) {
      setTimeLeft(duration);
    } else {
      setTimeLeft(duration);
    }
  };

  const words = text.split(' ');
  const currentWord = words[currentWordIndex] || '';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Type className="w-8 h-8 text-green-500" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Speed Test</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 flex items-center gap-3">
              <Timer className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Time Left</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{timeLeft}s</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 flex items-center gap-3">
              <Target className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">WPM</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{wpm}</p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 flex items-center gap-3">
              <Award className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
                <p className={`text-2xl font-bold ${accuracy < 90 ? 'text-red-500' : 'text-green-500'}`}>
                  {accuracy}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            {[15, 30, 60].map((duration) => (
              <button
                key={duration}
                onClick={() => setTestDuration(duration)}
                className={`px-6 py-2 rounded-lg transition-all duration-200 font-medium ${timer === duration
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                {duration}s
              </button>
            ))}
          </div>

          <div
            ref={textContainerRef}
            className="mb-6 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl text-xl font-mono leading-relaxed h-[150px] overflow-y-auto custom-scrollbar"
          >
            {words.map((word, wordIndex) => (
              <span
                key={wordIndex}
                ref={wordIndex === currentWordIndex ? activeWordRef : null}
                className="mr-2 inline-block transition-all duration-200"
              >
                {wordIndex === currentWordIndex ? (
                  word.split('').map((char, charIndex) => (
                    <span
                      key={charIndex}
                      className={`${charIndex < input.length
                          ? char === input[charIndex]
                            ? 'text-green-500'
                            : 'text-red-500 bg-red-100 dark:bg-red-900/30 rounded'
                          : charIndex === input.length
                            ? 'bg-blue-100 dark:bg-blue-900/50 rounded'
                            : ''
                        }`}
                    >
                      {char}
                    </span>
                  ))
                ) : (
                  <span className={`${wordIndex < currentWordIndex
                      ? 'text-gray-400'
                      : 'text-gray-800 dark:text-gray-200'
                    }`}>
                    {word}
                  </span>
                )}
              </span>
            ))}
          </div>

          <div className="relative">
            <input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              className="w-full p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg font-mono shadow-sm"
              placeholder={`Type: "${currentWord}"`}
            />
            <button
              onClick={startTest}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              Restart
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
              <Award className="w-6 h-6 text-green-500" />
              Test Results
              <span className="text-sm font-normal text-gray-400 ml-2">
                {result.date.toLocaleTimeString()}
              </span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Words Per Minute</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.wpm}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.accuracy}%</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Errors</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.errorCount}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Words Typed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.wordsTyped}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Test;