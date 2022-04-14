import classes from './button.module.scss';

interface IAddForm {
  label: string;
  type: "button" | "submit" | "reset" | undefined;
  handlerClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = (props: IAddForm) => {
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