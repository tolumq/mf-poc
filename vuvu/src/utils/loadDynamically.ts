import { reactive, ref, watch } from "vue";
import { useDynamicScript } from "./dynamicScript";

type Scope = unknown;
type Factory = () => any;

type Container = {
    init(shareScript: Scope): void;
    get(module: string): Factory;
}

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };


async function loadComponent(remoteName: string, exposedModule: string) {
    return async () => {
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
}


type LocalCache = {
    components: Record<string, any>
}

export const useLoadComponent = async () => {
    const key = ref(null);
    const cache: LocalCache = reactive({components: {}})

    const Component = ref(null);
            
    const get = async (remoteUrl: string, scope: string, module: string) => {
        const key = `${remoteUrl}-${scope}-${module}`;
        
        const result = useDynamicScript(remoteUrl);
        const Component = await loadComponent(scope, module);
        cache.components[key] = Component;

        return {
            status: result?.state.value.status,
            Component: Component
        }
    }


    return { get }
}