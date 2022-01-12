import React, {useRef} from "react";
import {Chart} from "react-google-charts";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../BLL/Store";
import {SharesStateType, SharesType} from "../../../BLL/SharesReducer";
import {
    compileDataColor,
    compileDataNull, dataFromState,
    predictFuture, salaryToShares
} from "../../../Functions/Functions";
import s from "./Chart.module.css"
import {SalaryStateType} from "../../../BLL/SalaryReducer";
import {TimeStateType} from "../../../BLL/TimeReducer";


export const LineChart = () => {
    const shareState = useSelector<AppStateType, SharesStateType>(state => state.shares);
    // const data = shareState[0].pricesBefore.filter((el, i) => i % 3 === 0);

    const timeStamps = useSelector<AppStateType, Array<number>>(state => state.time.timeStamps)
        //.filter((el, i) => i % 15 === 0)
    const data = dataFromState(shareState, timeStamps.length)
        .filter((el, i) => i % 3 === 0);
    const timeStampsForRender = timeStamps
        .filter((el, i) => i % 3 === 0)
        .map(el => {
            let date = new Date(el * 1000);
            return `${date.getDay() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`
        })
    const futureTimeStamps = predictFuture(timeStamps)
        .filter((el, i) => i % 3 === 0)
        .map(el => {
            let date = new Date(el * 1000);
            return `${date.getDay() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`
        })
    const futurePrices = predictFuture(data)
    const dataWithNull = compileDataNull(timeStampsForRender, data)
    const dataWithColor = compileDataColor(futureTimeStamps, futurePrices)
    const dataWihtNullAndColor = [
        ['Year', {role: 'annotation', type: 'string'}, 'Value', {role: 'style', type: 'string'}],
        ...dataWithNull,
        [timeStampsForRender[timeStampsForRender.length - 1], 'Today', data[data.length - 1], null],
        ...dataWithColor]




    return (
        <div className={s.mainChart}>
            <Chart
                // width={'600px'}
                // height={'400px'}
                className={s.chart}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={dataWihtNullAndColor}
                options={{
                    hAxis: {
                        title: 'Time',
                    },
                    vAxis: {
                        title: 'Price',
                    },
                    annotations: {
                        stem: {
                            color: '#097138'
                        },
                        style: 'line'
                    },
                    legend: 'none',
                    chartArea: {
                        top: 5,
                        width: "80%",
                        height: "80%"
                    }
                }}
            />
        </div>
    )
}
