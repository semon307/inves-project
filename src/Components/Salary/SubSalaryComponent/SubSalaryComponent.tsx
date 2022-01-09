import React from "react";
import Input from "../../../Common/Input/Input";
import s from "./../../../Common/Styles/CommonStyles.module.css"

type SubSalaryComponentPropsType = {
    onChangeTitleCurrentSalary: (value: string) => void
    onChangeTitlePercentGrowth: (value: string) => void
    onChangeTitlePercentCash: (value: string) => void
    onChangeTitlePercentCredit: (value: string) => void
    onChangeTitlePercentShares: (value: string) => void
    yearlyIncome: string
    percentGrowth: string
    percentForCash: string
    percentForCredit: string
    percentForShares: string
}
export const SubSalaryComponent = ({
                                       onChangeTitleCurrentSalary,
                                       onChangeTitlePercentCash,
                                       onChangeTitlePercentCredit,
                                       onChangeTitlePercentGrowth,
                                       onChangeTitlePercentShares,
                                       percentForCash,
                                       percentForCredit,
                                       percentForShares,
                                       percentGrowth,
                                       yearlyIncome,
                                   }: SubSalaryComponentPropsType) => {
    return (
        <>
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>Your current yearly salary income, USD:</div>
                <div className={s.divTableCol}><Input onChangeText={onChangeTitleCurrentSalary} value={yearlyIncome}/></div>
            </div>
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>Percentage growth (last year):</div>
                <div className={s.divTableCol}><Input onChangeText={onChangeTitlePercentGrowth} value={percentGrowth}/></div>
            </div>
            <div className={`${s.divTableRow} ${s.result}`}>How many percents do you invest in:</div>
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>Cash</div>
                <div className={s.divTableCol}><Input onChangeText={onChangeTitlePercentCash} value={percentForCash}/></div>
            </div>
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>Credit</div>
                <div className={s.divTableCol}><Input onChangeText={onChangeTitlePercentCredit} value={percentForCredit}/></div>
            </div>
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>Shares</div>
                <div className={s.divTableCol}><Input onChangeText={onChangeTitlePercentShares} value={percentForShares}/></div>
            </div>
        </>
    )
}