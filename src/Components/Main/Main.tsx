import React from "react";
import {Time} from "../Time/Time";
import {Shares} from "../Shares/Shares";
import {Credit} from "../Credit/Credit";
import {Cash} from "../Cash/Cash";
import {RealEstate} from "../RealEstate/RealEstate";
import {WithSwitcherRedirect} from "../../Common/HOC/WithSwitcherRedirect";
import {Loader} from "../../Common/Loader/Loader";
import {Salary} from "../Salary/Salary";
export const Main = () => {
    return (
        <div>
            <Time/>
            {/*<WithSwitcherRedirect Credit isIndependent={false} />*/}
            <Credit isSeperate={false}/>
            <Cash isSeperate={false}/>
            <Salary isSeperate={false}/>
            <RealEstate isSeperate={false}/>
            <Shares isSeperate={false}/>
        </div>
    )
}