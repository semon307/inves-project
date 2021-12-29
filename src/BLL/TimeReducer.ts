import {Dispatch} from "redux";
import {getChart} from "../DAL/FinanceAPI";

export type TimeStateType = {
    years: string
    timeStamps: Array<number>
}
type ActionType = ReturnType<typeof setTime> | ReturnType<typeof setTimeStamps>
const initialState: TimeStateType = {
    years: "5",
    timeStamps: [],

}
export const TimeReducer = (state: TimeStateType = initialState, action: ActionType): TimeStateType => {
    switch (action.type){
        case "time/SET-TIME":
            return {...state, years: action.years};
        case "time/SET-TIME-STAMPS":
            return {...state, timeStamps: action.timeStamps}
        default:
            return state;
    }
}
export const setTime = (years: string) => {
    return {
        type: "time/SET-TIME",
        years
    } as const
}
export const setTimeStamps = (timeStamps: Array<number>) => {
    return {
        type: "time/SET-TIME-STAMPS",
        timeStamps,
    } as const
}
export const setTimeStampsTC = (ticker: string, range: string) => {
    return (dispatch: Dispatch) => {
        getChart(ticker , range)
            .then(res => {
                dispatch(setTimeStamps(res.data.chart.result[0].timestamp))
            })
    }
}