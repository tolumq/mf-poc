import { reactive, ref, watch } from "vue"
import { useDynamicScript } from "../utils/dynamicScript";

export enum Status { Rest = "rest", Loading = "loading", Error = "error", Success="success" };
type State = {
    components: Map<string, string>;
}

export const useFederatedComponents = (remoteUrl: string, scope: string, module: string) => {
    const key = ref(`${remoteUrl}-${scope}-${module}`);

    // const { state } = useDynamicScript(remoteUrl);
    
    const cache: State = reactive({
        components: new Map()
    });


    watch(key, () => {

    })
}