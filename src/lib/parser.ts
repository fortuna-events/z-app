import type { Editor, Page } from "@/interfaces";
import { clone } from "./objects";
import {
    DEFAULT_COLOR_HUE,
    DEFAULT_COLOR_SAT,
    DEFAULT_EDITOR,
    DEFAULT_PAGE,
    HELP_HEADER,
    HELP_PART,
} from "@/constants";
import { changeDocumentColor } from "./colors";

export function parseEditor(value: string, parsed: Page): Editor {
    const editor = clone(DEFAULT_EDITOR);
    const debugDataSplit = value.split("\n");
    const headerSize = HELP_HEADER.length - (parsed.hasColor ? 0 : 1);
    let size = headerSize + HELP_PART.length;
    while (debugDataSplit.length > size) {
        size += HELP_PART.length;
    }
    const lines = Array(size).fill(0);
    editor.numbersText = debugDataSplit
        .map((_value, index) => (index + 1).toString() + `.`)
        .join("\n");
    editor.overlayText = lines
        .map((_value, index) => {
            if (
                debugDataSplit.length > index &&
                (debugDataSplit[index] ?? "").trim().length
            ) {
                return " ".repeat((debugDataSplit[index] ?? "").length);
            } else if (headerSize > index) {
                return HELP_HEADER[index];
            }
            return HELP_PART[(index - headerSize) % HELP_PART.length];
        })
        .join("\n");
    editor.numbersCols = editor.numbersText.length.toString().length + 1;
    return editor;
}

function addHtmlIfMissing(value: string, tag: string): string {
    if (!/<[^>]*>/u.test(value)) {
        return `<${tag}>${value}</${tag}>`;
    }
    return value;
}

function parseRegex(
    parts: string[],
    regex: RegExp,
    success: (value: string) => void,
    failure: (empty: boolean) => void,
): void {
    if (!parts.length || !parts[0]?.length) {
        parts.shift(); // consume empty line
        failure(true);
        return;
    }

    if (regex.test(parts[0])) {
        success(parts.shift()!);
        return;
    }

    failure(false);
}

export function parsePage(value: string): Page {
    const parsed = clone(DEFAULT_PAGE);
    const parts = value.split("\n");
    if (parts.length < 1 || !parts[0]?.length) {
        parsed.error = "no data";
        return parsed;
    }
    parsed.header = addHtmlIfMissing(parts.shift()!, "h1");
    // parse color if found
    parseRegex(
        parts,
        /^\d+(.\d+)?,\s+\d+(.\d+)?%$/u,
        (line: string) => {
            const rawPart = line.split(",");
            changeDocumentColor(
                rawPart[0] ?? DEFAULT_COLOR_HUE,
                rawPart[1] ?? DEFAULT_COLOR_SAT,
            );
        },
        (empty: boolean) => {
            parsed.hasColor = empty;
            changeDocumentColor(DEFAULT_COLOR_HUE, DEFAULT_COLOR_SAT);
        },
    );
    // TODO: 5. implement custom logic
    parsed.parts = [];
    while (parts.length) {
        parsed.parts.push(parts.shift()!);
    }
    return parsed;
}
