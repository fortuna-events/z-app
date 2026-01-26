import { compressToBase64, decompressFromBase64 } from "lz-string";

function base64URLTobase64(value: string): string {
    const base64Encoded = value.replace(/-/gu, "+").replace(/_/gu, "/");
    const padding =
        value.length % 4 === 0 ? "" : "=".repeat(4 - (value.length % 4));
    return base64Encoded + padding;
}

function base64tobase64URL(value: string): string {
    return value
        .replace(/\+/gu, "-")
        .replace(/\//gu, "_")
        .replace(/[=]+$/u, "");
}

export function decodeData(value: string): string {
    return decompressFromBase64(
        base64URLTobase64(value.split("").reverse().join("")),
    );
}

function encodeData(value: string): string {
    return base64tobase64URL(compressToBase64(value))
        .split("")
        .reverse()
        .join("");
}

export function encodeDataToUrl(value: string): string {
    return value.trim().length
        ? `${window.location.pathname}?z=${encodeData(value.trim())}`
        : "";
}
