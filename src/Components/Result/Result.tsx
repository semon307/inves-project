import s from "./Result.module.css"
import {useSelector} from "react-redux";
import {AppStateType} from "../../BLL/Store";
import {CashStateType} from "../../BLL/CashReducer";
import {SubResult} from "./SubResult/SubResult";
import {RealEstateStateType} from "../../BLL/RealEstateReducer";
import {SharesStateType} from "../../BLL/SharesReducer";
import {currentPriceWholePortfolio, predictFutureSharesPrices} from "../../Functions/FunctionsForResult";
import {CreditStateType} from "../../BLL/CreditReducer";
import {creditPayment} from "../../Functions/Functions";
import {TimeStateType} from "../../BLL/TimeReducer";
export const Result = () => {
    const years = useSelector<AppStateType, string>(state => state.time.years)

    const cashState = useSelector<AppStateType, CashStateType>(state => state.cash)
    const {principalInvestment, amount} = cashState

    const realEstateState = useSelector<AppStateType, RealEstateStateType>(state => state.realEstate)
    const {futurePrice, currentPrice} = realEstateState

    const sharesState = useSelector<AppStateType, SharesStateType>(state => state.shares)
    const sharesCurrentPrice = Math.floor(currentPriceWholePortfolio(sharesState))
    const futurePortfolioPrice = sharesState.reduce((acc, el) => acc + +el.amount * predictFutureSharesPrices(el.pricesBefore), 0)

    const creditState = useSelector<AppStateType, CreditStateType>(state => state.credit)
    const creditInFuture = creditPayment(+creditState.sum, +creditState.percent / (100 * +creditState.percent), +creditState.years * 12)  * 12 * +years
    const creditSumToShow = creditInFuture < +creditState.creditPayBack ? +creditState.creditPayBack - creditInFuture : null
    // console.log()
    console.log(creditSumToShow)
    const totalCurrent = +principalInvestment + +currentPrice + sharesCurrentPrice - +creditState.creditPayBack
    const totalFuture = +amount + +futurePrice + futurePortfolioPrice - Number(creditSumToShow)
    return (
        <div>
            <div className={s.divTableBlock}>
                <div className={s.divTable}>
                    <div style={{display:'flex'}}>

                    </div>
                    <div className={s.divHeaderBlock}>

                    </div>
                    <div className={s.divTableRow}>
                        <div className={s.divTableCol}>Type of active</div>
                        <div className={s.divTableCol}>Current price</div>
                        <div className={s.divTableCol}>Possible future price</div>
                    </div>
                    {principalInvestment
                        ? <SubResult title={"Cash"} currentPrice={principalInvestment} futurePrice={amount}/>
                        :null}
                    {+futurePrice && futurePrice !== "NaN"
                    ? <SubResult title={"Real Estate"} currentPrice={currentPrice} futurePrice={futurePrice}/>
                    : null}
                    {sharesState.length > 0
                    ? <SubResult title={"Shares"} currentPrice={sharesCurrentPrice.toString()} futurePrice={futurePortfolioPrice.toString()}/>
                    : null}
                    {creditSumToShow
                    ? <SubResult title={"- Credit"} currentPrice={`-${creditState.creditPayBack}`} futurePrice={`-${Math.floor(creditSumToShow)}`}/>
                    : null}
                    {principalInvestment || +futurePrice && futurePrice !== "NaN" || sharesState.length > 0 || creditSumToShow
                        ? <SubResult title={"Total"} currentPrice={totalCurrent.toString()} futurePrice={Math.floor(totalFuture).toString()}/>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}