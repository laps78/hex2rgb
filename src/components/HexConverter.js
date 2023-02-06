import { useState } from "react";

function HexConverter(props) {
  const { applyColor } = props;
  const [ state, setState ] = useState({
    color: '#ffffff',
    message: `rgb(255, 255, 255)`,
  });

  const submitHandler = event => {
    event.preventDefault();
    validateValue(event.target.querySelector('.hexInput').value);
  }

  const inputHandler = event => {
    if (event.target.value.length === 7) {
      validateValue(event.target.value);
    }
    if (event.target.value.length > 7) {
      event.target.value = event.target.value.substr(0, 7);
    }
  }

  const error = () => {
    setState({
      color: '#EA4B35',
      message: 'Ошибка!',
    })
  }

  const hex2rgb = hex => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
  }

  const validateValue = string => {
    const regexp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (string.match(regexp)) {
      setState({
        color: string,
        message: hex2rgb(string),
      });
    } else {
      error();
    }
    applyColor(state.color);
  }
  
  return (
    
    <form className='HexConverterForm' onSubmit={submitHandler} onInput={inputHandler}>
      <input id="hexInput" name="hexInput" className="hexInput" placeholder={state.color}></input>
      <span className="currentRGB">{ state.message }</span>
    </form>
  );
}

export default HexConverter;
