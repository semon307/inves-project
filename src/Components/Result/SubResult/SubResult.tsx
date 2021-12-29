import React from "react";
import s from "../Result.module.css";

type SubResultPropsType = {
    title: string
    currentPrice: string
    futurePrice: string
}
export const SubResult = ({title, currentPrice, futurePrice}: SubResultPropsType) => {
    return (
        <div className={s.divTableRow}>
            <div className={s.divTableCol}>{title}</div>
            <div className={s.divTableCol}>{currentPrice}</div>
            <div className={s.divTableCol}>{futurePrice}</div>
        </div>
    )
}