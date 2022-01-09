import React from "react";
import Input from "../../../Common/Input/Input";
import s from "./../../../Common/Styles/CommonStyles.module.css"

type SubCreditComponentPropsType = {
    onChangeTitleYears: (value: string) => void
    onChangeTitleCreditSum: (value: string) => void
    onChangeTitlePercent: (value: string) => void
    years: string
    sum: string
    percent: string
}
export const SubCreditComponent = ({
                                       onChangeTitleCreditSum,
                                       onChangeTitlePercent,
                                       onChangeTitleYears,
                                       years,
                                       sum,
                                       percent
                                   }: SubCreditComponentPropsType) => {
    return (
        <>
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>Credit period, years:</div>
                <div className={s.divTableCol}><Input onChangeText={onChangeTitleYears} value={years}/></div>
            </div>
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>Loan amount</div>
                <div className={s.divTableCol}><Input onChangeText={onChangeTitleCreditSum} value={sum}/></div>
            </div>
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>%, (per year)</div>
                <div className={s.divTableCol}><Input onChangeText={onChangeTitlePercent} value={percent}/></div>
            </div>
        </>
    )
}