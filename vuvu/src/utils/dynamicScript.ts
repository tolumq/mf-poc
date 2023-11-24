import { onBeforeUnmount, reactive, toRefs, watch } from "vue";

enum Status { Rest, Loading, Error, Success }

type State = {
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
        state.urlCache.add(url);
        state.status = Status.Success;
    }

    element.onerror =() => {
        state.status = Status.Error;
    }

    document.head.appendChild(element);


    onBeforeUnmount(() => {
        state.urlCache.delete(url);
        document.head.removeChild(element);
    })
    
    
    return toRefs({ state })
}