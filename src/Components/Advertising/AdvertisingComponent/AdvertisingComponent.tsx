import React from "react"
import s from "./AdvertisingComponent.module.css"

import wise from './../../../Common/Assets/Images/TransferWise-Title-Image.png'
import paysend from './../../../Common/Assets/Images/paysend1.jpeg'
import {AdvertisingUnit} from "./AdvertisingUnit/AdvertisingUnit";
type UnitType = {
    imgSrc: string,
    rate: string,
    buttonLink: string,
}
type AdvertisingComponentPropsType = {
    title: string
    units: Array<UnitType>
}

export const AdvertisingComponent = React.memo(({title, units}: AdvertisingComponentPropsType) => {
    const unitsForRender = units.map(item => {
        return (
            <AdvertisingUnit
                imgSrc={item.imgSrc}
                rate={item.rate}
                buttonLink={item.buttonLink}
            />
        )
    })
    return (
        <div className={s.container}>
            <h4 className={s.text}>{title}</h4>
            {unitsForRender}
        </div>
    )
})