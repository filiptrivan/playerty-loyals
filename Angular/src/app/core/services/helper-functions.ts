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