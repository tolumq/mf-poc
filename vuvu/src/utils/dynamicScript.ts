import { onBeforeUnmount, reactive, toRefs, watch } from "vue";
import {Status} from "../shared.types";

export type State = {
    status: Status,
    urlCache: Set<string>
}

export function useDynamicScript(url: string) {
    const state: State = reactive({
        status: Status.Rest,
        urlCache: new Set(),
    });

    if(state.urlCache.has(url)) {
        state.status = Status.Success;
        return;
    }

    const element = document.createElement("script");
    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    element.onload = () => {
        console.log("appended to the head ((((((((((((((((((((((((((||||||||||||||||||||||||||||||||||||||||||||||||))))))))))))))))))))))))))*********************************");
        state.urlCache.add(url);
        console.log("GOOD LOAD *******GOOD LOAD *******GOOD LOAD *******GOOD LOAD *******GOOD LOAD *******GOOD LOAD *******");
        state.status = Status.Success;
    }
    
    element.onerror =() => {
        console.log("BAD BAD LOAD ->?>>>>>>BAD BAD LOAD ->?>>>>>>BAD BAD LOAD ->?>>>>>>BAD BAD LOAD ->?>>>>>>BAD BAD LOAD ->?>>>>>>BAD BAD LOAD ->?>>>>>>")
        state.status = Status.Error;
    }
    
    document.head.appendChild(element);

    onBeforeUnmount(() => {
        state.urlCache.delete(url);
        document.head.removeChild(element);
    })
    
    
    return state
}