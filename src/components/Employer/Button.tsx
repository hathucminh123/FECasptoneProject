import React, {} from 'react'
import classes from './Button.module.css'

interface props{
    text:string;
}

const Button: React.FC<props> = ({ text }) => {
  return (
    <button className={classes.div} type='submit'>{text}</button>
  )
}

export default Button

