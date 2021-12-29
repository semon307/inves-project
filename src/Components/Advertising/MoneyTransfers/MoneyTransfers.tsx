import React from "react"
import s from "./MoneyTransfers.module.css"
import {MoneyTransferComponent} from "./MoneyTransferComponent/MoneyTransferComponent";
import wise from './../../../Common/Assets/Images/TransferWise-Title-Image.png'
import paysend from './../../../Common/Assets/Images/paysend1.jpeg'

export const MoneyTransfers = () => {
    return (
        <div className={s.container}>
            <h4 className={s.text}>Best money transfer services:</h4>
            <MoneyTransferComponent
            imgSrc={wise}
            rate={"5/5"}
            buttonLink={'https://wise.com/invite/i/semenk14'}
            />
            <MoneyTransferComponent imgSrc={paysend} rate={"4/5"} buttonLink={"https://paysend.com/referral/5b58c5"}/>
        </div>
    )
}