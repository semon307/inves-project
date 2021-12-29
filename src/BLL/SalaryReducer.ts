export type SalaryStateType = {
    amount: string,
    yearlyIncome: string
    percentGrowth: string
}
type ActionsType = ReturnType<typeof setAmount>
    | ReturnType<typeof setYearlyIncome>
    | ReturnType<typeof setPercentGrowth>

const initialState = {
    amount: "",
    yearlyIncome: "",
    percentGrowth: "5",
}
export const SalaryReducer = (state: SalaryStateType = initialState, action: ActionsType): SalaryStateType => {
    switch (action.type){
        case "salary/SET-AMOUNT":
            return {...state, amount: action.amount};
        case "salary/SET-PERCENT-GROWTH":
            return {...state, percentGrowth: action.interestRate};
        case "salary/SET-YEARLY-INCOME":
            return {...state, yearlyIncome: action.yearlyIncome};
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
