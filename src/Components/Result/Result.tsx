import s from "./Result.module.css"
import {useSelector} from "react-redux";
import {AppStateType} from "../../BLL/Store";
import {CashStateType} from "../../BLL/CashReducer";
import {SubResult} from "./SubResult/SubResult";
import {RealEstateStateType} from "../../BLL/RealEstateReducer";
import {SharesStateType} from "../../BLL/SharesReducer";
import {currentPriceWholePortfolio, predictFutureSharesPrices} from "../../Functions/FunctionsForResult";
import {CreditStateType} from "../../BLL/CreditReducer";
import {
    cashPastToTimeStamps,
    creditPayment, dataFromState, predictFuture,
    salaryToShares
} from "../../Functions/Functions";
import {TimeStateType} from "../../BLL/TimeReducer";
import {SalaryStateType} from "../../BLL/SalaryReducer";
import {ResultBar} from "./ResultDiagram/ResultBar";
import React, {useMemo, useState} from "react";
import Button from "../../Common/Button/Button";

export const Result = React.memo(() => {
    const years = useSelector<AppStateType, string>(state => state.time.years)

    const cashState = useSelector<AppStateType, CashStateType>(state => state.cash)
    const {principalInvestment, amount} = cashState

    const timeState = useSelector<AppStateType, TimeStateType>(state => state.time)
    const salaryState = useSelector<AppStateType, SalaryStateType>(state => state.salary)
    let salaryInTimeStampsForCash
    if (salaryState.yearlyIncome && salaryState.percentForCash) {
        salaryInTimeStampsForCash = salaryToShares(+salaryState.yearlyIncome, +salaryState.percentGrowth, +salaryState.percentForCash, timeState.timeStamps.length, +timeState.years)
    }


    let salaryInTimeStampsForShares
    if (salaryState.yearlyIncome && salaryState.percentForShares) {
        salaryInTimeStampsForShares = salaryToShares(+salaryState.yearlyIncome, +salaryState.percentGrowth, +salaryState.percentForShares, timeState.timeStamps.length, +timeState.years)
    }
    const realEstateState = useSelector<AppStateType, RealEstateStateType>(state => state.realEstate)
    const {futurePrice, currentPrice} = realEstateState

    const sharesState = useSelector<AppStateType, SharesStateType>(state => state.shares)
    const sharesCurrentPrice = useMemo(() => Math.floor(currentPriceWholePortfolio(sharesState)), [sharesState])
    //const futurePortfolioPrice = sharesState.reduce((acc, el) => acc + +el.amount * predictFutureSharesPrices(el.pricesBefore), 0)
    const preFuturePortfolioPrice = dataFromState(sharesState, timeState.timeStamps.length)
    const futurePortfolioPrice = predictFuture(preFuturePortfolioPrice)[predictFuture(preFuturePortfolioPrice).length - 1]
    const creditState = useSelector<AppStateType, CreditStateType>(state => state.credit)
    const creditInFuture = useMemo(() => creditPayment(+creditState.sum, +creditState.percent / (100 * +creditState.percent), +creditState.years * 12) * 12 * +years,
        [creditState.sum, creditState.percent, creditState.years])
    const creditSumToShow = creditInFuture < +creditState.creditPayBack ? +creditState.creditPayBack - creditInFuture : null
    //
    let cashFutureToShow = +amount;
    if (salaryInTimeStampsForCash) {
        cashFutureToShow = Math.floor(cashFutureToShow + salaryInTimeStampsForCash[salaryInTimeStampsForCash.length - 1])
    }
    let sharesFutureToShow = Math.floor(+futurePortfolioPrice)
    const totalCurrent = useMemo(() => (+principalInvestment || 0) + (+currentPrice || 0) + (+sharesCurrentPrice || 0) - (+creditState.creditPayBack || 0),
        [principalInvestment, currentPrice, sharesCurrentPrice, creditState.creditPayBack])
    const totalFuture = useMemo(() => cashFutureToShow + +futurePrice + sharesFutureToShow - Number(creditSumToShow), [cashFutureToShow, futurePrice, sharesFutureToShow, creditSumToShow])

    const currentYear = new Date().getFullYear()

    const futureYear = useMemo(() => +currentYear + +timeState.years, [currentYear, timeState.years])

    const [isResultShown, setIsResultShown] = useState(false)
    const onSetIsResultShown = () => {
        setIsResultShown(!isResultShown)
    }
    return (
        <div>
            <div className={s.resultButton} onClick={onSetIsResultShown}>Show results:</div>
            {isResultShown &&
            <div className={s.divTableBlock}>
                <div className={s.divTable}>
                    <div style={{display: 'flex'}}>

                    </div>
                    <div className={s.divHeaderBlock}>

                    </div>
                    <div className={s.divTableRow}>
                        <div className={s.divTableCol1}>Type of active</div>
                        <div className={s.divTableCol1}>Current price</div>
                        <div className={s.divTableCol1}>Possible future price</div>
                    </div>
                    {principalInvestment
                        ? <SubResult title={"Cash"} currentPrice={principalInvestment}
                                     futurePrice={cashFutureToShow.toString()}/>
                        : null}
                    {+futurePrice && futurePrice !== "NaN"
                        ? <SubResult title={"Real Estate"} currentPrice={currentPrice} futurePrice={futurePrice}/>
                        : null}
                    {sharesState.length > 0
                        ? <SubResult title={"Shares"} currentPrice={sharesCurrentPrice.toString()}
                                     futurePrice={sharesFutureToShow.toString()}/>
                        : null}
                    {creditSumToShow
                        ? <SubResult title={"- Credit"} currentPrice={`-${creditState.creditPayBack}`}
                                     futurePrice={`-${Math.floor(creditSumToShow)}`}/>
                        : null}
                    {principalInvestment || +futurePrice && futurePrice !== "NaN" || sharesState.length > 0 || creditSumToShow
                        ? <SubResult title={"Total"} currentPrice={totalCurrent.toString()}
                                     futurePrice={Math.floor(totalFuture).toString()}/>
                        : null
                    }
                    <ResultBar currentYear={currentYear.toString()}
                               futureYear={futureYear.toString()}
                               totalNow={totalCurrent}
                               totalFuture={Math.floor(totalFuture)}/>
                </div>
            </div>}
        </div>
    )
})