import { environment } from "src/environments/environment.prod";
import { getTranslatedClassNameBusiness } from './generated/business-class-names.generated';
import { getTranslatedClassNameSecurity } from './generated/security-class-names.generated';

export function getTranslatedClassName(name: string): string {
    let result: string = null;

    result = getTranslatedClassNameBusiness(name);
    if (result != null)
        return result;

    result = getTranslatedClassNameSecurity(name);
    if (result != null)
        return result;

    return name;
}
