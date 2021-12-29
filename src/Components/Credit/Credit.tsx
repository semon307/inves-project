import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/Store";
import Input from "../../Common/Input/Input";
import Button from "../../Common/Button/Button";
import {CreditStateType, setCreditPayBack, setPercent, setSum, setYears} from "../../BLL/CreditReducer";
import {creditPayment} from "../../Functions/Functions";
import {Switcher} from "../../Common/Switcher/Switcher";
import {Time} from "../Time/Time";

type CreditPropsType = {
    isSeperate: boolean
}

export const Credit = React.memo(({isSeperate}: CreditPropsType) => {
    const [isShown, setIsShown] = useState(false)
    const setIsShownCreditCallback = useCallback(() => {
        setIsShown(!isShown)
    }, [isShown])
    const creditState = useSelector<AppStateType, CreditStateType>((state) => state.credit);
    const years = useSelector<AppStateType, string>(state => state.credit.years)
    const dispatch = useDispatch();
    const onChangeTitleYears = (value: string) => {
        dispatch(setYears(value))
    }
    const onChangeTitleCreditSum = useCallback((value: string) => {
        dispatch(setSum(value))
    }, [])
    const onChangeTitlePercent = (value: string) => {
        dispatch(setPercent(value))
    }

    useEffect(() => {
        onClickHandler()
    }, [creditState.percent, creditState.years, creditState.sum])

    const onClickHandler = () => {
        let percent = +creditState.percent / (100 * +creditState.percent);
        let months = +creditState.years * 12
        let creditPaidBack = creditPayment(+creditState.sum, percent, months) * months
        dispatch(setCreditPayBack(Math.round(creditPaidBack).toString()))
    }
    return (
        <div>
            {isSeperate
                ? <><Time/>
                    <>
                        <div>
                            <span>Loan time, years:</span>
                            <Input onChangeText={onChangeTitleYears} value={years}/>
                        </div>
                        <div>
                            <span>Loan amount</span>
                            <Input onChangeText={onChangeTitleCreditSum} value={creditState.sum}/>
                        </div>
                        <div>
                            <span>%, (per year)</span>
                            <Input onChangeText={onChangeTitlePercent} value={creditState.percent}/>
                        </div>

                        <div>
                            <Button onClick={onClickHandler}>Calculate!</Button>
                        </div>
                        <div>
                            {creditState.creditPayBack ?
                                <span>In {creditState.years} years you have to pay {creditState.creditPayBack} USD</span> : null}
                        </div>
                    </>
                </>
                : <><Switcher callBack={setIsShownCreditCallback} checked={isShown} title={"Do you have any loans?"}/>

                    {isShown ?
                        <>
                            <div>
                                <span>Loan time, years:</span>
                                <Input onChangeText={onChangeTitleYears} value={years}/>
                                {/*<input onChange={e => {onChangeTitleYears(e.currentTarget.value)}} value={years}/>*/}
                            </div>
                            <div>
                                <span>Loan amount</span>
                                <Input onChangeText={onChangeTitleCreditSum} value={creditState.sum}/>
                            </div>
                            <div>
                                <span>%, (per year)</span>
                                <Input onChangeText={onChangeTitlePercent} value={creditState.percent}/>
                            </div>
                        </>
                        : null}</>}

        </div>
    )
})