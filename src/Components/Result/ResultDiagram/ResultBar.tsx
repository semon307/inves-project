import React from "react";
import {Chart} from "react-google-charts";
import s from "./ResultBar.module.css"
type ResultBarPropsType = {
    currentYear: string
    futureYear: string
    totalNow: number
    totalFuture: number
}
export const ResultBar = ({currentYear, futureYear, totalNow, totalFuture}: ResultBarPropsType) => {
    const data = [
        ["Year", "Estate"],
        [currentYear, totalNow],
        [futureYear, totalFuture],

    ];

    const options = {
        chart: {
            title: "Overview",
        },
    };
    return (
        <div>
            <Chart
                chartType="Bar"
                // width="100%"
                // height="400px"
                className={s.chart}
                data={data}
                options={options}
            />
        </div>
    )
}