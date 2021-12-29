import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/Store";
import Input from "../../Common/Input/Input";
import {compoundInterest} from "../../Functions/Functions";
import {TimeStateType} from "../../BLL/TimeReducer";
import Button from "../../Common/Button/Button";
import {
    RealEstateStateType,
    setCurrentPrice,
    setFuturePrice,
    setPriceChangeLastYears
} from "../../BLL/RealEstateReducer";
import {Switcher} from "../../Common/Switcher/Switcher";
import {getChart, getFinanceData} from "../../DAL/FinanceAPI";
import {Time} from "../Time/Time";

type RealEstatePropsType = {
    isSeperate: boolean
}
export const RealEstate = ({isSeperate}: RealEstatePropsType) => {
    const [isShown, setIsShown] = useState(false)
    const setIsShownEstateCallback = useCallback(() => {
        setIsShown(!isShown)
    }, [isShown])
    const time = useSelector<AppStateType, TimeStateType>((state) => state.time)
    const realEstateState = useSelector<AppStateType, RealEstateStateType>((state) => state.realEstate);
    const dispatch = useDispatch();
    const onChangeTitleCurrentPrice = (value: string) => {
        dispatch(setCurrentPrice(value))
    }
    const onChangeTitlePriceChange = (value: string) => {
        dispatch(setPriceChangeLastYears(value))
    }

    const onClickHandler = () => {
        let futureCash = compoundInterest(+realEstateState.currentPrice, +realEstateState.priceChangeLastYears, 1, +time.years)
        dispatch(setFuturePrice(Math.round(futureCash).toString()))
    }
useEffect(()=> {
    onClickHandler()
},[realEstateState.currentPrice, realEstateState.priceChangeLastYears, time.years])
    return (
        <div>
            {isSeperate
                ? <><Time/>
                    <>
                        <div>
                            <span>Current price of your real estate, USD:</span>
                            <Input onChangeText={onChangeTitleCurrentPrice} value={realEstateState.currentPrice}/>
                        </div>
                        <div>
                            <span>How many percent did the price for your real estate changed during last years</span>
                            <Input onChangeText={onChangeTitlePriceChange} value={realEstateState.priceChangeLastYears}/>
                        </div>

                        <div>
                            <Button onClick={onClickHandler}>Calculate!</Button>
                        </div>
                        <div>
                            {realEstateState.futurePrice ?
                                <span>In {time.years} your real estate will cost {realEstateState.futurePrice} USD</span> : null}
                        </div>
                    </>
                </>
                : <><Switcher callBack={setIsShownEstateCallback} checked={isShown}
                              title={"Do you have any real estate objects?"}/>
                    {isShown
                        ?
                        <>
                            <div>
                                <span>Current price of your real estate, USD:</span>
                                <Input onChangeText={onChangeTitleCurrentPrice} value={realEstateState.currentPrice}/>
                            </div>
                            <div>
                                <span>How many percent did the price for your real estate changed during last years</span>
                                <Input onChangeText={onChangeTitlePriceChange} value={realEstateState.priceChangeLastYears}/>
                            </div>
                        </>
                        : null}</>}

        </div>
    )
}