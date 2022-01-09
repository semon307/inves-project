import React from "react";
import s from "./Header.module.css"
import {HeaderButton} from "../../Common/HeaderButton/HeaderButton";
import {PATH} from "../Routes/Routes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.icon}><NavLink to={"/"}><FontAwesomeIcon className={s.fontAwesome}
                                                                       icon={faHome}/></NavLink></div>
            <div className={s.forNav}>
                <HeaderButton title={"Cash"} route={PATH.CASH}/>
                <HeaderButton title={"Real estate"} route={PATH.REALESTATE}/>
                <HeaderButton title={"Loan"} route={PATH.LOAN}/>
                <HeaderButton title={"Stocks"} route={PATH.STOCKS}/>
                <HeaderButton title={"Salary"} route={PATH.SALARY}/>
            </div>
        </div>
    )
}