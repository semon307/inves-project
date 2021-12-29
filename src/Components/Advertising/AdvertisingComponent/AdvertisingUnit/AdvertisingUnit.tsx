import React from "react";
import s from "./AdvertisingUnit.module.css"

type MoneyTransferComponentPropsType = {
    imgSrc: string
    rate: string
    buttonLink: string
}
export const AdvertisingUnit = ({imgSrc, rate, buttonLink}: MoneyTransferComponentPropsType) => {
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