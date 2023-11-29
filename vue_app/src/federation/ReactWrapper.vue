<template>
    <div v-if="error">error loading button</div>
    <div v-else ref="root">loading button...</div>
</template>
<script setup lang="ts">
import * as React from "react";
import ReactDOM from "react-dom";
import { ref, onMounted, onBeforeUnmount, onUpdated, defineProps, toRefs } from 'vue';
import { ButtonProps, InputProps } from "shared";
import { ModuleScope, SharedComponents, shared } from "./utils";

type Scope = unknown;
type Factory = () => any;


export type DynamicModule = {
  module: string;
  url: string;
  scope: ModuleScope;
//   component: keyof Shared
}

type Container = {
    init(shareScript: Scope): void;
    get(module: string): Factory;
}

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };


async function loadComponent(scope: ModuleScope, module: string) {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");
    const container = window[scope] as Container; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
}


// type SharedProps = {
//     "button": ButtonProps
//     "input": InputProps
// }


// type SharedKeys = keyof SharedProps;
// type Wrapper<T extends SharedKeys> = SharedProps[T];


type ComponentProps = ButtonProps | InputProps;


// type SharedKeys = keyof Shared;
// type Days = {message: string};
// type MessageOf<T extends Days> = T["message"];
// type Messageing<T extends keyof Days> = Days[T];
// type WrappedModule = 
// type WrappedModule<T extends keyof >


// type WrappedModule = DynamicModule & SharedProps[SharedComponents.Button];

type WrapperProps = DynamicModule // extends any other props (this would be refactored)


const props = defineProps<{reactWrapperName: SharedComponents } & ComponentProps >();
const root = ref(null);
const error = ref<any>(null);
const ReactComponent = ref<any>(null);




// static components
async function fetchButton() {
    return (await import("home/Button")).default;
}

function updateReactComponent() {
    if(!ReactComponent.value || !!error.value) return;
    const {reactWrapperName, ...rest} = props;
    ReactDOM.render(React.createElement(ReactComponent.value, rest as {}), root.value);
}


function unmountReactComponent() {
    root.value && ReactDOM.unmountComponentAtNode(root.value);
}

onMounted(updateReactComponent);
onUpdated(updateReactComponent);
onBeforeUnmount(unmountReactComponent);


const addScript = (url: string) => 
    new Promise((resolve, reject) => {
        const element = document.createElement("script");
        element.src = url;
        element.type = "text/javascript";
        element.async = true;

        element.onload = () => {
            console.log("document.head", document.head)
            resolve("")
        }

        element.onerror = (e) => {
            reject(e)
        }

        document.head.appendChild(element);
    })

try {
    (async () => {
        const {module, scope, url} = shared[props.reactWrapperName as  SharedComponents];

        await addScript(url);
        const Component = await loadComponent(scope as ModuleScope, module);
        ReactComponent.value = Component.default;
        updateReactComponent();
    })()

} catch (e) {
    error.value = e;
}
</script>