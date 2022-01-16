import React from "react";
import Input from "../../../Common/Input/Input";
import s from "./../../../Common/Styles/CommonStyles.module.css"
type SubRealEstateComponentPropsType = {
    onChangeTitleCurrentPrice: (value: string) => void
    onChangeTitlePriceChange: (value: string) => void
    currentPrice: string
    priceChangeLastYears: string
}
export const SubRealEstateComponent = React.memo(({
                                           onChangeTitleCurrentPrice,
                                           onChangeTitlePriceChange,
                                           currentPrice,
                                           priceChangeLastYears
                                       }: SubRealEstateComponentPropsType) => {
    return (
        <>
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>Current price, USD:</div>
                <div className={s.divTableCol}><Input onChangeText={onChangeTitleCurrentPrice} value={currentPrice}/></div>
            </div>
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>Yearly market price growth, %</div>
                <div className={s.divTableCol}><Input onChangeText={onChangeTitlePriceChange} value={priceChangeLastYears}/></div>
            </div>
        </>
    )
})