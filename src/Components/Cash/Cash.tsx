import React, {useCallback, useEffect, useState} from "react";
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

export const Cash = React.memo(({isSeperate}: CashPropsType) => {
    const [isShown, setIsShown] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const setIsShownCallback = useCallback(() => {
        setIsShown(!isShown)
    }, [isShown])
    const time = useSelector<AppStateType, TimeStateType>((state) => state.time)
    const cashState = useSelector<AppStateType, CashStateType>((state) => state.cash);
    const dispatch = useDispatch();
    const onChangeTitlePrincipalInvestment = useCallback((value: string) => {
        dispatch(setprincipalInvestment(value))
    }, [dispatch])
    const onChangeTitleInterestRate = useCallback((value: string) => {
        dispatch(setInterestRate(value))
    }, [dispatch])
    const onChangeTitleNumberOfInterestAccrualPeriods = useCallback((value: string) => {
        dispatch(setNumberOfInterestAccrualPeriods(value))
    }, [dispatch])
    useEffect(() => {
        onFuturePriceChange()
    }, [cashState.principalInvestment, cashState.interestRate, cashState.numberOfInterestAccrualPeriods, time.years])
    const onFuturePriceChange = () => {
        let futureCash = compoundInterest(+cashState.principalInvestment, +cashState.interestRate, +cashState.numberOfInterestAccrualPeriods, +time.years)
        const newFutureCash = Math.round(futureCash)
        dispatch(setAmount(newFutureCash.toString()))
    }
    const onClickHandler = useCallback(() => {
        setShowResult(true)
    }, [])
    return (
        <>
            {isSeperate
                ? <><Time/>
                    <div className={s.mainDivComponent}>
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
                    </div>
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
})