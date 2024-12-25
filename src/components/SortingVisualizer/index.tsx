import React, { useState } from 'react';
import ArrayBar from './ArrayBar';
import Controls from './Controls';
import InputForm from './InputForm';
import { SortingAlgorithm } from './types';
import { bubbleSort, insertionSort, selectionSort, quickSort } from './sortingAlgorithms';

const SortingVisualizer = () => {
  const [arraySize, setArraySize] = useState<string>('');
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [compareIndex, setCompareIndex] = useState<number>(-1);
  const [inputStep, setInputStep] = useState<number>(0);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm | ''>('');
  const [isSorting, setIsSorting] = useState(false);
  const [originalArray, setOriginalArray] = useState<number[]>([]);

  const handleSizeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const size = parseInt(arraySize);
    if (size > 0) {
      setNumbers([]);
      setInputStep(1);
    }
  };

  const handleNumberInput = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(currentInput);
    if (!isNaN(num)) {
      const newNumbers = [...numbers, num];
      setNumbers(newNumbers);
      setCurrentInput('');
      if (newNumbers.length >= parseInt(arraySize)) {
        // Save the original array when all numbers are entered
        setOriginalArray([...newNumbers]);
        setInputStep(2);
      }
    }
  };

  const handleSort = async () => {
    if (!selectedAlgorithm || isSorting) return;
    setIsSorting(true);
    
    switch (selectedAlgorithm) {
      case 'bubble':
        await bubbleSort(numbers, setNumbers, setCurrentIndex, setCompareIndex);
        break;
      case 'insertion':
        await insertionSort(numbers, setNumbers, setCurrentIndex, setCompareIndex);
        break;
      case 'selection':
        await selectionSort(numbers, setNumbers, setCurrentIndex, setCompareIndex);
        break;
      case 'quick':
        await quickSort(numbers, setNumbers, setCurrentIndex, setCompareIndex);
        break;
    }
    
    setIsSorting(false);
  };

  const handleReset = () => {
    // Reset to the original array
    setNumbers([...originalArray]);
    setCurrentIndex(-1);
    setCompareIndex(-1);
    setSelectedAlgorithm('');
  };

  const handleRestart = () => {
    setArraySize('');
    setNumbers([]);
    setCurrentIndex(-1);
    setCompareIndex(-1);
    setInputStep(0);
    setCurrentInput('');
    setSelectedAlgorithm('');
    setOriginalArray([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Sorting Algorithm Visualizer</h1>
        
        {inputStep === 0 && (
          <InputForm
            type="size"
            value={arraySize}
            onChange={setArraySize}
            onSubmit={handleSizeSubmit}
          />
        )}

        {inputStep === 1 && (
          <InputForm
            type="number"
            value={currentInput}
            onChange={setCurrentInput}
            onSubmit={handleNumberInput}
            arraySize={arraySize}
            numbersLength={numbers.length}
          />
        )}

        {inputStep === 2 && (
          <div className="space-y-6">
            <Controls
              selectedAlgorithm={selectedAlgorithm}
              isSorting={isSorting}
              onAlgorithmChange={setSelectedAlgorithm}
              onSort={handleSort}
              onReset={handleReset}
              onRestart={handleRestart}
            />

            <div className="flex justify-center items-end gap-2 h-64 bg-white p-4 rounded-lg shadow">
              {numbers.map((num, idx) => (
                <ArrayBar
                  key={idx}
                  value={num}
                  maxValue={Math.max(...numbers)}
                  isActive={idx === currentIndex}
                  isComparing={idx === compareIndex}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortingVisualizer;