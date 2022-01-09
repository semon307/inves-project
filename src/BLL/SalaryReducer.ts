export type SalaryStateType = {
    amount: string,
    yearlyIncome: string
    percentGrowth: string
    percentForShares: string
    percentForCredit: string
    percentForCash: string
}
type ActionsType = ReturnType<typeof setAmount>
    | ReturnType<typeof setYearlyIncome>
    | ReturnType<typeof setPercentGrowth>
    | ReturnType<typeof setPercentForCash>
    | ReturnType<typeof setPercentForCredit>
    | ReturnType<typeof setPercentForShares>

const initialState = {
    amount: "",
    yearlyIncome: "",
    percentGrowth: "5",
    percentForShares: "",
    percentForCredit: "",
    percentForCash: "",

}
export const SalaryReducer = (state: SalaryStateType = initialState, action: ActionsType): SalaryStateType => {
    switch (action.type){
        case "salary/SET-AMOUNT":
            return {...state, amount: action.amount};
        case "salary/SET-PERCENT-GROWTH":
            return {...state, percentGrowth: action.interestRate};
        case "salary/SET-YEARLY-INCOME":
            return {...state, yearlyIncome: action.yearlyIncome};
        case "salary/SET-PERCENT-FOR-CASH":
            return {...state, percentForCash: action.percent}
        case "salary/SET-PERCENT-FOR-CREDIT":
            return {...state, percentForCredit: action.percent}
        case "salary/SET-PERCENT-FOR-SHARES":
            return {...state, percentForShares: action.percent}
        default:
            return state;
    }

}

export const setAmount = (amount: string) => {
    return {
        type: "salary/SET-AMOUNT",
        amount,
    } as const
}
export const setYearlyIncome = (yearlyIncome: string) => {
    return {
        type: "salary/SET-YEARLY-INCOME",
        yearlyIncome,
    } as const
}
export const setPercentGrowth = (interestRate: string) => {
    return {
        type: "salary/SET-PERCENT-GROWTH",
        interestRate,
    } as const
}
export const setPercentForShares = (percent: string) => {
    return {
        type: "salary/SET-PERCENT-FOR-SHARES",
        percent,
    } as const
}
export const setPercentForCredit = (percent: string) => {
    return {
        type: "salary/SET-PERCENT-FOR-CREDIT",
        percent,
    } as const
}
export const setPercentForCash = (percent: string) => {
    return {
        type: "salary/SET-PERCENT-FOR-CASH",
        percent,
    } as const
}