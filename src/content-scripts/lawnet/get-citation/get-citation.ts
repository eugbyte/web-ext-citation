import { StringImpl } from "src/services/string-service";
import { getCaseDescription } from "./get-case-description";
import { getParagraphNumber } from "./get-paragraph-number";

interface Services {
    stringService: StringImpl
}

export function getCitation(targetElement: HTMLElement, {stringService}: Services) {
    const caseDescription = getCaseDescription({stringService});
    const paraNumber = getParagraphNumber(targetElement, {stringService});

    const caseName = stringService.getCaseName(caseDescription);
    const caseReferenceSuffix = stringService.getCaseReferenceSuffix(caseDescription);

    return {
        caseName, 
        caseReferenceSuffix,
        paraNumber
    }
}
