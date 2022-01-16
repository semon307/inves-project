import {Navigate, Route, Routes} from "react-router-dom";

import {Cash} from "../Cash/Cash";
import {RealEstate} from "../RealEstate/RealEstate";
import {Credit} from "../Credit/Credit";
import {Shares} from "../Shares/Shares";
import {Main} from "../Main/Main";
import {Salary} from "../Salary/Salary";
import React from "react";
export const PATH = {
    CASH: '/cash',
    REALESTATE: '/realestate',
    LOAN: '/loan',
    SALARY: '/salary',
    STOCKS: '/stocks',
}

export const RoutesBlock = React.memo(() => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={PATH.CASH} element={<Cash isSeperate={true}/>}/>
                <Route path={PATH.REALESTATE} element={<RealEstate isSeperate={true}/>}/>
                <Route path={PATH.LOAN} element={<Credit isSeperate={true}/>}/>
                <Route path={PATH.SALARY} element={<Salary isSeperate={true}/>}/>
                <Route path={PATH.STOCKS} element={<Shares isSeperate={true}/>}/>

                {/*<Route path={PATH.TESTPAGE} element={<Test/>}/>*/}
                {/*<Route path={'*'} element={<Error404/>}/>*/}
            </Routes>
        </div>
    )
})