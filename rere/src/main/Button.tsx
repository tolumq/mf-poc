import * as React from "react";

type Props = {
    text: string;
    type: "button" | "submit" | "reset"
}

export default ({text, type}: Props) => (
    <button type={type} style={{border: "5px solid green"}}>
        {text}
    </button>
)