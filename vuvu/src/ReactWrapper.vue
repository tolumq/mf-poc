<template>
    <div v-if="error">error loading button</div>
    <div v-else ref="root">loading button...</div>
</template>
<script setup lang="ts">
import React from "react";
import ReactDOM from "react-dom";
import { ref, onMounted, onBeforeUnmount, onUpdated, defineProps } from 'vue';
import { ButtonProps } from 'shared';

const props = defineProps<ButtonProps>();
const root = ref(null);
const error = ref<any>(null);
const ReactComponent = ref(null);

const firstLoad = new Promise(resolve => setTimeout(resolve, 1000));
async function fetchButton() {
    // simulate long network delay (to be removed)
    await firstLoad;
    return (await import("home/Button")).default;
}

function updateReactComponent() {
    if(!ReactComponent.value || !!error.value) return;
    ReactDOM.render(React.createElement(ReactComponent.value, props), root.value);
}


function unmountReactComponent() {
    root.value && ReactDOM.unmountComponentAtNode(root.value);
}

onMounted(updateReactComponent);
onUpdated(updateReactComponent);
onBeforeUnmount(unmountReactComponent);


try {
    (async() => {
        let result = await fetchButton();
        ReactComponent.value = result;
        updateReactComponent();
    })()
} catch (e) {
    error.value = e;
}
</script>