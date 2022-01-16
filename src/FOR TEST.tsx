import React, {ChangeEvent, useEffect, useState} from "react";
export const Test = () => {
    const [counter, setCounter] = useState<any>(10)
    // useEffect(() => {
    //     if (counter > 1){
    //         setTimeout(() =>{
    //             setCounter(counter - 1)
    //         }, 1000)
    //     } else {
    //         setCounter("BOOM")
    //     }
    // }, [counter])
    useEffect(() => {
        let id = setInterval(() => {
            setCounter((state: any) => {
                if (state === 1){
                    clearInterval(id);
                    return "BOOM"
                }else {
                    return state - 1
                }

            })

        }, 1000)

    }, [])
    return (
        <div>
            {counter}
        </div>
    )
}



// function User() {
//     const [userName, setUserName] = useState<string>("")
//     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=> setUserName(e.currentTarget.value)
//     return (
//         <div>
//             <p>{userName}</p>
//             <input
//                 onChange={onChangeHandler}
//             />
//         </div>
//     )
// }
//
// ReactDOM.render(
//     <User/>, document.getElementById('root')
// );
// // Что надо написать вместо ххх, чтобы правильно типизировать
// // параметр функции?



