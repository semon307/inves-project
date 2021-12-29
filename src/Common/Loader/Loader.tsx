import s from "./Loader.module.css"
export const Loader = () => {
    return (
        <div className={s.loadingLine}>
            <div className={s.line}>
                <div className={s.shadow}/>
            </div>
        </div>
    )
}