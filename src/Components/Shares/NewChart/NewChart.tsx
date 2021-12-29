import React, {useRef} from "react";
import {Chart} from "react-google-charts";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../BLL/Store";
import {SharesType} from "../../../BLL/SharesReducer";
import {
    compileData, compileDataColor,
    compileDataNull,
    compileDataTriple,
    makeEmptyArray,
    predictFuture
} from "../../../Functions/Functions";

    type NewChartPropsType = {
    data: Array<number>
}
export const NewChart = () => {
    const share = useSelector<AppStateType, SharesType>(state => state.shares[0]);
    const data = share.pricesBefore.filter((el, i) => i % 15 === 0);
    const timeStamps = useSelector<AppStateType, Array<number>>(state => state.time.timeStamps)
        .filter((el, i) => i % 15 === 0)

    const timeStampsForRender = timeStamps
        .map(el => {
            let date = new Date(el * 1000);
            return `${date.getDay() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`
        })
    //console.log(new Date(1480602600 * 1000))
    const dataForRender = compileData(timeStampsForRender, data)
    //.unshift(['x', 'prices'])
    const dataForRender2 = [["x", "prices"], ...dataForRender]


    // Future data

    const futureTimeStamps = predictFuture(timeStamps)
        .map(el => {
            let date = new Date(el * 1000);
            return `${date.getDay() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`
        })
    const futurePrices = predictFuture(data)

    const futureData = compileData(futureTimeStamps, futurePrices)
    // console.log(futurePrices)
    // console.log(futureTimeStamps)

    const futureData2 = [["x", "prices"], ...futureData]
    ////

    //attemp to compile
    const compileTimestamps = [...timeStampsForRender, ...futureTimeStamps];
    // const emptyArray = makeEmptyArray(dataForRender.length)
    const compilePrices = [...data, ...futurePrices];
    const compiledData = compileData(compileTimestamps, compilePrices)
    const compiledData2 = [["x", 'prices'], ...compiledData]

    // attemp to compile
    //real compiling
    const realData = compileDataTriple(compileTimestamps, compilePrices, compilePrices)
    const realData2 = [['x', 'prices', 'future prices'], ...realData]

    //final attemp
    const dataWithNull = compileDataNull(timeStampsForRender, data)
    const dataWithColor = compileDataColor(futureTimeStamps, futurePrices)
    const dataWihtNullAndColor = [
        ['Year', {role: 'annotation', type: 'string'}, 'Value', {role: 'style', type: 'string'}],
        ...dataWithNull,
        [timeStampsForRender[timeStampsForRender.length - 1], 'Today', data[data.length-1], null],
        ...dataWithColor]
    return (
        <div>
            <Chart
                width={'600px'}
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={dataForRender2}
                options={{
                    hAxis: {
                        title: 'Time',
                    },
                    vAxis: {
                        title: 'Price',
                    },

                }}
                rootProps={{'data-testid': '1'}}
            />
            <Chart
                width={'600px'}
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={futureData2}
                options={{
                    hAxis: {
                        title: 'Time',
                    },
                    vAxis: {
                        title: 'Price',
                    },
                }}
                rootProps={{'data-testid': '2'}}
            />
            <Chart
                width={'600px'}
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={realData2}
                options={{
                    hAxis: {
                        title: 'Time',
                    },
                    vAxis: {
                        title: 'Price',
                    },
                    series: {
                        0: {lineWidth: 1},
                        1: {lineDashStyle: [14, 2, 7, 2]}
                    },
                    // crosshair: {trigger: 'both'}
                }}
                rootProps={{'data-testid': '2'}}
            />
            <Chart
                width={'600px'}
                height={'400px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={dataWihtNullAndColor}
            options = {options}
            />
        </div>
    )
}
let options = {
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
}