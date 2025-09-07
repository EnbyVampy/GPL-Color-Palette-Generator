
import { hexToRgb } from './color';

export function generateGplContent(palette: string[][], name: string): string {
    const header = `GIMP Palette\nName: ${name}\nColumns: ${palette.length > 0 ? palette[0].length : 0}\n#\n`;
    
    const colors = palette.flat();
    
    const colorLines = colors.map(hex => {
        const rgb = hexToRgb(hex);
        if (!rgb) return '';
        
        const rStr = String(rgb.r).padStart(3, ' ');
        const gStr = String(rgb.g).padStart(3, ' ');
        const bStr = String(rgb.b).padStart(3, ' ');
        
        return `${rStr} ${gStr} ${bStr}\t${hex}`;
    }).filter(line => line !== '').join('\n');
    
    return header + colorLines;
}
