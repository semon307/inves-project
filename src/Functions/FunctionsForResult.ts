import {SharesStateType} from "../BLL/SharesReducer";

export const currentPriceWholePortfolio = (state: SharesStateType) => {
    return state.reduce((acc, el) => acc + +el.currentPrice * +el.amount, 0)
}
export const predictFutureSharesPrices = (arr: Array<number>) => {
    const avarage = +((arr[arr.length - 1] - arr[0]) / arr.length).toFixed(2)
    let res = arr[arr.length - 1];
    for (let i = 1; i < arr.length; i++){
        res += avarage
    }
    return Math.floor(res);
}