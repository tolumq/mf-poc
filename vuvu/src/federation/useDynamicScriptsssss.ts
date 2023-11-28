import * as React from "react"

export enum Status { Rest = "rest", Loading = "loading", Error = "error", Success="success" };


const urlCache = new Set();
export const useDynamicScript = (url: string) => {
    const [state, setState] = React.useState(Status.Rest);

    React.useEffect(() => {
        if(!url) return;

        if(urlCache.has(url)) {
            setState(Status.Success);
        }
    }, [url])
}