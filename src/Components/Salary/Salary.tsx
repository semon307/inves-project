import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/Store";
import {TimeStateType} from "../../BLL/TimeReducer";

import {compoundInterest} from "../../Functions/Functions";
import Input from "../../Common/Input/Input";
import Button from "../../Common/Button/Button";
import {Time} from "../Time/Time";
import {Switcher} from "../../Common/Switcher/Switcher";
import s from './../../Common/Styles/CommonStyles.module.css'
import {
    SalaryStateType,
    setAmount,
    setPercentForCash, setPercentForCredit, setPercentForShares,
    setPercentGrowth,
    setYearlyIncome
} from "../../BLL/SalaryReducer";
import {SubSalaryComponent} from "./SubSalaryComponent/SubSalaryComponent";

type SalaryPropsType = {
    isSeperate: boolean
}
export const Salary = ({isSeperate}: SalaryPropsType) => {
    const [isShown, setIsShown] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const setIsShownCallback = () => {
        setIsShown(!isShown)
    }
    const time = useSelector<AppStateType, TimeStateType>((state) => state.time)
    const salaryState = useSelector<AppStateType, SalaryStateType>((state) => state.salary);
    const dispatch = useDispatch();
    const onChangeTitleCurrentSalary = (value: string) => {
        dispatch(setYearlyIncome(value))
    }
    const onChangeTitlePercentGrowth = (value: string) => {
        dispatch(setPercentGrowth(value))
    }
    const onChangeTitlePercentCash = (value: string) => {
        dispatch(setPercentForCash(value))
    }
    const onChangeTitlePercentCredit = (value: string) => {
        dispatch(setPercentForCredit(value))
    }
    const onChangeTitlePercentShares = (value: string) => {
        dispatch(setPercentForShares(value))
    }


    const onClickHandler = () => {
        let futureSalary = compoundInterest(+salaryState.yearlyIncome, +salaryState.percentGrowth, 1, +time.years)
        const newFutureSalary = Math.round(futureSalary)
        dispatch(setAmount(newFutureSalary.toString()))
        setShowResult(true)
    }
    return (
        <>
            {isSeperate
                ? <><Time/>
                    <div className={s.mainDivComponent}>
                        <SubSalaryComponent onChangeTitleCurrentSalary={onChangeTitleCurrentSalary}
                                            onChangeTitlePercentGrowth={onChangeTitlePercentGrowth}
                                            onChangeTitlePercentCash={onChangeTitlePercentCash}
                                            onChangeTitlePercentCredit={onChangeTitlePercentCredit}
                                            onChangeTitlePercentShares={onChangeTitlePercentShares}
                                            yearlyIncome={salaryState.yearlyIncome}
                                            percentGrowth={salaryState.percentGrowth}
                                            percentForCash={salaryState.percentForCash}
                                            percentForCredit={salaryState.percentForCredit}
                                            percentForShares={salaryState.percentForShares}/>
                        <div className={s.buttonDiv}>
                            <Button onClick={onClickHandler}> Calculate!</Button>
                        </div>
                        <div className={s.result}>
                            {showResult ?
                                <span>In {time.years} years your salary income will be {salaryState.amount} USD</span> : null}
                        </div>
                    </div>
                </>
                : <><Switcher callBack={setIsShownCallback} checked={isShown} title={"Do you have salary income?"}/>
                    {isShown ?
                        <>
                            <SubSalaryComponent onChangeTitleCurrentSalary={onChangeTitleCurrentSalary}
                                                onChangeTitlePercentGrowth={onChangeTitlePercentGrowth}
                                                onChangeTitlePercentCash={onChangeTitlePercentCash}
                                                onChangeTitlePercentCredit={onChangeTitlePercentCredit}
                                                onChangeTitlePercentShares={onChangeTitlePercentShares}
                                                yearlyIncome={salaryState.yearlyIncome}
                                                percentGrowth={salaryState.percentGrowth}
                                                percentForCash={salaryState.percentForCash}
                                                percentForCredit={salaryState.percentForCredit}
                                                percentForShares={salaryState.percentForShares}/>
                        </>
                        : null}</>
            }

        </>
    )
}