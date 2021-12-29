import React from "react";
import s from './Time.module.css'
import Input from "../../Common/Input/Input";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../BLL/Store";
import {setTime} from "../../BLL/TimeReducer";
import Button from "../../Common/Button/Button";
type TimePropsType = {}
export const Time: React.FC<TimePropsType>=(props) => {
    const time = useSelector<AppStateType, string>(state => state.time.years);
    const dispatch = useDispatch();

    const onChangeTitle = (value: string) => {
        dispatch(setTime(value ))
    }
    return (
        <>
            <span>Enter the amount of years</span>
            <Input
                onChangeText={onChangeTitle}
                value={time}
            />
        </>
    )

}