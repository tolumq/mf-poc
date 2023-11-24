<template>
    <div v-if="error">error loading button</div>
    <div v-else ref="root">loading button...</div>
</template>
<script setup lang="ts">
import React from "react";
import ReactDOM from "react-dom";
import { ref, onMounted, onBeforeUnmount, onUpdated, defineProps } from 'vue';
import { ButtonProps } from 'shared';

type Scope = unknown;
type Factory = () => any;

type Container = {
    init(shareScript: Scope): void;
    get(module: string): Factory;
}

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };


const props = defineProps<ButtonProps>();
const root = ref(null);
const error = ref<any>(null);
const ReactComponent = ref(null);


async function loadComponent(remoteName: string, exposedModule: string) {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    // @ts-ignore
    const container = window(remoteName) as Container; // or get the container somewhere else
    
    // Initialize the container, it may provide share modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(exposedModule);
    const Module = factory();
    return Module;
}

async function fetchButton() {
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