
import React from 'react';
import { Slider } from './Slider';

interface ControlPanelProps {
    colorCount: number;
    setColorCount: (value: number) => void;
    shadeCount: number;
    setShadeCount: (value: number) => void;
    hueStart: number;
    setHueStart: (value: number) => void;
    hueEnd: number;
    setHueEnd: (value: number) => void;
    saturation: number;
    setSaturation: (value: number) => void;
    lightnessStart: number;
    setLightnessStart: (value: number) => void;
    lightnessEnd: number;
    setLightnessEnd: (value: number) => void;
    onDownload: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
    colorCount, setColorCount,
    shadeCount, setShadeCount,
    hueStart, setHueStart,
    hueEnd, setHueEnd,
    saturation, setSaturation,
    lightnessStart, setLightnessStart,
    lightnessEnd, setLightnessEnd,
    onDownload
}) => {

    const handleHueStartChange = (value: number) => {
        setHueStart(value);
        if (value > hueEnd) {
            setHueEnd(value);
        }
    };
    
    const handleHueEndChange = (value: number) => {
        setHueEnd(value);
        if (value < hueStart) {
            setHueStart(value);
        }
    };

    const handleLightnessStartChange = (value: number) => {
        setLightnessStart(value);
        if (value > lightnessEnd) {
            setLightnessEnd(value);
        }
    };

    const handleLightnessEndChange = (value: number) => {
        setLightnessEnd(value);
        if (value < lightnessStart) {
            setLightnessStart(value);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">Controls</h2>
            <div className="space-y-4">
                <Slider label="Colors" value={colorCount} min={1} max={36} onChange={(e) => setColorCount(Number(e.target.value))} />
                <Slider label="Shades" value={shadeCount} min={1} max={20} onChange={(e) => setShadeCount(Number(e.target.value))} />
                <Slider label="Saturation" value={saturation} min={0} max={100} unit="%" onChange={(e) => setSaturation(Number(e.target.value))} />

                <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-medium text-gray-300 mb-3">Hue Range</h3>
                    <Slider label="Start" value={hueStart} min={0} max={360} unit="°" onChange={(e) => handleHueStartChange(Number(e.target.value))} />
                    <Slider label="End" value={hueEnd} min={0} max={360} unit="°" onChange={(e) => handleHueEndChange(Number(e.target.value))} />
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-lg font-medium text-gray-300 mb-3">Lightness Range</h3>
                    <Slider label="Start (Dark)" value={lightnessStart} min={0} max={100} unit="%" onChange={(e) => handleLightnessStartChange(Number(e.target.value))} />
                    <Slider label="End (Light)" value={lightnessEnd} min={0} max={100} unit="%" onChange={(e) => handleLightnessEndChange(Number(e.target.value))} />
                </div>
            </div>

            <button
                onClick={onDownload}
                className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-400 transition-colors duration-200 mt-4"
            >
                Download .gpl Palette
            </button>
        </div>
    );
};
