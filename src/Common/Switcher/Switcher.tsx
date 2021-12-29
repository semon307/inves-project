import React from "react";
import s from "./Switcher.module.css"
import {v1} from "uuid";

type SwitcherPropsType = {
    callBack: () => void
    checked: boolean
    title: string
}
export const Switcher: React.FC<SwitcherPropsType> = ({callBack, title, checked}) => {
    const id = v1()
    return (
        <div className={s.main}>
            <div>{title}</div>
            <div>
                <input id={id} type={"checkbox"} onChange={callBack} checked={checked} className={s.iosToggle}/>
                <label htmlFor={id} className={s.checkboxLabel} data-off="off" data-on="on"></label>
            </div>
        </div>
    )
}