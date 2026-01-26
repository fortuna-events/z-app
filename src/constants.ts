import type { Editor, Page } from "./interfaces";

export const DEFAULT_EDITOR: Editor = {
    numbersCols: 0,
    numbersText: "",
    overlayText: "",
};

export const DEFAULT_PAGE: Page = {
    error: false,
    // TODO: 5. implement custom logic
    header: "",
    parts: [],
};

// TODO: 3. change data format
export const HELP_HEADER = ["Title and description (html, <h1> on plain text)"];
export const HELP_PART = ["Data (html)"];
