import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/Store";
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
import {Time} from "../Time/Time";
import {SubRealEstateComponent} from "./SubRealEstateComponent/SubRealEstateComponent";
import s from "./../../Common/Styles/CommonStyles.module.css"
type RealEstatePropsType = {
    isSeperate: boolean
}
export const RealEstate = ({isSeperate}: RealEstatePropsType) => {
    const [isShown, setIsShown] = useState(false)
    const [showResult, setShowResult] = useState(false)
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
        setShowResult(true)
    }
    useEffect(() => {
        let futureCash = compoundInterest(+realEstateState.currentPrice, +realEstateState.priceChangeLastYears, 1, +time.years)
        dispatch(setFuturePrice(Math.round(futureCash).toString()))
    }, [realEstateState.currentPrice, realEstateState.priceChangeLastYears, time.years])
    return (
        <>
            {isSeperate
                ? <><Time/>
                    <div className={s.mainDivComponent}>
                        <SubRealEstateComponent onChangeTitleCurrentPrice={onChangeTitleCurrentPrice}
                                                onChangeTitlePriceChange={onChangeTitlePriceChange}
                                                currentPrice={realEstateState.currentPrice}
                                                priceChangeLastYears={realEstateState.priceChangeLastYears}/>
                        <div className={s.buttonDiv}>
                            <Button onClick={onClickHandler}>Calculate!</Button>
                        </div>
                        <div className={s.result}>
                            {showResult &&
                                <span>In {time.years} your real estate will cost {realEstateState.futurePrice} USD</span>}
                        </div>
                    </div>
                </>
                : <><Switcher callBack={setIsShownEstateCallback} checked={isShown}
                              title={"Do you have any real estate objects?"}/>
                    {isShown
                        ?
                        <>
                            <SubRealEstateComponent onChangeTitleCurrentPrice={onChangeTitleCurrentPrice}
                                                    onChangeTitlePriceChange={onChangeTitlePriceChange}
                                                    currentPrice={realEstateState.currentPrice}
                                                    priceChangeLastYears={realEstateState.priceChangeLastYears}/>
                        </>
                        : null}</>}

        </>
    )
}