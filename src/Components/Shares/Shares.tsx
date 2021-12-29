import React, {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/Store";
import {Switcher} from "../../Common/Switcher/Switcher";

import {
    addShare,
    deleteShare, getCurrentPriceTC, setPricesBeforeTC,
    SharesStateType,
    updateAmount,
    updateBuyPrice,
    updateTicker
} from "../../BLL/SharesReducer";
import Button from "../../Common/Button/Button";

import {setTimeStampsTC} from "../../BLL/TimeReducer";
import {Share} from "./Share/Share";

import {Time} from "../Time/Time";


type SharesPropsType = {
    isSeperate: boolean
}
export const Shares = ({isSeperate}: SharesPropsType) => {
    const [isShown, setIsShown] = useState(false)
    const setIsShownEstateCallback = useCallback(() => {
        setIsShown(!isShown)
    }, [isShown])
    const years = useSelector<AppStateType, string>(state => state.time.years)
    const timeStamps = useSelector<AppStateType, Array<number>>(state => state.time.timeStamps)
    const sharesState = useSelector<AppStateType, SharesStateType>((state) => state.shares);
    const dispatch = useDispatch();
    const setCurrentPrice = (id: string, ticker: string) => {
        dispatch(getCurrentPriceTC(id, ticker.toUpperCase()));
        if (timeStamps.length === 0){
            dispatch(setTimeStampsTC(ticker, years))
        }
        dispatch(setPricesBeforeTC(id, ticker, years))
    }
    const onAddShare = () => {
        dispatch(addShare())

    }
    const onDeletShare = (id: string) => {
        dispatch(deleteShare(id))
    }
    const onTickerChange = (id: string, value: string) => {
        dispatch(updateTicker(id, value))
    }
    const onBuyPriceChange = (id: string, value: string) => {
        dispatch(updateBuyPrice(id, value))
    }
    const onAmountChange = (id: string, value: string) => {
        dispatch(updateAmount(id, value))
    }
    const sharesInputsToShow = sharesState.map((share) => {
        return (
            <Share
                id={share.id} ticker={share.ticker} buyPrice={share.buyPrice}
                amount={share.amount} onTickerChange={onTickerChange}
                onBuyPriceChange={onBuyPriceChange} onAmountChange={onAmountChange}
                setCurrentPrice={setCurrentPrice} onDeleteShare={onDeletShare}
            />
        )

    })
    const sharesToShow = sharesState.map(share => {
        return (
            <div>
                <span>Share: {share.ticker} market price: {+share.currentPrice}</span>
            </div>
        )
    })
    return (
        <div>
            {isSeperate
            ? <><Time/>
                    <>
                        {sharesInputsToShow}
                        <Button onClick={onAddShare}>Add more shares</Button>
                        <div>
                            {sharesState[0].amount
                                ? <div>currently you have following shares:
                                    {sharesToShow}
                                </div>
                                : null
                            }

                        </div>
                    </>
                </>
            : <><Switcher callBack={setIsShownEstateCallback} checked={isShown} title={"Do you have any shares / funds?"}/>
                    {isShown ?
                        <>
                            {sharesInputsToShow}
                            <Button onClick={onAddShare}>Add more shares</Button>
                            <div>
                                {sharesState[0].amount
                                    ? <div>currently you have following shares:
                                        {sharesToShow}
                                    </div>
                                    : null
                                }

                            </div>
                        </>
                        : null}</>}



        </div>
    )
}