import { environment } from "src/environments/environment.prod";
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

    return name;
}
