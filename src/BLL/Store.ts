import {applyMiddleware, combineReducers, createStore} from "redux";
import {TimeReducer} from "./TimeReducer";
import {CashReducer} from "./CashReducer";
import {RealEstateReducer} from "./RealEstateReducer";
import {CreditReducer} from "./CreditReducer";
import {SharesReducer} from "./SharesReducer";
import thunkMiddleware from 'redux-thunk'
import {loadState} from "./UTILS/LocalStorageUtils";
import {appReducer} from "./AppReducer";
import {SalaryReducer} from "./SalaryReducer";

const reducers = combineReducers({
    time: TimeReducer,
    cash: CashReducer,
    realEstate: RealEstateReducer,
    credit: CreditReducer,
    shares: SharesReducer,
    salary: SalaryReducer,
    app: appReducer,
});
const store = createStore(reducers, loadState(), applyMiddleware(thunkMiddleware))
export type AppStateType = ReturnType<typeof reducers>
store.subscribe(()=>{
    localStorage.setItem("investProject", JSON.stringify(store.getState()))
})
export default store;
// @ts-ignore
window.store = store;