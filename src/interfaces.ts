export interface Editor {
    numbersCols: number;
    numbersText: string;
    overlayText: string;
}

export interface Page {
    error: boolean;
    header: string;
    // TODO: 5. implement custom logic
    parts: string[];
}
