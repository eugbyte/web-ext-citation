import { RegexImpl, RegexService } from "src/services/regex-service";

export function getChapter(): string {
    const regexService: RegexImpl = new RegexService();
    const nav = document.getElementById("tocNav") as HTMLElement;
    const span = nav.querySelector("span") as HTMLSpanElement;
    const chapter = span.innerText;
    return regexService.removeLineBreaks(chapter);
}