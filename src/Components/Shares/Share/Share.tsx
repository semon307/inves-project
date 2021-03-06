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
    disableDelete: boolean
}
export const Share = React.memo(({id, ticker, buyPrice, amount, currentPrice, onDeleteShare, disableDelete}: SharePropsType) => {
    return (
        <div>
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>{ticker}</div>
                <div className={s.divTableCol}>{buyPrice}</div>
                <div className={s.divTableCol}>{amount}</div>
                <div className={s.divTableCol}>{currentPrice}</div>
                <div className={s.divTableCol}>
                    <Button disabled={disableDelete} onClick={()=>{onDeleteShare(id)}} className={shareStyles.deleteButton}>Delete</Button>
                    <AddShare disable={false} title={"Edit"} shareId={id}/>
                </div>
            </div>
        </div>
    )
})