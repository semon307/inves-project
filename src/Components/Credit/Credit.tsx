import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/Store";
import Button from "../../Common/Button/Button";
import {CreditStateType, setCreditPayBack, setPercent, setSum, setYears} from "../../BLL/CreditReducer";
import {creditPayment} from "../../Functions/Functions";
import {Switcher} from "../../Common/Switcher/Switcher";
import {Time} from "../Time/Time";
import {SubCreditComponent} from "./SubCreditComponent/SubCreditComponent";
import s from "./../../Common/Styles/CommonStyles.module.css"

type CreditPropsType = {
    isSeperate: boolean
}

export const Credit = React.memo(({isSeperate}: CreditPropsType) => {
    const [isShown, setIsShown] = useState(false)
    const [showResult, setShowResult] = useState(false)
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
        onFuturePriceChange()
    }, [creditState.percent, creditState.years, creditState.sum])

    const onFuturePriceChange = () => {
        let percent = +creditState.percent / (100 * +creditState.percent);
        let months = +creditState.years * 12
        let creditPaidBack = creditPayment(+creditState.sum, percent, months) * months
        dispatch(setCreditPayBack(Math.round(creditPaidBack).toString()))
    }
    const onClickHandler = () => {
        setShowResult(true)
    }
    return (
        <>
            {isSeperate
                ? <><Time/>
                    <>
                        <SubCreditComponent onChangeTitleYears={onChangeTitleYears}
                                            onChangeTitleCreditSum={onChangeTitleCreditSum}
                                            onChangeTitlePercent={onChangeTitlePercent} years={years}
                                            sum={creditState.sum} percent={creditState.percent}/>
                        <div className={s.buttonDiv}>
                            <Button onClick={onClickHandler}>Calculate!</Button>
                        </div>
                        <div className={s.result}>
                            {showResult &&
                                <span>In {creditState.years} years you have to pay {creditState.creditPayBack} USD</span>}
                        </div>
                    </>
                </>
                : <><Switcher callBack={setIsShownCreditCallback} checked={isShown} title={"Do you have any loans?"}/>

                    {isShown ?
                        <>
                            <SubCreditComponent onChangeTitleYears={onChangeTitleYears}
                                                onChangeTitleCreditSum={onChangeTitleCreditSum}
                                                onChangeTitlePercent={onChangeTitlePercent} years={years}
                                                sum={creditState.sum} percent={creditState.percent}/>
                        </>
                        : null}</>}

        </>
    )
})