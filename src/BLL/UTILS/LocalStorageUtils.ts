import {AppStateType} from "../Store";

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('investProject');
        if (serializedState) {
            // return {
            //     startValue: 0,
            //     maxValue: 10,
            //     value: 0,
            //     error: false,
            //     mode: true
            // };
            return JSON.parse(serializedState);
        } else {
            return undefined;
        }

    } catch (err) {
        return undefined;
    }
};
export const saveState = (state: AppStateType) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('investProject', serializedState);
    } catch {
        // ignore write errors
    }
};