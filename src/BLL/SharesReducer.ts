import {v1} from "uuid";
import {Dispatch} from "redux";
import {getChart, getFinanceData} from "../DAL/FinanceAPI";
import {loadState} from "./UTILS/LocalStorageUtils";
import {setAppStatusAC} from "./AppReducer";

export type SharesType = {
    id: string
    ticker: string
    amount: string
    buyPrice: string
    currentPrice: string
    pricesBefore: Array<number>
}
export type SharesStateType = Array<SharesType>
type ActionsType = ReturnType<typeof updateShare>
    | ReturnType<typeof addShare>
    | ReturnType<typeof deleteShare>
    | ReturnType<typeof updateTicker>
    | ReturnType<typeof updateBuyPrice>
    | ReturnType<typeof updateAmount>
    | ReturnType<typeof setCurrentPrice>
    | ReturnType<typeof setPricesBefore>
    | ReturnType<typeof deleteLastAddedShare>

const initialState = loadState() ? loadState().shares : [
    {id: v1(), ticker: "", amount: "1", buyPrice: "0.1", currentPrice: "", pricesBefore: []},
]
export const SharesReducer = (state: SharesStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        // case "UPDATE-SHARE":
        //     let share = state.filter( i => i.id === action.payload.id);
        //     share = {...share, ...action.payload}
        //     return [...state, share];
        case "shares/ADD-SHARE":
            return [...state, {id: v1(), ticker: "", amount: "", buyPrice: "", currentPrice: "", pricesBefore: []}];
        case "shares/DELETE-SHARE":
            return state.filter( i => i.id !== action.id);
        case "shares/UPDATE-TICKER": {
            const stateCopy = [...state];
            let shareForChange = stateCopy.find(i => i.id === action.id)!;
            shareForChange.ticker = action.ticker;
            return stateCopy;
        }
        case "shares/UPDATE-BUYPRICE": {
            const stateCopy = [...state];
            let shareForChange = stateCopy.find(i => i.id === action.id)!;
            shareForChange.buyPrice = action.buyPrice;
            return stateCopy;
        }
        case "shares/UPDATE-AMOUNt": {
            const stateCopy = [...state];
            let shareForChange = stateCopy.find( i => i.id === action.id)!;
            shareForChange.amount = action.amount;
            return stateCopy;
        }
        case "shares/SET-CURRENT-PRICE": {
            const stateCopy = [...state];
            let shareForChange = stateCopy.find(i => i.id === action.id)!;
            shareForChange.currentPrice = action.price;
            return stateCopy;
        }
        case "shares/SET-PRICES-BEFORE": {
            const stateCopy = [...state];
            let shareForChange = stateCopy.find(i => i.id === action.id)!;
            shareForChange.pricesBefore = action.pricesBefore;
            return stateCopy;
        }
        case "shares/DELETE-LAST-ADDED-SHARE": {
            let stateCopy: SharesStateType = [...state]
            stateCopy.pop()
            return stateCopy
        }
        default:
            return state;

    }

}
export const updateShare = (ticker: string, buyPrice: string, amount: string, id: string) => {
    return {
        type: "shares/UPDATE-SHARE",
        payload: {
            ticker,
            buyPrice,
            amount,
            id,
        }
    } as const
}
export const updateTicker = (id: string, ticker: string) => {
    return {
        type: "shares/UPDATE-TICKER",
        id,
        ticker,
    } as const
}
export const updateBuyPrice = (id: string, buyPrice: string) => {
    return {
        type: "shares/UPDATE-BUYPRICE",
        id,
        buyPrice,
    } as const
}

export const updateAmount = (id: string, amount: string) => {
    return {
        type: "shares/UPDATE-AMOUNt",
        id,
        amount,
    } as const
}
export const deleteShare = (id: string) => {
    return {
        type: "shares/DELETE-SHARE",
        id,
    } as const
}
export const deleteLastAddedShare = () => {
    return {
        type: "shares/DELETE-LAST-ADDED-SHARE",
    } as const
}
export const addShare = () => {
    return {
        type: "shares/ADD-SHARE",
    } as const
}
export const setCurrentPrice = (id: string, price: string) => {
    return {
        type: "shares/SET-CURRENT-PRICE",
        id,
        price,
    } as const
}
export const setPricesBefore = (id: string, pricesBefore: Array<number>) => {
    return {
        type: "shares/SET-PRICES-BEFORE",
        id,
        pricesBefore,
    } as const
}
export const getCurrentPriceTC = (id: string, ticker: string, region?: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        getFinanceData(ticker, region)
            .then((res) => {
                dispatch(setCurrentPrice(id, res.data.price.regularMarketPrice.fmt))
                dispatch(setAppStatusAC("succeeded"))
                // console.log(res.data.price.regularMarketPrice.fmt)
            })
            .catch(err => {
                dispatch(setAppStatusAC("failed"))
            })
            //.finally(()=> dispatch(setAppStatusAC("idle")))
    }
}
export const setPricesBeforeTC = (id: string, ticker: string, range: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        getChart(ticker, range)
            .then(res => {
                // console.log(res.data.chart.result[0].indicators.quote[0].close)
                dispatch(setPricesBefore(id, res.data.chart.result[0].indicators.quote[0].close))
            })
            .finally(()=> dispatch(setAppStatusAC("idle")))
    }
}