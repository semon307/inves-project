import React from "react";
import s from "../Result.module.css";

type SubResultPropsType = {
    title: string
    currentPrice: string
    futurePrice: string
}
export const SubResult = React.memo(({title, currentPrice, futurePrice}: SubResultPropsType) => {
    return (
        <div className={s.divTableRow}>
            <div className={s.divTableCol1}>{title}</div>
            <div className={s.divTableCol1}>{currentPrice}</div>
            <div className={s.divTableCol1}>{futurePrice}</div>
        </div>
    )
})