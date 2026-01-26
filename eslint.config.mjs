import {
    defineConfigWithVueTs,
    vueTsConfigs,
} from "@vue/eslint-config-typescript";
import pluginVue from "eslint-plugin-vue";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";
import { configureVueProject } from "@vue/eslint-config-typescript";

configureVueProject({ scriptLangs: ["ts", "tsx"] });

export default defineConfigWithVueTs(
    {
        name: "app/files-to-lint",
        files: ["**/*.{ts,mts,tsx,vue}"],
    },

    pluginVue.configs["flat/recommended"],
    vueTsConfigs.strictTypeChecked,
    vueTsConfigs.stylisticTypeChecked,
    skipFormatting,
    {
        rules: {
            "@typescript-eslint/no-non-null-assertion": "off",
            "vue/no-v-html": "off",
        },
    },
);
