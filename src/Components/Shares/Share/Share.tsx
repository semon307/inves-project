import Input from "../../../Common/Input/Input";
import Button from "../../../Common/Button/Button";
import s from "../Shares.module.css";
import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../BLL/Store";
import {RequestStatusType} from "../../../BLL/AppReducer";
type SharePropsType = {
    id: string
    ticker: string
    buyPrice: string
    amount: string
    onTickerChange: (id: string, value: string) => void
    onBuyPriceChange: (id: string, value: string) => void
    onAmountChange: (id: string, value: string) => void
    setCurrentPrice: (id: string, ticker: string) => void
    onDeleteShare: (id: string) => void
}
export const Share = ({id, ticker, buyPrice, amount, onTickerChange, onBuyPriceChange, onAmountChange, setCurrentPrice, onDeleteShare}: SharePropsType) => {
    const disabled = useSelector<AppStateType, RequestStatusType>(state => state.app.status) === "loading"

    return (
        <div key={id}>
            <span>Ticker: <Input id={id} onChangeWithId={onTickerChange} value={ticker} type={"text"} placeholder={"AAPL"}/></span>
            <span>Buy Price: <Input id={id} onChangeWithId={onBuyPriceChange} value={buyPrice} placeholder={"60"}/></span>
            <span>Amount: <Input id={id} onChangeWithId={onAmountChange} value={amount} placeholder={"20"}/></span>
            <span><Button disabled={disabled} onClick={() => {setCurrentPrice(id, ticker)}} className={s.button}>+</Button></span>
            <span><Button onClick={()=>{onDeleteShare(id)}} className={s.deleteButton}>Delete</Button></span>
        </div>
    )
}