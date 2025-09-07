
import React from 'react';

interface ColorGridProps {
    palette: string[][];
}

const ColorCell: React.FC<{ color: string }> = ({ color }) => (
    <div
        className="w-full h-full min-h-[40px] transition-transform duration-150 ease-in-out hover:scale-110 hover:z-10 relative rounded-sm shadow-inner"
        style={{ backgroundColor: color }}
        title={color}
    />
);

export const ColorGrid: React.FC<ColorGridProps> = ({ palette }) => {
    if (!palette || palette.length === 0 || palette[0].length === 0) {
        return <div className="text-gray-400">Generating palette...</div>;
    }

    const gridStyle = {
        gridTemplateColumns: `repeat(${palette[0].length}, minmax(0, 1fr))`,
    };

    return (
        <div className="w-full bg-gray-800/50 p-4 rounded-lg shadow-xl">
             <div className="grid gap-1" style={gridStyle}>
                {palette.map((row, rowIndex) =>
                    row.map((color, colIndex) => (
                        <ColorCell key={`${rowIndex}-${colIndex}`} color={color} />
                    ))
                )}
            </div>
        </div>
    );
};
