export type RealEstateStateType = {
    futurePrice: string,
    currentPrice: string,
    priceChangeLastYears: string,
}
type ActionsType = ReturnType<typeof setFuturePrice>
    | ReturnType<typeof setCurrentPrice>
    | ReturnType<typeof setPriceChangeLastYears>

const initialState = {
    futurePrice: "",
    currentPrice: "",
    priceChangeLastYears: "5",
}
export const RealEstateReducer = (state: RealEstateStateType = initialState, action: ActionsType) => {
    switch (action.type){
        case "real-estate/SET-FUTURE-PRICE":
            return {...state, futurePrice: action.futurePrice};
        case "real-estate/SET-CURRENT-PRICE":
            return {...state, currentPrice: action.currentPrice};
        case "real-estate/SET-PRICE-CHANGE-LAST-YEARS":
            return {...state, priceChangeLastYears: action.priceChangeLastYears};
        default:
            return state;
    }

}

export const setFuturePrice = (futurePrice: string) => {
    return {
        type: "real-estate/SET-FUTURE-PRICE",
        futurePrice,
    } as const
}
export const setCurrentPrice = (currentPrice: string) => {
    return {
        type: "real-estate/SET-CURRENT-PRICE",
        currentPrice,
    } as const
}
export const setPriceChangeLastYears = (priceChangeLastYears: string) => {
    return {
        type: "real-estate/SET-PRICE-CHANGE-LAST-YEARS",
        priceChangeLastYears,
    } as const
}
