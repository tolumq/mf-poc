<template>
    <div v-if="error">error loading button</div>
    <div v-else ref="root">loading button...</div>
</template>
<script setup lang="ts">
import * as React from "react";
import ReactDOM from "react-dom";
import { ref, onMounted, onBeforeUnmount, onUpdated, defineProps, toRefs } from 'vue';
import { ButtonProps, Status } from '../shared.types';
import { watch } from "vue";
import { useDynamicScript } from "../utils/dynamicScript";
// import { importRemote } from "@module-federation/utilities";




type Scope = unknown;
type Factory = () => any;

export type ModuleScopes = "home"; // all the types imported in webpack module federation

export type DynamicModule = {
  module: string;
  url: string;
  scope: ModuleScopes;
}

type Container = {
    init(shareScript: Scope): void;
    get(module: string): Factory;
}

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };


async function loadComponent(scope: ModuleScopes, module: string) {
//   return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");
    const container = window[scope] as Container; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
//   };
}


async function loadRemote(scope: ModuleScopes, module: string) {
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


const addScript = (url: string) => 
    new Promise((resolve, reject) => {
        const element = document.createElement("script");
        element.src = url;
        element.type = "text/javascript";
        element.async = true;

        element.onload = () => {
            console.log("document.head", document.head)
            resolve("we're good")
        }

        element.onerror = (e) => {
            reject(e)
        }

        document.head.appendChild(element);
    })

try {
    // const {status, urlCache} = toRefs(useDynamicScript(props.url)!);

    (async () => {
        console.log("(((((((((((((((((((((((((((((((|||||||||||||||||||||||||)))))))))))))))))))))))))))))))");
        const result = await addScript(props.url);
        const Component = await loadComponent(props.scope, props.module);
        // const lazyLoaded = await Component();
        console.log("the component>>>>>>>>>", Component.default)
        const abc = Component._result;
        ReactComponent.value = Component.default;
        console.log("WHAT WE SEE(((((((((((((((((((((((((((((((((>>>>>>>>>>>>>>>>>>>>>>>>>>>)))))))))))))))))))))))))))))))))", abc)
        updateReactComponent();
    })()

} catch (e) {
    error.value = e;
    console.log("RECEIVED ERROR||||||||||||||", e);
}


// try {
//     (async() => {
//         // addScript(props.url).then(res => {
//         //     console.log("(((((((((((((((((((((((((((((((|||||||||||||||||||||||||)))))))))))))))))))))))))))))))", result);
//         // }).catch(e => {
//         //     console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", e)
//         // });
//         // const Bar = React.lazy(() => importRemote({
//         //     url: () => Promise.resolve(""),
//         //     scope: "home",
//         //     module: "Button",
//         // }))
//         // const ComponentABC = <ModuleLoader />;
//         const result = await fetchButton();
//         ReactComponent.value = result;
//         console.log("WHAT RESULT SHOULD LOOK LIKE >>>>>>>>>>>>>>>>>>>>>>", result);
//         updateReactComponent();
//     })()
// } catch (e) {
//     error.value = e;
// }
</script>