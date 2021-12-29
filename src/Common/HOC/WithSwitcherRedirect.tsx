import React, {ComponentType, useState} from "react";
import {Switcher} from "../Switcher/Switcher";
import {Time} from "../../Components/Time/Time";

// type WithSwitcherRedirectType = {
//     isSeperate: boolean
// }
//
// export function WithSwitcherRedirect<T>(Component: ComponentType<T>) {
//     function WithSwitcher(props: WithSwitcherRedirectType) {
//         const {isSeperate, ...restProps} = props
//         // const [isShown, setIsShown] = useState(false)
//         // const setIsShownCallback = () => {
//         //     setIsShown(!isShown)
//         // }
//         return (
//             <>
//                 {isSeperate
//                     ? <><Time/><Component {...restProps as T}/></>
//                     : <Component {...restProps as T}/>
//                 }
//                 {/*<Switcher callBack={setIsShownCallback} checked={isShown} title={title}/>*/}
//                 {/*{isShown*/}
//                 {/*    ? <Component {...restProps as T}/>*/}
//                 {/*    : null}*/}
//             </>
//         )
//     }
//
//     return WithSwitcher;
//
// }
type WithSwitcherRedirectType = {
    isSeperate: boolean
}

export function WithSwitcherRedirect<T>(Component: ComponentType<T>, props: WithSwitcherRedirectType) {

    const {isSeperate, ...restProps} = props
    return (
            <>
                {isSeperate
                    ? <><Time/><Component {...restProps as T}/></>
                    : <Component {...restProps as T}/>
                }

            </>
    )
    // function WithSwitcher(props: WithSwitcherRedirectType) {
    //     const {isSeperate, ...restProps} = props
    //     // const [isShown, setIsShown] = useState(false)
    //     // const setIsShownCallback = () => {
    //     //     setIsShown(!isShown)
    //     // }
    //     return (
    //         <>
    //             {isSeperate
    //                 ? <><Time/><Component {...restProps as T}/></>
    //                 : <Component {...restProps as T}/>
    //             }
    //
    //         </>
        //)
    // }
    //
    // return WithSwitcher;

}