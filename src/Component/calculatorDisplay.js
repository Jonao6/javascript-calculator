function updateDisplay(display, input) {
    const lastChar = display[display.length - 1];
    const regex = /[+\-\/*]/;
    
    if (input === '.') {
      const lastNumber = display.split(regex).pop();
      if (lastNumber.includes('.')) {
        return display;
      }
    }
    
    if (display === '0') {
      return regex.test(input) ? '0' + input : input;
    }
  
    if (!regex.test(lastChar)) {
      return display + input;
    }
  
    if (regex.test(lastChar) && regex.test(input)) {
      if (input === '-' && lastChar !== '-') {
        return display + input;
      }
  
      if (input === '+' || input === '-') {
        if (lastChar === '-') {
          display = display.slice(0, -1);
        }
        return display + input;
      }
  
      return display.slice(0, -1) + input;
    }
  
    const arrValue = display.split(regex);
    const lastValue = arrValue[arrValue.length - 1];
    const lastValueHasDecimal = lastValue.includes('.');
    const newValue = lastValue === '0' && input !== '.' ? input : lastValueHasDecimal && input === '.' ? '' : lastValue.concat(input);
    return display.slice(0, -lastValue.length) + newValue;
  }
  
  export default updateDisplay;