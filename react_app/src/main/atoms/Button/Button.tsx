import * as React from "react"
import { ButtonProps } from "shared"
import styles from "./Button.module.css"
import classnames from "classnames";


export default ({text, type, onClick, classes}: ButtonProps) => (
    <button type={type} className={classnames(styles.button, classes)} onClick={onClick}>
        {text}
    </button>
)
