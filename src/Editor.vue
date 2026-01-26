<script setup lang="ts">
import { ref, onBeforeMount, useTemplateRef, watch } from "vue";
import type { Editor } from "@/interfaces";
import { DEFAULT_EDITOR } from "./constants";
import { parseEditor } from "./lib/parser";

const debugData = defineModel<string>();
const editor = ref<Editor>(DEFAULT_EDITOR);
const numbers = useTemplateRef("numbers");
const overlay = useTemplateRef("overlay");
const code = useTemplateRef("code");

function editorScroll() {
    if (numbers.value) {
        numbers.value.scrollTop = code.value?.scrollTop ?? 0;
    }

    if (overlay.value) {
        overlay.value.scrollTop = code.value?.scrollTop ?? 0;
        overlay.value.scrollLeft = code.value?.scrollLeft ?? 0;
    }
}

watch(debugData, () => {
    editor.value = parseEditor(debugData.value ?? "");
});

onBeforeMount(() => {
    editor.value = parseEditor(debugData.value ?? "");
});
</script>

<template>
    <div class="editor">
        <textarea
            class="numbers"
            :cols="editor.numbersCols"
            rows="10"
            readonly
            ref="numbers"
            v-model="editor.numbersText"
        ></textarea>
        <textarea
            class="code"
            v-model="debugData"
            ref="code"
            rows="10"
            @scroll="editorScroll"
        ></textarea>
        <div class="overlay">
            <textarea :cols="editor.numbersCols" rows="10" readonly></textarea>
            <textarea
                ref="overlay"
                class="code"
                rows="10"
                readonly
                v-model="editor.overlayText"
            ></textarea>
        </div>
    </div>
</template>

<style scoped>
.editor {
    display: flex;
    overflow-y: scroll;
    position: relative;
}

.editor textarea {
    margin: 0;
    resize: none;
    outline: none;
    font-size: 13px;
    text-wrap: nowrap;
}

.code {
    flex-grow: 1;
}

.numbers {
    overflow: hidden;
    border: 1px solid #0000;
    background: none;
    text-align: right;
    pointer-events: none;
}

.overlay {
    display: flex;
    position: absolute;
    width: 100%;
    opacity: 50%;
    pointer-events: none;
}

.overlay > textarea {
    border: 1px solid #0000;
    overflow: hidden;
    background: none;
}
</style>
