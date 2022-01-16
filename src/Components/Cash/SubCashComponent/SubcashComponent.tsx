import React from "react";
import Input from "../../../Common/Input/Input";
import s from "./../../../Common/Styles/CommonStyles.module.css"

type SubcashComponentPropsType = {
    onChangeTitlePrincipalInvestment: (value: string) => void
    principalInvestment: string
    onChangeTitleInterestRate: (value: string) => void
    interestRate: string
    onChangeTitleNumberOfInterestAccrualPeriods: (value: string) => void
    numberOfInterestAccrualPeriods: string
}
export const SubcashComponent = React.memo(({
                                                onChangeTitlePrincipalInvestment,
                                                principalInvestment,
                                                onChangeTitleInterestRate,
                                                interestRate,
                                                onChangeTitleNumberOfInterestAccrualPeriods,
                                                numberOfInterestAccrualPeriods
                                            }: SubcashComponentPropsType) => {
    return (
        <>
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>Your current cash deposit, USD:</div>
                <div className={s.divTableCol}><Input onChangeText={onChangeTitlePrincipalInvestment}
                                                      value={principalInvestment}/></div>
            </div>
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>Interest Rate:</div>
                <div className={s.divTableCol}><Input onChangeText={onChangeTitleInterestRate} value={interestRate}/>
                </div>
            </div>
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>Yearly amount of interest payments?</div>
                <div className={s.divTableCol}><Input onChangeText={onChangeTitleNumberOfInterestAccrualPeriods}
                                                      value={numberOfInterestAccrualPeriods}/></div>
            </div>
        </>
    )
})