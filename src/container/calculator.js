import React from "react";
import { Data } from "../Component/buttonData";
import "../container/calculator.css";
import updateDisplay from "../Component/calculatorDisplay";
import * as math from'mathjs'

const initialState = {
  display: "",
  result: ""
};

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.changeValue = this.changeValue.bind(this);
    this.resetDisplay = this.resetDisplay.bind(this);
    this.equalEval = this.equalEval.bind(this);
  }

  changeValue({ target: { value } }) {
    this.setState((prevState) => ({
      display: updateDisplay(prevState.display, value),
      result: '',
    }));
  }

  resetDisplay() {
    this.setState({
      display: '0',
      result: ''
    });
  }

  equalEval(e) {
    e.preventDefault();
    let result;
    let expression = this.state.display.replace(/[^-()\d/*+.]/g, "");
    expression = expression.replace(/x/g, "*");
    expression = expression.replace(/([+\/*])-([+\/*])/g, "$2");

    try {
      result = math.evaluate(expression);
    } catch (error) {
      alert(error.message);
      result = "NaN";
    }

    this.setState({
      display: String(result),
      result: "",
    });
  }

  render() {
    const { display, result } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.equalEval} className="calculator">
          <div id="calculator-display">
            <span
              className="result"
              id='display'
              disabled
              type="text"
              value={!result ? display : result}>{!result ? display : result}</span>
          </div>
          <div className="buttongrid">
            <button
              type="button"
              id="clear"
              className="button"
              onClick={this.resetDisplay}
            >
              AC
            </button>
            {Data.map(({ id, value }) => (
              <button
                key={id}
                type="button"
                value={value}
                id={id}
                className="button"
                onClick={this.changeValue}
              >
                {value}
              </button>
            ))}
            <button
              type="submit"
              id="equals"
              className="button"
              disabled={!display}
            >
              =
            </button>
          </div>
        </form>
      </div>
    );
  }
}