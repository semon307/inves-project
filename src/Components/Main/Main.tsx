import React, {useState} from "react";
import {Time} from "../Time/Time";
import {Shares} from "../Shares/Shares";
import {Credit} from "../Credit/Credit";
import {Cash} from "../Cash/Cash";
import {RealEstate} from "../RealEstate/RealEstate";
import {WithSwitcherRedirect} from "../../Common/HOC/WithSwitcherRedirect";
import {Loader} from "../../Common/Loader/Loader";
import {Salary} from "../Salary/Salary";
import Button from "../../Common/Button/Button";
import {Result} from "../Result/Result";
import s from "./Main.module.css"
import {Preface} from "../Preface/Preface";
export const Main = () => {


    return (
        <div className={s.main}>
            <Preface/>
            <Credit isSeperate={false}/>
            <Cash isSeperate={false}/>
            <Salary isSeperate={false}/>
            <RealEstate isSeperate={false}/>
            <Shares isSeperate={false}/>

             <Result/>
        </div>
    )
}