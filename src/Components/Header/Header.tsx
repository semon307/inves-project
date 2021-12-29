import React from "react";
import s from "./Header.module.css"
import {HeaderButton} from "../../Common/HeaderButton/HeaderButton";
import {PATH} from "../Routes/Routes";
export const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.forNav}>
         <HeaderButton title={"Cash"} route={PATH.CASH}/>
         <HeaderButton title={"Real estate"} route={PATH.REALESTATE}/>
         <HeaderButton title={"Loan"} route={PATH.LOAN}/>
         <HeaderButton title={"Salary"} route={PATH.SALARY}/>
         <HeaderButton title={"Stocks"} route={PATH.STOCKS}/>
         <HeaderButton title={"Salary"} route={PATH.SALARY}/>
            </div>
        </div>
    )
}