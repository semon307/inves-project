export type CreditStateType = {
    years: string,
    sum: string,
    percent: string,
    creditPayBack: string
}
type ActionsType = ReturnType<typeof setYears>
    | ReturnType<typeof setSum>
    | ReturnType<typeof setPercent>
    | ReturnType<typeof setCreditPayBack>

const initialState = {
    years: "",
    sum: "",
    percent: "",
    creditPayBack: "",
}
export const CreditReducer = (state: CreditStateType = initialState, action: ActionsType): CreditStateType => {
    switch (action.type){
        case "credit/SET-SUM":
            return {...state, sum: action.sum};
        case "credit/SET-YEARS":
            return {...state, years: action.years};
        case "credit/SET-PERCENT":
            return {...state, percent: action.percent};
        case "credit/SET-CREDIT-PAYBACK":
            return {...state, creditPayBack: action.creditPayBack};
        default:
            return state;
    }

}

export const setYears = (years: string) => {
    return {
        type: "credit/SET-YEARS",
        years,
    } as const
}
export const setSum = (sum: string) => {
    return {
        type: "credit/SET-SUM",
        sum,
    } as const
}
export const setPercent = (percent: string) => {
    return {
        type: "credit/SET-PERCENT",
        percent,
    } as const
}
export const setCreditPayBack = (creditPayBack: string) => {
    return {
        type: "credit/SET-CREDIT-PAYBACK",
        creditPayBack,
    } as const
}
