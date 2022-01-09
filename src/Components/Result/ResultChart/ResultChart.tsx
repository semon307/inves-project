import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../BLL/Store";
import {
    compileArrays,
    compileDataColor,
    compileDataNull,
    dataFromState,
    predictFuture,

} from "../../../Functions/Functions";
import {SharesStateType} from "../../../BLL/SharesReducer";
import {Chart} from "react-google-charts";
type ResultChartType = {
    salaryInTimeStampsForCash?: Array<number>
    salaryInTimeStampsForShares?: Array<number>
    cashPastInTimeStamps?: Array<number>
    realEstateInTimeStampsPast?: Array<number>
    realEstateInTimeStampsFuture?: Array<number>
}
export const ResultChart = ({
                                salaryInTimeStampsForCash,
                                salaryInTimeStampsForShares,
                                cashPastInTimeStamps,
                                realEstateInTimeStampsPast,
                                realEstateInTimeStampsFuture
                            }: ResultChartType) => {

    const shareState = useSelector<AppStateType, SharesStateType>(state => state.shares);

    const timeStamps = useSelector<AppStateType, Array<number>>(state => state.time.timeStamps)

    let data = dataFromState(shareState, timeStamps.length)

    if (cashPastInTimeStamps) {
        data = compileArrays([data, cashPastInTimeStamps])
    }
    if(realEstateInTimeStampsPast){
        data = compileArrays([data, realEstateInTimeStampsPast])
    }

    const timeStampsForRender = timeStamps
        .map(el => {
            let date = new Date(el * 1000);
            return `${date.getDay() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`
        })
    const futureTimeStamps = predictFuture(timeStamps)
        .map(el => {
            let date = new Date(el * 1000);
            return `${date.getDay() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`
        })
    let futurePrices = predictFuture(data)
    if (salaryInTimeStampsForCash) {
        // console.log(salaryInTimeStampsForCash[salaryInTimeStampsForCash.length - 1])
        futurePrices = compileArrays([futurePrices, salaryInTimeStampsForCash])
    }
    if (salaryInTimeStampsForShares) {
        console.log(salaryInTimeStampsForShares[salaryInTimeStampsForShares.length - 1])
        futurePrices = compileArrays([futurePrices, salaryInTimeStampsForShares])
    }
    // if(realEstateInTimeStampsFuture){
    //     futurePrices = compileArrays([futurePrices, realEstateInTimeStampsFuture])
    // }

    const dataWithNull = compileDataNull(timeStampsForRender, data)
    const dataWithColor = compileDataColor(futureTimeStamps, futurePrices)
    const dataWihtNullAndColor = [
        ['Year', {role: 'annotation', type: 'string'}, 'Value', {role: 'style', type: 'string'}],
        ...dataWithNull,
        [timeStampsForRender[timeStampsForRender.length - 1], 'Today', data[data.length - 1], null],
        ...dataWithColor]


    return (
        <div>
            <Chart
                width={'600px'}
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={dataWihtNullAndColor}
                options={{
                    hAxis: {
                        title: 'Time',
                    },
                    vAxis: {
                        title: 'Active',
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