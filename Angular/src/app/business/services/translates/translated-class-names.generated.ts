import { environment } from "src/environments/environment";
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

    if (environment.production == false)
        console.error(`Class name translate: '${name}' doesn't exist`);

    return name;
}
