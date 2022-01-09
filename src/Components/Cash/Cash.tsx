import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/Store";
import {
    CashStateType,
    setAmount,
    setInterestRate,
    setNumberOfInterestAccrualPeriods,
    setprincipalInvestment
} from "../../BLL/CashReducer";
import {Time} from "../Time/Time";
import {compoundInterest} from "../../Functions/Functions";
import {TimeStateType} from "../../BLL/TimeReducer";
import Button from "../../Common/Button/Button";
import {Switcher} from "../../Common/Switcher/Switcher";
import {SubcashComponent} from "./SubCashComponent/SubcashComponent";
import s from './../../Common/Styles/CommonStyles.module.css'
type CashPropsType = {
    isSeperate: boolean
}

export const Cash = ({isSeperate}: CashPropsType) => {
    const [isShown, setIsShown] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const setIsShownCallback = () => {
        setIsShown(!isShown)
    }
    const time = useSelector<AppStateType, TimeStateType>((state) => state.time)
    const cashState = useSelector<AppStateType, CashStateType>((state) => state.cash);
    const dispatch = useDispatch();
    const onChangeTitlePrincipalInvestment = (value: string) => {
        dispatch(setprincipalInvestment(value))
    }
    const onChangeTitleInterestRate = (value: string) => {
        dispatch(setInterestRate(value))
    }
    const onChangeTitleNumberOfInterestAccrualPeriods = (value: string) => {
        dispatch(setNumberOfInterestAccrualPeriods(value))
    }
    useEffect(() => {
        onFuturePriceChange()
    }, [cashState.principalInvestment, cashState.interestRate, cashState.numberOfInterestAccrualPeriods, time.years])
    const onFuturePriceChange = () => {
        let futureCash = compoundInterest(+cashState.principalInvestment, +cashState.interestRate, +cashState.numberOfInterestAccrualPeriods, +time.years)
        const newFutureCash = Math.round(futureCash)
        dispatch(setAmount(newFutureCash.toString()))
    }
    const onClickHandler = () => {
        setShowResult(true)
    }
    return (
        <>
            {isSeperate
                ? <><Time/>
                    <>
                        <SubcashComponent onChangeTitlePrincipalInvestment={onChangeTitlePrincipalInvestment}
                                          principalInvestment={cashState.principalInvestment}
                                          onChangeTitleInterestRate={onChangeTitleInterestRate}
                                          interestRate={cashState.interestRate}
                                          onChangeTitleNumberOfInterestAccrualPeriods={onChangeTitleNumberOfInterestAccrualPeriods}
                                          numberOfInterestAccrualPeriods={cashState.numberOfInterestAccrualPeriods}/>
                        <div className={s.buttonDiv}>
                            <Button onClick={onClickHandler}>Calculate!</Button>
                        </div>
                        <div className={s.result}>
                            {showResult &&
                                <span>In {time.years} years your current cash deposit will become {cashState.amount} USD</span>}
                        </div>
                    </>
                </>
                : <>
                    <Switcher callBack={setIsShownCallback} checked={isShown} title={"Do you have any cash deposits?"}/>
                    {isShown ?
                        <>
                            <SubcashComponent onChangeTitlePrincipalInvestment={onChangeTitlePrincipalInvestment}
                                              principalInvestment={cashState.principalInvestment}
                                              onChangeTitleInterestRate={onChangeTitleInterestRate}
                                              interestRate={cashState.interestRate}
                                              onChangeTitleNumberOfInterestAccrualPeriods={onChangeTitleNumberOfInterestAccrualPeriods}
                                              numberOfInterestAccrualPeriods={cashState.numberOfInterestAccrualPeriods}/>
                        </>
                        : null}</>
            }

        </>
    )
}