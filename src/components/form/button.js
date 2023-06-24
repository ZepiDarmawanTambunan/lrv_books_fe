import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
    children,
    type = 'button',
    className,
    variant = 'bg-blue-600',
    ...props
}) => {
    return (
        <button
            className={`${
                props.disabled ? 'bg-gray-600' : `${variant}`
            } hover:opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                className || ''
            }`}
            type={type}
            {...props}>
            {children}
        </button>
    )
}

Button.prototype = {}
export default Button
