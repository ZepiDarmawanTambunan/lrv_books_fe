import React from 'react'

const Select = ({ disabled = false, options = [], className, ...props }) => {
    return (
        <select
            disabled={disabled}
            className={`${className} block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline`}
            {...props}>
            <option value="" disabled>
                Select List
            </option>
            {options.length ?? 0 > 0
                ? options.map(option => (
                      <option key={option.id} value={option.id}>
                          {option.label}
                      </option>
                  ))
                : null}
        </select>
    )
}

export default Select
