import { useState } from 'react'
import classes from './input.module.scss';

interface PropsType {
  value: string;
  validation: string[];
  id: string;
  type: string;
  readonly: boolean;
  placeholder: string;
  autofocus: boolean;
  arialabel: string;
  handlerClick(): any;
  inputHandler(value: string): any;
  clearData(): any;
}

const Input = (props:PropsType) => {

  const { id, type, readonly, placeholder, autofocus, arialabel, handlerClick, value, validation, inputHandler, clearData } = props;

  const [localValue, setValue] = useState(value ? value : '');
  const [valid, setValid] = useState(value ? true : false);
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState('');

  const onInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const value: string = (e.target as HTMLInputElement).value;
    setValue(value);
    const {valid, error} = validate(placeholder, value, validation);
    if ( valid ) {
      inputHandler(value);
      setValid(valid);
    } else {
      inputHandler('');
      setError(error);
    };
  }
  
  const onClrHandler = () => {
    setValue('');
    setChanged(false);
    clearData();
    setValid(false);
  };

  const onKeyupHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Escape') onClrHandler();
  }
  
  const onBlur = () => {
    setChanged(true);
    const {valid, error} = validate(placeholder, localValue, validation);
    if ( valid ) setValid(valid);
    else setError(error);
  }

  return (
    <div className = { classes.input }>
      <div className = { classes.inputBox }>
        <input
          id = { id }
          type = { type }
          placeholder = { placeholder }
          onInput = { onInputHandler }
          value = { localValue }
          onKeyUp = { onKeyupHandler }
          autoFocus = { autofocus }
          aria-label = { arialabel }
          readOnly = { readonly }
          onClick = { handlerClick }
          autoComplete = "off"
          onBlur = { onBlur }
        />

        {localValue && !readonly
          ? <button 
              type = "button" 
              className = { classes.clrButton }
              onClick = { onClrHandler }
              aria-label = { `Clear ${arialabel}` }
            >&times;</button> 
          : null}
      </div>

      <div className={classes.error}>
        {!valid && changed ? error  : null}
      </div>

    </div>  
  )
}

const validate: (name: string, value: string, validation: string[]) => {valid: boolean, error: string} = (name: string, value: string, validation: string[]) => {
  let valid: boolean = true;
  let error: string = '';
  if ( validation ) { 
    let res: boolean | null = null;
    valid = validation.map(item => {  
      if (typeof(res) == 'boolean' && !res) return false;
      switch (item) {
        case 'required': 
          res = !!value;
          if (!res) error = `${name} required`;
          return res;          
        case 'email':
          res = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value); 
          if (!res) error = `Invalid Email`;
          return res;         
        default: return true; 
      }    
    }).reduce((res, curr) => res && curr, true)
  }
  return {valid, error};
}

export default Input;
