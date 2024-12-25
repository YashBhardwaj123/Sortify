import React, { useState } from 'react';
import { Play, Shuffle } from 'lucide-react';


type SortingAlgorithm = 'bubble' | 'insertion' | 'selection' | 'quick';

const SortingVisualizer = () => {
  // Define sleep function internally
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  const [arrayInput, setArrayInput] = useState<string>('');
  const [numbers, setNumbers] = useState<number[]>([]);
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [compareIndex, setCompareIndex] = useState<number>(-1);
  const [inputStep, setInputStep] = useState<number>(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm | ''>('');
  const [isSorting, setIsSorting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Rest of the component remains exactly the same...
  const handleArrayInput = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedNumbers = arrayInput
      .split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num));

    if (parsedNumbers.length > 0) {
      setNumbers(parsedNumbers);
      setOriginalArray([...parsedNumbers]);
      setInputStep(2);
    } else {
      alert('Please enter a valid list of numbers separated by commas.');
    }
  };

  const handleReset = () => {
    setNumbers([...originalArray]);
    setCurrentIndex(-1);
    setCompareIndex(-1);
  };

  const handleFullReset = () => {
    setNumbers([]);
    setOriginalArray([]);
    setArrayInput('');
    setInputStep(0);
    setSelectedAlgorithm('');
    setCurrentIndex(-1);
    setCompareIndex(-1);
  };

  const bubbleSort = async () => {
    const arr = [...numbers];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setCurrentIndex(j);
        setCompareIndex(j + 1);
        await sleep(500);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; 
          setNumbers([...arr]);
        }
      }
    }
    setCurrentIndex(-1);
    setCompareIndex(-1);
  };

  const insertionSort = async () => {
    const arr = [...numbers];
    for (let i = 1; i < arr.length; i++) {
      let j = i;
      setCurrentIndex(i);
      while (j > 0 && arr[j - 1] > arr[j]) {
        setCompareIndex(j - 1);
        await sleep(500);
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]; 
        setNumbers([...arr]);
        j--;
      }
    }
    setCurrentIndex(-1);
    setCompareIndex(-1);
  };

  const selectionSort = async () => {
    const arr = [...numbers];
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      setCurrentIndex(i);
      for (let j = i + 1; j < arr.length; j++) {
        setCompareIndex(j);
        await sleep(500);
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]; 
        setNumbers([...arr]);
      }
    }
    setCurrentIndex(-1);
    setCompareIndex(-1);
  };

  const quickSort = async () => {
    const arr = [...numbers];
    const partition = async (low: number, high: number) => {
      const pivot = arr[high];
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        setCurrentIndex(j);
        setCompareIndex(high);
        await sleep(500);
        
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setNumbers([...arr]);
        }
      }
      
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; 
      setNumbers([...arr]);
      return i + 1;
    };

    const sort = async (low: number, high: number) => {
      if (low < high) {
        const pi = await partition(low, high);
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      }
    };

    await sort(0, arr.length - 1);
    setCurrentIndex(-1);
    setCompareIndex(-1);
  };

  const handleSort = async () => {
    if (!selectedAlgorithm || isSorting) return;
    setIsSorting(true);
    
    switch (selectedAlgorithm) {
      case 'bubble':
        await bubbleSort();
        break;
      case 'insertion':
        await insertionSort();
        break;
      case 'selection':
        await selectionSort();
        break;
      case 'quick':
        await quickSort();
        break;
    }
    
    setIsSorting(false);
  };

  const getAlgorithmDefinition = () => {
    switch (selectedAlgorithm) {
      case 'bubble':
        return (
          <div className={`p-6 rounded-lg shadow-lg ${
            isDarkMode ? 'bg-blue-900 text-white' : 'bg-blue-50 text-black'
          }`}>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>Bubble Sort</h2>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className={isDarkMode ? 'text-blue-300' : 'text-blue-600'}>Bubble Sort</span> compares adjacent elements and swaps them if they are in the wrong order. 
              This process repeats until the largest elements "bubble" to the end of the list, leaving the smaller elements behind. <br />
              <span className={`italic ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Imagine bubbles rising to the surface of water!</span>
            </p>
        
            {/* Embed YouTube Shorts video with autoplay, mute, and loop */}
            <div className="mt-6 max-w-md mx-auto">  {/* Ensure it's centered and doesn't go too large */}
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>Learn More:</h3>
              <div className="relative" style={{ paddingBottom: '177%' }}> {/* Aspect ratio for portrait */}
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/swqh0Nt84kc?autoplay=1&mute=1&loop=1&playlist=swqh0Nt84kc"
                  title="Bubble Sort Explanation"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 rounded-lg"
                />
              </div>
            </div>
          </div>
        );
      case 'insertion':
        return (
          <div className={`p-6 rounded-lg shadow-lg ${
            isDarkMode ? 'bg-green-900 text-white' : 'bg-green-50 text-black'
          }`}>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>Insertion Sort</h2>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              In <span className={isDarkMode ? 'text-green-300' : 'text-green-600'}>Insertion Sort</span>, the algorithm builds the sorted array one item at a time. 
              It repeatedly takes an unsorted item and places it in the correct position among the already sorted elements. <br />
              <span className={`italic ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Think of inserting a playing card into a hand of already sorted cards!</span>
            </p>

            {/* Embed YouTube Shorts video with autoplay, mute, and loop */}
            <div className="mt-6 max-w-md mx-auto">  {/* Ensure it's centered and doesn't go too large */}
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>Learn More:</h3>
              <div className="relative" style={{ paddingBottom: '177%' }}> {/* Aspect ratio for portrait */}
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/W8x-df6vryw?autoplay=1&mute=1&loop=1&playlist=W8x-df6vryw"
                  title="Insertion Sort Explanation"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 rounded-lg"
                />
              </div>
            </div>
          </div>
        );
      case 'selection':
        return (
          <div className={`p-6 rounded-lg shadow-lg ${
            isDarkMode ? 'bg-yellow-900 text-white' : 'bg-yellow-50 text-black'
          }`}>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>Selection Sort</h2>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className={isDarkMode ? 'text-yellow-300' : 'text-yellow-600'}>Selection Sort</span> selects the smallest element from the unsorted part of the list and swaps it with the first unsorted element. 
              This process repeats until the entire list is sorted. <br />
              <span className={`italic ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>It's like selecting the smallest piece from a stack!</span>
            </p>

            {/* Embed YouTube Shorts video with autoplay, mute, and loop */}
            <div className="mt-6 max-w-md mx-auto">  {/* Centered with max width */}
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>Learn More:</h3>
              <div className="relative" style={{ paddingBottom: '177%' }}> {/* Aspect ratio for portrait */}
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Eyfbg0uEHXU?autoplay=1&mute=1&loop=1&playlist=Eyfbg0uEHXU"
                  title="Selection Sort Explanation"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 rounded-lg"
                />
              </div>
            </div>
          </div>
        );
      case 'quick':
        return (
          <div className={`p-6 rounded-lg shadow-lg ${
            isDarkMode ? 'bg-purple-900 text-white' : 'bg-purple-50 text-black'
          }`}>
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Quick Sort</h2>
            <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className={isDarkMode ? 'text-purple-300' : 'text-purple-600'}>Quick Sort</span> divides the list into smaller sublists using a pivot element and recursively sorts each sublist. 
              It's fast because it divides the list and only works on the necessary parts. <br />
              <span className={`italic ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Imagine splitting a large task into smaller, manageable chunks!</span>
            </p>

            {/* Embed YouTube Shorts video with autoplay, mute, and loop */}
            <div className="mt-6 max-w-md mx-auto">  {/* Centered with max width */}
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Learn More:</h3>
              <div className="relative" style={{ paddingBottom: '177%' }}> {/* Aspect ratio for portrait */}
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/t40PfJDPWkk?autoplay=1&mute=1&loop=1&playlist=t40PfJDPWkk"
                  title="Quick Sort Explanation"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 rounded-lg"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen py-12 px-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Sorting Algorithm Visualizer</h1>
        <button
          onClick={toggleDarkMode}
          className={`absolute top-4 right-4 px-4 py-2 rounded ${
            isDarkMode ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-white'
          }`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* Input & Sorting Controls */}
        {inputStep === 0 && (
          <form onSubmit={handleArrayInput} className="max-w-md mx-auto">
            <div className="mb-4">
              <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Enter numbers separated by commas:</label>
              <input
                type="text"
                value={arrayInput}
                onChange={(e) => setArrayInput(e.target.value)}
                className={`w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </form>
        )}

        {/* Sorting Algorithm Selection */}
        {inputStep === 2 && (
          <div className="space-y-6">
            <div className="flex justify-center gap-4">
              <select
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value as SortingAlgorithm)}
                className={`px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                disabled={isSorting}
              >
                <option value="" className={isDarkMode ? 'text-white' : 'text-black'}>Select Sorting Algorithm</option>
                <option value="bubble" className={isDarkMode ? 'text-white' : 'text-black'}>Bubble Sort</option>
                <option value="insertion" className={isDarkMode ? 'text-white' : 'text-black'}>Insertion Sort</option>
                <option value="selection" className={isDarkMode ? 'text-white' : 'text-black'}>Selection Sort</option>
                <option value="quick" className={isDarkMode ? 'text-white' : 'text-black'}>Quick Sort</option>
              </select>
              <button
                onClick={handleSort}
                disabled={!selectedAlgorithm || isSorting}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                <Play size={20} /> Sort
              </button>
              {/* Reset Button */}
              <button
                onClick={handleReset}
                disabled={isSorting}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                <Shuffle size={20} /> Reset Array
              </button>
            </div>

            {/* Visualization Panel */}
            <div className={`flex justify-center items-end gap-2 h-64 p-4 rounded-lg shadow ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              {numbers.map((num, idx) => (
                <div
                  key={idx}
                  style={{ height: `${(num / Math.max(...numbers)) * 100}%` }}
                  className={`w-12 transition-all duration-500 flex items-center justify-center text-white
                    ${idx === currentIndex ? 'bg-red-500' : 
                      idx === compareIndex ? 'bg-yellow-500' : 'bg-blue-500'}`}
                >
                  {num}
                </div>
              ))}
            </div>

            {/* Algorithm Definition */}
            <div className="mt-8">{getAlgorithmDefinition()}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortingVisualizer;

