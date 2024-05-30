import React from 'react'

const Button = ({children,className}) => {
  return (
    <button className={`${className} text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`} type='button'>{children}</button>
  )
}

export default Button;
