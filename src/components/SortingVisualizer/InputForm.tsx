import React from 'react';

interface InputFormProps {
  type: 'size' | 'number';
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  arraySize?: string;
  numbersLength?: number;
}

const InputForm: React.FC<InputFormProps> = ({
  type,
  value,
  onChange,
  onSubmit,
  arraySize,
  numbersLength
}) => {
  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">
          {type === 'size' 
            ? 'Enter the number of integers (n):'
            : `Enter number ${numbersLength! + 1} of ${arraySize}:`
          }
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
      >
        {type === 'size' ? 'Continue' : 'Add Number'}
      </button>
    </form>
  );
}

export default InputForm;