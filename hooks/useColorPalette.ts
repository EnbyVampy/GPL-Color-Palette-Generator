
import { useMemo } from 'react';
import { hslToRgb, rgbToHex } from '../utils/color';

export const useColorPalette = (
    colorCount: number,
    shadeCount: number,
    hueRange: [number, number],
    lightnessRange: [number, number],
    saturation: number
): string[][] => {
    const palette = useMemo(() => {
        const newPalette: string[][] = Array.from({ length: shadeCount }, () => Array(colorCount).fill(''));

        if (colorCount <= 0 || shadeCount <= 0) return [];

        const [minHue, maxHue] = hueRange;
        const [minLightness, maxLightness] = lightnessRange;

        const hueStep = colorCount > 1 ? (maxHue - minHue) / (colorCount - 1) : 0;
        const lightnessStep = shadeCount > 1 ? (maxLightness - minLightness) / (shadeCount - 1) : 0;

        for (let y = 0; y < shadeCount; y++) {
            for (let x = 0; x < colorCount; x++) {
                const hue = minHue + (x * hueStep);
                const lightness = maxLightness - (y * lightnessStep);

                const { r, g, b } = hslToRgb(hue, saturation, lightness);
                newPalette[y][x] = rgbToHex(r, g, b);
            }
        }
        return newPalette;
    }, [colorCount, shadeCount, hueRange, lightnessRange, saturation]);

    return palette;
};
