import React from "react";
import s from './../../Common/Styles/CommonStyles.module.css'
import style from "./Time.module.css"
import Input from "../../Common/Input/Input";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/Store";
import {setTime} from "../../BLL/TimeReducer";

type TimePropsType = {}
export const Time: React.FC<TimePropsType> = (props) => {
    const time = useSelector<AppStateType, string>(state => state.time.years);
    const dispatch = useDispatch();

    const onChangeTitle = (value: string) => {
        dispatch(setTime(value))
    }
    return (
            <div className={s.divTableRow}>
                <div className={s.divTableCol}>Enter the amount of years</div>
                <div className={s.divTableCol}><Input onChangeText={onChangeTitle} value={time}/></div>
        </div>
    )

}