import { environment } from "src/environments/environment";
import { getTranslatedLabelBusiness } from './generated/business-labels.generated';
import { getTranslatedLabelSecurity } from './generated/security-labels.generated';

export function getTranslatedLabel(name: string): string {
    let result: string = null;

    result = getTranslatedLabelBusiness(name);
    if (result != null)
        return result;

    result = getTranslatedLabelSecurity(name);
    if (result != null)
        return result;

    if (environment.production == false)
        console.error(`Property label translate with specified name: '${name}' doesn't exist.`);

    return name;
}
