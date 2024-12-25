export type SortingAlgorithm = 'bubble' | 'insertion' | 'selection' | 'quick';

export interface ArrayBarProps {
  value: number;
  maxValue: number;
  isActive: boolean;
  isComparing: boolean;
}

export interface ControlsProps {
  selectedAlgorithm: SortingAlgorithm | '';
  isSorting: boolean;
  onAlgorithmChange: (algorithm: SortingAlgorithm | '') => void;
  onSort: () => void;
  onReset: () => void;
  onRestart: () => void;
}