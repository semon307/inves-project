export type CashStateType = {
    amount: string,
    principalInvestment: string,
    interestRate: string,
    numberOfInterestAccrualPeriods: string,
}
type ActionsType = ReturnType<typeof setAmount>
    | ReturnType<typeof setprincipalInvestment>
    | ReturnType<typeof setInterestRate>
    | ReturnType<typeof setNumberOfInterestAccrualPeriods>
const initialState = {
    amount: "",
    principalInvestment: "",
    interestRate: "5",
    numberOfInterestAccrualPeriods: "1",
}
export const CashReducer = (state: CashStateType = initialState, action: ActionsType) => {
    switch (action.type){
        case "cash/SET-AMOUNT":
            return {...state, amount: action.amount};
        case "cash/SET-INTEREST-RATE":
            return {...state, interestRate: action.interestRate};
        case "cash/SET-NUMBER-OF-INTEREST-ACCRUAL-PERIODS":
            return {...state, numberOfInterestAccrualPeriods: action.numberOfInterestAccrualPeriods};
        case "cash/SET-PRINCIPAL-INVESTMENT":
            return {...state, principalInvestment: action.principalInvestment};
        default:
            return state;
    }

}

export const setAmount = (amount: string) => {
    return {
        type: "cash/SET-AMOUNT",
        amount,
    } as const
}
export const setprincipalInvestment = (principalInvestment: string) => {
    return {
        type: "cash/SET-PRINCIPAL-INVESTMENT",
        principalInvestment,
    } as const
}
export const setInterestRate = (interestRate: string) => {
    return {
        type: "cash/SET-INTEREST-RATE",
        interestRate,
    } as const
}
export const setNumberOfInterestAccrualPeriods = (numberOfInterestAccrualPeriods: string) => {
    return {
        type: "cash/SET-NUMBER-OF-INTEREST-ACCRUAL-PERIODS",
        numberOfInterestAccrualPeriods,
    } as const
}