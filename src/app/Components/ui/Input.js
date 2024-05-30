import React from 'react'

const Input = ({className,id,placeholder,type}) => {
  return (
    <input
    className={`${className} border-none w-full py-2 pr-8 text-gray-900 text-base bg-transparent  outline-none dark:text-gray-50 placeholder:text-gray-500 dark:placeholder:text-gray-400`}
    id={id}
    placeholder={placeholder}
    type={type}
  />
  )
}

export default Input 

