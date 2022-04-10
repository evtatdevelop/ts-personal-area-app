import React from 'react';
import classes from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  handlerClick: any;
}

const Button: React.FC<ButtonProps &
React.HTMLProps<HTMLButtonElement>> = (props) => {

  const {label, type, handlerClick} = props;
  return (
    <button 
      type={type} 
      className={classes.button}
      onClick={handlerClick}
    >{label}</button>
  )
}

export default Button;