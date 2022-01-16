import s from "./Loader.module.css"
import React from "react";
export const Loader = React.memo(() => {
    return (
        <div className={s.loadingLine}>
            <div className={s.line}>
                <div className={s.shadow}/>
            </div>
        </div>
    )
})