import * as React from "react"
import styles from "./Input.module.css";
import { InputProps } from "shared";
import classnames from "classnames";



export const Input = ({onChange, name, inputType, classes}: InputProps) => {
    return (
        <div className={classnames(styles.wrapper, classes?.wrapper)}>
            <label htmlFor={name} className={classnames(styles.label, classes?.label)}>
                <input  onChange={onChange} type={inputType} />
            </label>
        </div>
    )
}