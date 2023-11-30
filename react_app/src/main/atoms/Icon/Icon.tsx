import * as React from "react"
import styles from "./Icon.module.css"
import classnames from "classnames"
import { IconProps } from "shared";


export default ({image, classes, alt}: IconProps) => {
    return (
        <div className={classnames(styles.wrapper, classes)}>
            <img src={image} alt={alt} className={styles.image} />
        </div>
    )
}