
import React, { useState, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { ColorGrid } from './components/ColorGrid';
import { useColorPalette } from './hooks/useColorPalette';
import { generateGplContent } from './utils/gpl';

const App: React.FC = () => {
    const [colorCount, setColorCount] = useState(12);
    const [shadeCount, setShadeCount] = useState(10);
    const [hueStart, setHueStart] = useState(0);
    const [hueEnd, setHueEnd] = useState(360);
    const [saturation, setSaturation] = useState(100);
    const [lightnessStart, setLightnessStart] = useState(10);
    const [lightnessEnd, setLightnessEnd] = useState(95);

    const palette = useColorPalette(
        colorCount,
        shadeCount,
        [hueStart, hueEnd],
        [lightnessStart, lightnessEnd],
        saturation
    );

    const handleDownload = useCallback(() => {
        const paletteName = `Palette-${colorCount}x${shadeCount}-${Date.now()}`;
        const content = generateGplContent(palette, paletteName);
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${paletteName}.gpl`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [palette, colorCount, shadeCount]);

    return (
        <div className="min-h-screen flex flex-col antialiased">
            <header className="p-4 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 shadow-lg sticky top-0 z-10">
                <h1 className="text-2xl font-bold text-center text-cyan-400 tracking-wider">
                    GPL Color Palette Generator
                </h1>
            </header>
            <main className="flex-grow flex flex-col lg:flex-row">
                <aside className="w-full lg:w-80 lg:flex-shrink-0 bg-gray-800 p-6 border-b lg:border-b-0 lg:border-r border-gray-700">
                    <ControlPanel
                        colorCount={colorCount}
                        setColorCount={setColorCount}
                        shadeCount={shadeCount}
                        setShadeCount={setShadeCount}
                        hueStart={hueStart}
                        setHueStart={setHueStart}
                        hueEnd={hueEnd}
                        setHueEnd={setHueEnd}
                        saturation={saturation}
                        setSaturation={setSaturation}
                        lightnessStart={lightnessStart}
                        setLightnessStart={setLightnessStart}
                        lightnessEnd={lightnessEnd}
                        setLightnessEnd={setLightnessEnd}
                        onDownload={handleDownload}
                    />
                </aside>
                <div className="flex-grow p-4 md:p-8 overflow-auto">
                    <ColorGrid palette={palette} />
                </div>
            </main>
        </div>
    );
};

export default App;
