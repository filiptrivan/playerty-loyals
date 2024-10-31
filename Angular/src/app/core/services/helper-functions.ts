import { AbstractControl } from "@angular/forms";

// Helper function for PrecisionScale validation (to be added in the TypeScript output):
export function validatePrecisionScale(value: any, precision: number, scale: number, ignoreTrailingZeros: boolean): boolean {
    if (typeof value !== 'number') return false;
    const [integerPart, decimalPart] = value.toString().split('.');
    if (integerPart.length > precision - scale) return false;
    if (decimalPart && decimalPart.length > scale) return false;
    if (!ignoreTrailingZeros && decimalPart && decimalPart.replace(/0+$/, '').length > scale) return false;
    return true;
}

export function getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
}

export function getMimeTypeForFileName(fileName: string): string {
    const mimeTypes: { [key: string]: string } = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.pdf': 'application/pdf',
        '.txt': 'text/plain',
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.csv': 'text/csv',
        '.xml': 'application/xml',
        '.zip': 'application/zip',
        '.mp4': 'video/mp4',
        '.mp3': 'audio/mpeg',
        '.wav': 'audio/wav',
        '.avi': 'video/x-msvideo',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.xls': 'application/vnd.ms-excel',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        // Add more as needed
    };

    const extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
    return mimeTypes[extension] || 'application/octet-stream'; // 'application/octet-stream' is a generic binary type
}

export function adjustColor(color: string, percent: number): string {
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
        console.error('Invalid hex color format');
    }

    let r: number, g: number, b: number;
    if (color.length === 7) {
        r = parseInt(color.slice(1, 3), 16);
        g = parseInt(color.slice(3, 5), 16);
        b = parseInt(color.slice(5, 7), 16);
    } else {
        r = parseInt(color[1] + color[1], 16);
        g = parseInt(color[2] + color[2], 16);
        b = parseInt(color[3] + color[3], 16);
    }

    const adjust = (value: number, percent: number): number => {
        const amount = (percent / 100) * 255;
        const newValue = Math.min(Math.max(value + amount, 0), 255);
        return Math.round(newValue);
    };

    r = adjust(r, percent);
    g = adjust(g, percent);
    b = adjust(b, percent);

    const toHex = (value: number): string => {
        const hex = value.toString(16).padStart(2, '0');
        return hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function getHtmlImgDisplayString64(base64String: string){
    const [header, base64Content] = base64String.split(';base64,');
    const fileName = header.split('=')[1];
    const mimeType = getMimeTypeForFileName(fileName);
    return `data:${mimeType};base64, ${base64Content}`;
}

export function nameof<TObject>(obj: TObject, key: keyof TObject): string;
export function nameof<TObject>(key: keyof TObject): string;
export function nameof(key1: any, key2?: any): any {
  return key2 ?? key1;
}
export function nameOf<TObject extends {name:S}, S extends string>(funcOrClass: TObject): S {
    return funcOrClass.name;
}

export function getParentUrl(currentUrl: string){
    const urlSegments = currentUrl.split('/');
    urlSegments.pop();
    const parentUrl = urlSegments.join('/');
    return parentUrl;
}