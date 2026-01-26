import { createIcons, icons } from "lucide";

export function updateIcons() {
    createIcons({
        icons,
        nameAttr: "icon",
        attrs: {
            width: "1.1em",
            height: "1.1em",
        },
    });
}
