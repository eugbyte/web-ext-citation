import { RegexImpl, RegexService } from "src/services/regex-service";

export function getChapter(): void {
    const regextService: RegexImpl = new RegexService();
    const chapterElement: HTMLElement = document.querySelector(".front") as HTMLElement;

    let parentText: string = chapterElement.innerText;
    parentText = regextService.replaceMultiLineBreakWithSingleLineBreak(parentText);
    parentText;



}