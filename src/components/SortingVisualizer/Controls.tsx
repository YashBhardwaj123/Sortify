import React, { useState } from 'react';
import { Play, RotateCcw, RefreshCw, Moon, Sun } from 'lucide-react';
import { ControlsProps, SortingAlgorithm } from './types';

const Controls: React.FC<ControlsProps> = ({
  selectedAlgorithm,
  isSorting,
  onAlgorithmChange,
  onSort,
  onReset,
  onRestart
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="flex justify-center gap-4">
      <select
        value={selectedAlgorithm}
        onChange={(e) => onAlgorithmChange(e.target.value as SortingAlgorithm)}
        className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isSorting}
      >
        <option value="">Select Sorting Algorithm</option>
        <option value="bubble">Bubble Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="quick">Quick Sort</option>
      </select>
      
      <button
        onClick={onSort}
        disabled={!selectedAlgorithm || isSorting}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
      >
        <Play size={20} /> Sort
      </button>

      <button
        onClick={onReset}
        disabled={isSorting}
        className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors disabled:opacity-50"
      >
        <RotateCcw size={20} /> Reset
      </button>

      <button
        onClick={onRestart}
        disabled={isSorting}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        <RefreshCw size={20} /> New Array
      </button>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}

export default Controls;
