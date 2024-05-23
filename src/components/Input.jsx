import React, { useId } from 'react'

const Input = React.forwardRef(function Input(
    {
        label,
        type = "text",
        className = "",
        ...proops
    },
    ref
) {

    const id = useId
    return (
        <div className=' w-full'>
            {label && <label
                className={`inline-block mb-1 pl-1 ${className} `}
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={` ${className}`}
                ref={ref}
                {...proops}
                id={id}
            />
        </div>
    )

})


export default Input