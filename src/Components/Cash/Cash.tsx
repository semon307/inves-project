import React, {useEffect, useState} from "react";
import s from "./Cash.module.css"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/Store";
import {
    CashStateType,
    setAmount,
    setInterestRate,
    setNumberOfInterestAccrualPeriods,
    setprincipalInvestment
} from "../../BLL/CashReducer";
import Input from "../../Common/Input/Input";
import {Time} from "../Time/Time";
import {compoundInterest} from "../../Functions/Functions";
import {TimeStateType} from "../../BLL/TimeReducer";
import Button from "../../Common/Button/Button";
import {Switcher} from "../../Common/Switcher/Switcher";

type CashPropsType = {
    isSeperate: boolean
}

export const Cash = ({isSeperate}: CashPropsType) => {
    const [isShown, setIsShown] = useState(false)
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
        onClickHandler()
    }, [cashState.principalInvestment, cashState.interestRate, cashState.numberOfInterestAccrualPeriods, time.years])
    const onClickHandler = () => {
        let futureCash = compoundInterest(+cashState.principalInvestment, +cashState.interestRate, +cashState.numberOfInterestAccrualPeriods, +time.years)
        const newFutureCash = Math.round(futureCash)
        dispatch(setAmount(newFutureCash.toString()))
    }
    return (
        <div>
            {isSeperate
                ? <><Time/>
                    <>
                        <div>
                            <span>Your current cash deposit, USD:</span>
                            <Input onChangeText={onChangeTitlePrincipalInvestment}
                                   value={cashState.principalInvestment}/>
                        </div>
                        <div>
                            <span>Interest Rate</span>
                            <Input onChangeText={onChangeTitleInterestRate} value={cashState.interestRate}/>
                        </div>
                        <div>
                            <span>How many times per year do you get interest payments?</span>
                            <Input onChangeText={onChangeTitleNumberOfInterestAccrualPeriods}
                                   value={cashState.numberOfInterestAccrualPeriods}/>
                        </div>
                        <div>
                            <Button onClick={onClickHandler}>Calculate!</Button>
                        </div>
                        <div>
                            {cashState.amount ?
                                <span>In {time.years} years your current cash deposit will become {cashState.amount} USD</span> : null}
                        </div>
                    </>
                </>
                : <><Switcher callBack={setIsShownCallback} checked={isShown} title={"Do you have any cash deposits?"}/>
                    {isShown ?
                        <>
                            <div>
                                <span>Your current cash deposit, USD:</span>
                                <Input onChangeText={onChangeTitlePrincipalInvestment}
                                       value={cashState.principalInvestment}/>
                            </div>
                            <div>
                                <span>Interest Rate</span>
                                <Input onChangeText={onChangeTitleInterestRate} value={cashState.interestRate}/>
                            </div>
                            <div>
                                <span>How many times per year do you get interest payments?</span>
                                <Input onChangeText={onChangeTitleNumberOfInterestAccrualPeriods}
                                       value={cashState.numberOfInterestAccrualPeriods}/>
                            </div>
                            {/*<div>*/}
                            {/*    {cashState.amount ?*/}
                            {/*        <span>In {time.years} years your current cash deposit will become {cashState.amount} USD</span> : null}*/}
                            {/*</div>*/}
                        </>
                        : null}</>
            }

        </div>
    )
}