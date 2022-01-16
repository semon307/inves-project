import s from './Input.module.css'
import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = DefaultInputPropsType & {
    id?: string
    onChangeWithId?: (id: string, value: string) => void
    onChangeText?: (value: string) => void
    onBlur?: () => void
    onEnter?: () => void
    error?: string | null
    spanClassName?: string
    type?: string
}

const Input: React.FC<InputPropsType> = React.memo((
        {
            type,
            onChange, onChangeText,
            onKeyPress, onEnter,
            error,
            className, spanClassName,
            id, onChangeWithId,

            ...restProps
        }
    ) => {
        const onChangeCallBackWithId = (id: string, e: ChangeEvent<HTMLInputElement>) => {
            onChangeWithId && onChangeWithId(id, e.currentTarget.value)
        }
        const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
            // onChange && onChange(e)
            id
                ? onChangeWithId && onChangeWithId(id, e.currentTarget.value)
                : onChangeText && onChangeText(e.currentTarget.value)
        }

        const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`

        const finalInputClassName = error ? `${s.errorInput}` : `${s.input} ${className}`

        return (
            <>
                <input
                    type={type ? "text" : "number"}
                    onChange={onChangeCallback}
                    // onKeyPress={onKeyPressCallback}
                    className={finalInputClassName}

                    {...restProps}
                />
                {error && <span className={finalSpanClassName}>{error}</span>}
            </>
        )
    }
)
export default Input
