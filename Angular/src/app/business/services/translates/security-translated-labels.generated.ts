import { environment } from "src/environments/environment.prod";
import { getTranslatedLabelSecurity } from './generated/security-labels.generated';

export function getTranslatedLabel(name: string): string {
    let result: string = null;

    result = getTranslatedLabelSecurity(name);
    if (result != null)
        return result;

    return name;
}
