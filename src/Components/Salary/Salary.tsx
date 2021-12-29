import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/Store";
import {TimeStateType} from "../../BLL/TimeReducer";

import {compoundInterest} from "../../Functions/Functions";
import Input from "../../Common/Input/Input";
import Button from "../../Common/Button/Button";
import {Time} from "../Time/Time";
import {Switcher} from "../../Common/Switcher/Switcher";
import {SalaryStateType, setAmount, setPercentGrowth, setYearlyIncome} from "../../BLL/SalaryReducer";
type SalaryPropsType = {
    isSeperate: boolean
}
export const Salary = ({isSeperate}: SalaryPropsType) => {
    const [isShown, setIsShown] = useState(false)
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


    const onClickHandler = () => {
        let futureSalary = compoundInterest(+salaryState.yearlyIncome, +salaryState.percentGrowth, 1, +time.years)
        const newFutureSalary = Math.round(futureSalary)
        dispatch(setAmount(newFutureSalary.toString()))
    }
    return (
        <div>
            {isSeperate
                ? <><Time/>
                    <>
                        <div>
                            <span>Your current yearly salary income, USD:</span>
                            <Input onChangeText={onChangeTitleCurrentSalary} value={salaryState.yearlyIncome}/>
                        </div>
                        <div>
                            <span>Percentage growth (last year): </span>
                            <Input onChangeText={onChangeTitlePercentGrowth} value={salaryState.percentGrowth}/>
                        </div>
                        <div>
                            <Button onClick={onClickHandler}>Calculate!</Button>
                        </div>
                        <div>
                            {salaryState.amount ?
                                <span>In {time.years} years your current cash deposit will become {salaryState.amount} USD</span> : null}
                        </div>
                    </>
                </>
                : <><Switcher callBack={setIsShownCallback} checked={isShown} title={"Do you have salary income?"}/>
                    {isShown ?
                        <>
                            <div>
                                <span>Your current yearly salary income, USD:</span>
                                <Input onChangeText={onChangeTitleCurrentSalary} value={salaryState.yearlyIncome}/>
                            </div>
                            <div>
                                <span>Percentage growth (last year): </span>
                                <Input onChangeText={onChangeTitlePercentGrowth} value={salaryState.percentGrowth}/>
                            </div>
                            <div>
                                {salaryState.amount ?
                                    <span>In {time.years} years your current cash deposit will become {salaryState.amount} USD</span> : null}
                            </div>
                        </>
                        : null}</>
            }

        </div>
    )
}