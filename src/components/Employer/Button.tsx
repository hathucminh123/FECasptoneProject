import React, {} from 'react'
import classes from './Button.module.css'

interface props{
    text:string;
}

export default function Button({text}:props) {
  return (
    <button className={classes.div} type='submit'>{text}</button>
  )
}

