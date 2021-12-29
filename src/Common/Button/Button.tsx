import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

const Button: React.FC<ButtonPropsType> = (
    {
        red, className, disabled,
        ...restProps
    }
) => {
    const finalClassName = `${red ? s.red : s.default} ${className} ${disabled ? s.disabled : ""}`

    return (
        <button
            onClick={restProps.onClick}
            className={finalClassName}
            {...restProps}
        />
    )
}

export default Button