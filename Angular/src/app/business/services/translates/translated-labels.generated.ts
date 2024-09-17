import { environment } from "src/environments/environment";
import { getTranslatedLabelSecurity } from './generated/security-labels.generated';

export function getTranslatedLabel(name: string): string {
    let result: string = null;

    result = getTranslatedLabelSecurity(name);
    if (result != null)
        return result;

    if (environment.production == false)
        console.error(`Property label translate with specified name: '${name}' doesn't exist.`);

    return name;
}
