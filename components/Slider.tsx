
import React from 'react';

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    unit?: string;
}

export const Slider: React.FC<SliderProps> = ({ label, value, min, max, step = 1, onChange, unit = '' }) => {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">{label}</label>
                <span className="text-sm font-mono text-cyan-400 bg-gray-700 px-2 py-1 rounded">
                    {value}{unit}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
        </div>
    );
};
