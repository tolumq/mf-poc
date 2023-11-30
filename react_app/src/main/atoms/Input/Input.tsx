import * as React from "react"
import styles from "./Input.module.css";
import { InputProps } from "shared";
import classnames from "classnames";



export default ({onChange, name, inputType, classes, value, label, required}: InputProps)  => {
    return (
        <div className={classnames(styles.wrapper, classes?.wrapper)}>
            <label htmlFor={name} className={classnames(styles.label, classes?.label)}>
                {label}
            </label>
                <input  onChange={onChange} type={inputType} name={name} value={value} 
                    className={classnames(styles.input, classes?.input)} required={required} />
        </div>
    )
}