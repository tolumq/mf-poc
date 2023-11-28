<template>
    <div v-if="error">error loading button</div>
    <div v-else ref="root">loading button...</div>
</template>
<script setup lang="ts">
import React from "react";
import ReactDOM from "react-dom";
import { ref, onMounted, onBeforeUnmount, onUpdated, defineProps, toRefs } from 'vue';
import { ButtonProps, Status } from '../shared.types';
import { importRemote } from "@module-federation/utilities";




type Scope = unknown;
type Factory = () => any;

export type ModuleScopes = "home"; // all the types imported in webpack module federation

export type DynamicModule = {
  module: string;
  url: string;
  scope: ModuleScopes;
}



type WrapperProps = DynamicModule & ButtonProps; // extends any other props (this would be refactored)


const props = defineProps<WrapperProps>();
const root = ref(null);
const error = ref<any>(null);
const ReactComponent = ref<any>(null);



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
        // const ComponentABC = <ModuleLoader />;
        const result = await fetchButton();
        ReactComponent.value = result;
        console.log("WHAT RESULT SHOULD LOOK LIKE >>>>>>>>>>>>>>>>>>>>>>", result);
        updateReactComponent();
    })()
} catch (e) {
    error.value = e;
}
</script>