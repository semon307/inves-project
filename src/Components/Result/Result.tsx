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
    creditPayment,
    salaryToShares
} from "../../Functions/Functions";
import {TimeStateType} from "../../BLL/TimeReducer";
import {SalaryStateType} from "../../BLL/SalaryReducer";
import {ResultBar} from "./ResultDiagram/ResultBar";
import React, {useState} from "react";
import Button from "../../Common/Button/Button";

export const Result = () => {
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
    const sharesCurrentPrice = Math.floor(currentPriceWholePortfolio(sharesState))
    const futurePortfolioPrice = sharesState.reduce((acc, el) => acc + +el.amount * predictFutureSharesPrices(el.pricesBefore), 0)
    const creditState = useSelector<AppStateType, CreditStateType>(state => state.credit)
    const creditInFuture = creditPayment(+creditState.sum, +creditState.percent / (100 * +creditState.percent), +creditState.years * 12) * 12 * +years
    const creditSumToShow = creditInFuture < +creditState.creditPayBack ? +creditState.creditPayBack - creditInFuture : null
    //
    let cashFutureToShow = +amount;
    if (salaryInTimeStampsForCash) {
        cashFutureToShow = Math.floor(cashFutureToShow + salaryInTimeStampsForCash[salaryInTimeStampsForCash.length - 1])
    }
    let sharesFutureToShow = +futurePortfolioPrice
    if (salaryInTimeStampsForShares) {
        sharesFutureToShow = Math.floor(sharesFutureToShow + salaryInTimeStampsForShares[salaryInTimeStampsForShares.length - 1])
    }
    //
    const totalCurrent = (+principalInvestment || 0) + (+currentPrice || 0) + (+sharesCurrentPrice || 0) - (+creditState.creditPayBack || 0)
    const totalFuture = cashFutureToShow + +futurePrice + sharesFutureToShow - Number(creditSumToShow)

    const currentYear = new Date().getFullYear()

    const futureYear = +currentYear + +timeState.years

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
}