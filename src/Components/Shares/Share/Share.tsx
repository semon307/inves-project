import Button from "../../../Common/Button/Button";
import shareStyles from "../Shares.module.css";
import s from './../../Result/Result.module.css'
import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../BLL/Store";
import {RequestStatusType} from "../../../BLL/AppReducer";
import {AddShare} from "../AddShare/AddShare";
type SharePropsType = {
    id: string
    ticker: string
    buyPrice: string
    amount: string
    currentPrice: string
    onDeleteShare: (id: string) => void
}
export const Share = ({id, ticker, buyPrice, amount, currentPrice, onDeleteShare}: SharePropsType) => {
    const disabled = useSelector<AppStateType, RequestStatusType>(state => state.app.status) === "loading"

    return (
        <div>
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>{ticker}</div>
                <div className={s.divTableCol}>{buyPrice}</div>
                <div className={s.divTableCol}>{amount}</div>
                <div className={s.divTableCol}>{currentPrice}</div>
                <div className={s.divTableCol}>
                    <Button onClick={()=>{onDeleteShare(id)}} className={shareStyles.deleteButton}>Delete</Button>
                    <AddShare disable={false} title={"Edit"} shareId={id}/>
                </div>
            </div>
        </div>
    )
}