import React from "react";
import s from './HeaderButton.module.css';
import {NavLink} from "react-router-dom";
type HeaderButtonPropsType = {
    title: string
    route: string
}
export const HeaderButton = React.memo(({title, route}: HeaderButtonPropsType) => {

    return (
        <div className={s.nav}>

            <div className={s.navLink}><NavLink to={route}>{title}</NavLink></div>
        </div>
    )
})