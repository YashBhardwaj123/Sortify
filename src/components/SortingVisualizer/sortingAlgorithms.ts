import { sleep } from '../../utils/helpers';

export const bubbleSort = async (
  numbers: number[],
  setNumbers: (nums: number[]) => void,
  setCurrentIndex: (idx: number) => void,
  setCompareIndex: (idx: number) => void
) => {
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

export const insertionSort = async (
  numbers: number[],
  setNumbers: (nums: number[]) => void,
  setCurrentIndex: (idx: number) => void,
  setCompareIndex: (idx: number) => void
) => {
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

export const selectionSort = async (
  numbers: number[],
  setNumbers: (nums: number[]) => void,
  setCurrentIndex: (idx: number) => void,
  setCompareIndex: (idx: number) => void
) => {
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

export const quickSort = async (
  numbers: number[],
  setNumbers: (nums: number[]) => void,
  setCurrentIndex: (idx: number) => void,
  setCompareIndex: (idx: number) => void
) => {
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