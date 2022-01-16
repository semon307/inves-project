import React, {useCallback, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/Store";
import {Switcher} from "../../Common/Switcher/Switcher";
import {
    deleteShare,
    SharesStateType,
} from "../../BLL/SharesReducer";
import Button from "../../Common/Button/Button";
import style from "./Shares.module.css"
import {Share} from "./Share/Share";
import {Time} from "../Time/Time";
import {LineChart} from "./Chart/Chart";
import {AddShare} from "./AddShare/AddShare";
import s from "../Result/Result.module.css";


type SharesPropsType = {
    isSeperate: boolean
}
export const Shares = React.memo(({isSeperate}: SharesPropsType) => {
    const [isShown, setIsShown] = useState(false)

    const [isChartShown, setIsChartShown] = useState(false)
    const setChart = () => {
        setIsChartShown(!isChartShown)
    }

    const setIsShownEstateCallback = useCallback(() => {
        setIsShown(!isShown)
    }, [isShown])
    const sharesState = useSelector<AppStateType, SharesStateType>((state) => state.shares);
    const disableDelete = sharesState.length === 1;
    const dispatch = useDispatch();
    const onDeletShare = useCallback((id: string) => {
        dispatch(deleteShare(id))
    }, [dispatch])
    const sharesInputsToShow = useMemo(() => sharesState.map((share) => {
        return (
            <Share
                id={share.id} ticker={share.ticker} buyPrice={share.buyPrice}
                currentPrice={share.currentPrice}
                amount={share.amount}
                onDeleteShare={onDeletShare}
                disableDelete={disableDelete}
            />
        )

    }), [sharesState])
    return (
        <div className={s.mainDivComponent}>
            {isSeperate
                ? <><Time/>
                    <div className={style.main}>
                        <div className={s.divTableBlock}>
                        <div className={s.divTable}>
                            <div style={{display: 'flex'}}>

                            </div>
                            <div className={s.divHeaderBlock}>

                            </div>
                            <div className={s.divTableRow}>
                                <div className={s.divTableCol}>Ticker</div>
                                <div className={s.divTableCol}>Buy price</div>
                                <div className={s.divTableCol}>Amount</div>
                                <div className={s.divTableCol}>Current Price</div>
                                <div className={s.divTableCol}>Actions</div>
                            </div>

                        </div>
                    </div>
                        {sharesInputsToShow}
                        <AddShare title={"Add share"} disable={false}/>
                        <Button onClick={setChart}>+linechart</Button>
                    </div>
                    {isChartShown && <LineChart/>}
                </>
                : <div className={s.mainDivComponent}><Switcher callBack={setIsShownEstateCallback} checked={isShown}
                              title={"Do you have any shares / funds?"}/>
                    {isShown ?
                        <div className={style.main}><div className={s.divTableBlock}>
                            <div className={s.divTable}>
                                <div style={{display: 'flex'}}>

                                </div>
                                <div className={s.divHeaderBlock}>

                                </div>
                                <div className={s.divTableRow}>
                                    <div className={s.divTableCol}>Ticker</div>
                                    <div className={s.divTableCol}>Buy price</div>
                                    <div className={s.divTableCol}>Amount</div>
                                    <div className={s.divTableCol}>Current Price</div>
                                    <div className={s.divTableCol}>Actions</div>
                                </div>

                            </div>
                        </div>
                            {sharesInputsToShow}
                            <AddShare title={"Add share"} disable={false}/>
                            <Button onClick={setChart}>+linechart</Button>
                        </div>
                        : null}
                    {isChartShown && <LineChart/>}
                </div>}


        </div>
    )
})