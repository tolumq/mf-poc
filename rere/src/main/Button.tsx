import * as React from "react";
import {ButtonProps} from "shared"


export default ({text, type}: ButtonProps) => (
    <button type={type} style={{border: "5px solid green"}}>
        {text}
    </button>
)