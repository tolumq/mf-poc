import * as React from "react"

enum Status { Rest, Loading, Error, Success }

const urlCache = new Set();
const useDynamicScript = (url: string) => {
    const [state, setState] = React.useState(Status.Rest);

    React.useEffect(() => {
        if(!url) return;

        if(urlCache.has(url)) {
            setState(Status.Success);
        }
    }, [url])
}