import type { Editor, Page } from "@/interfaces";
import { clone } from "./object";
import {
    DEFAULT_EDITOR,
    DEFAULT_PAGE,
    HELP_HEADER,
    HELP_PART,
} from "@/constants";

export function parseEditor(value: string): Editor {
    const editor = clone(DEFAULT_EDITOR);
    const debugDataSplit = value.split("\n");
    let size = HELP_HEADER.length + HELP_PART.length;
    while (debugDataSplit.length > size) {
        size += HELP_PART.length;
    }
    const lines = Array(size).fill(0);
    editor.numbersText = debugDataSplit
        .map((_value, index) => `${index + 1}.`)
        .join("\n");
    editor.overlayText = lines
        .map((_value, index) => {
            if (
                debugDataSplit.length > index &&
                (debugDataSplit[index] ?? "").trim().length
            ) {
                return " ".repeat((debugDataSplit[index] ?? "").length);
            }
            if (HELP_HEADER.length > index) {
                return HELP_HEADER[index];
            }
            return HELP_PART[(index - HELP_HEADER.length) % HELP_PART.length];
        })
        .join("\n");
    editor.numbersCols = editor.numbersText.length.toString().length + 1;
    return editor;
}

export function parsePage(value: string): Page {
    const parsed = clone(DEFAULT_PAGE);
    const parts = value.split("\n");
    if (parts.length < 1) {
        parsed.error = true;
        return parsed;
    }
    parsed.header = parts.shift() as string;
    // Convert header to simple title of not html
    if (!/<[^>]*>/u.test(parsed.header)) {
        parsed.header = `<h1>${parsed.header}</h1>`;
    }
    // TODO: 5. implement custom logic
    parsed.parts = [];
    while (parts.length) {
        parsed.parts.push(parts.shift() as string);
    }
    return parsed;
}
