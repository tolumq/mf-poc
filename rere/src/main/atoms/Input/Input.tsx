import * as React from "react"
import styles from "./Input.module.css";
import classnames from "classnames";

export type InputProps = {
    name: string;
    label?: string;
    classes: Record<Partial<"label"| "input" | "wrapper">, string>
    inputType: React.HTMLInputTypeAttribute
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({onChange, name, inputType, classes}: InputProps) => {
    return (
        <>
        <div className={classnames(styles.wrapper, classes?.wrapper)}>
            <label htmlFor={name} className={classnames(styles.label, classes?.label)}>
                <input  onChange={onChange} type={inputType} />
            </label>
        </div>
        </>
    )
}