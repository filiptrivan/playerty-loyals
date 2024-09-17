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