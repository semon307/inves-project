import React from "react";
import s from "./MoneyTransferComponent.module.css"
import Button from "../../../../Common/Button/Button";
type MoneyTransferComponentPropsType = {
    imgSrc: string
    rate: string
    buttonLink: string
}
export const MoneyTransferComponent = ({imgSrc, rate, buttonLink}: MoneyTransferComponentPropsType) => {
    return (
        <div className={s.main}>
            <div className={s.logo} style={{backgroundImage: `url(${imgSrc})`}}>
                {/*<img className={s.img} src={imgSrc} alt={"logotype"}/>*/}
            </div>
            <div className={s.rate}>{rate}</div>
            <div><button className={s.button}><a href={buttonLink} target={"_blank"} rel={"noreferrer"}>Go there!</a></button></div>
        </div>
    )
}