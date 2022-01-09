import React from "react";
import {SharesStateType} from "../BLL/SharesReducer";
import {setPercentForShares} from "../BLL/SalaryReducer";
export const compoundInterest = (p: number, r: number, n: number = 1, t: number) => {
    return p * ((1 + (r/100) / n) ** (n * t));
};
export const creditPayment = (sum: number, percent: number, month: number) => {
    return sum * (percent/(1 - (1 + percent) ** (month * -1)))
}
export const compileData = (arrX: Array<string | number>, arrY: Array<number>) => {
    let res = [];
    for (let i = 0; i < arrX.length; i++){
        res.push([arrX[i], arrY[i]])
    }
    return res;
}

export const predictFuture = (arr: Array<number>) => {
    const avarage = +((arr[arr.length - 1] - arr[0]) / arr.length).toFixed(2)
    let res = [arr[arr.length-1]]
    for (let i = 1; i < arr.length; i++){
        res.push(res[i-1] + avarage)
    }
    // console.log(res)
    return res;
}
export const makeEmptyArray = (n: number) => {
    let res = [];
    for(let i = 0; i < n; i++){
        res.push(0)
    }
    return res;
}
export const compileDataTriple = (arrX: Array<string | number>, arrY: Array<number>, arrZ: Array<number>) => {
    let res = [];
    for (let i = 0; i < arrX.length; i++){
        res.push([arrX[i], arrY[i], arrZ[i]])
    }
    return res;
}
export const compileDataNull = (arrX: Array<string | number>, arrY: Array<number>) => {
    let res = [];
    for (let i = 0; i < arrX.length; i++){
        res.push([arrX[i], null, arrY[i], null])
    }
    return res;
}
export const compileDataColor = (arrX: Array<string | number>, arrY: Array<number>) => {
    let res = [];
    for (let i = 0; i < arrX.length; i++){
        res.push([arrX[i], null, arrY[i], "gray"])
    }
    return res;
}


export const dataFromState = (state: SharesStateType, timeStampsAmount: number) => {
    let arr: Array<Array<number>> = [];
    let res = [];
    state.forEach(item => {
        if(item.pricesBefore){
            if (timeStampsAmount - item.pricesBefore.length > 5){
                arr.push([...makeEmptyArray(timeStampsAmount - item.pricesBefore.length), ...item.pricesBefore.map(share => share * +item.amount)])
            } else {
                arr.push(item.pricesBefore.map(share => share * +item.amount))
            }

        }
    })
    for (let i = 0; i < arr[0].length; i++ ){
        let subSum= 0;
        for (let j = 0; j < arr.length; j++){
            subSum += arr[j][i]
            if (j === arr.length - 1){
                res.push(subSum)
                subSum = 0
            }
        }
    }
    return res;
}



export const salaryToShares = (yearlySalaryIncome: number, percentGrowth: number, setPercentForShares: number, timeStampsAmount: number, years: number) => {
    let amountPerTimeStamp = ((yearlySalaryIncome * years * (setPercentForShares/100)) / timeStampsAmount).toFixed(2);
    let firstDayAmount = +amountPerTimeStamp;
    let lastDayAmount = compoundInterest(+firstDayAmount, percentGrowth, 1, years)
    let difference = +((lastDayAmount - +firstDayAmount) / timeStampsAmount).toFixed(4)
    let res = [firstDayAmount];
    for (let i = 1; i < timeStampsAmount; i++){
        let current = res[0] + difference * i;
        res.push(res[i-1] + current + difference)
    }
    return res;
}

export const cashPastToTimeStamps = (cashAmount: number, timeStampsAmount: number) => {
    let amountPerTimeStamp = +(cashAmount / timeStampsAmount).toFixed(2)
    let res = [cashAmount];
    for (let i = 1; i < timeStampsAmount; i++){
        res.push(res[i-1] - amountPerTimeStamp)
    }
    return res.reverse()
}

export function compileArrays(args: Array<Array<number>>){
    let res = [];
    for (let i = 0; i < arguments[0][0].length; i++){
        res[i] = 0
        for(let j = 0; j < arguments[0].length; j++){
            res[i] += arguments[0][j][i]
        }
    }
    return res;
}

//использовать для time stamps для акций которые не находятся в API
export const realEstateInTimeStampsFutureFunction = (currentPrice: number, futurePrice: number, timeStampsAmount: number) => {
    const differencePerTimeStamp = +((futurePrice - currentPrice) / timeStampsAmount).toFixed(4)
    const res = [currentPrice];
    for (let i = 1; i < timeStampsAmount - 1; i++){
        res.push(res[i-1] + differencePerTimeStamp)
    }
    res.push(futurePrice)
    return res;
}
