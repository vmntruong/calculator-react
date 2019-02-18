import React, {Component} from 'react';

const DisplayWindow = (props) => (
  <input className={props.className} type="text" value={props.expression} disabled />
);

function isAnOperationCharacter(text) {
  return (/[\+\-\*\/]/.test(text));
}

class Button extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onKeyPressed(this.props.text);
  }

  render() {
    return(
      <button className={this.props.className} onClick={this.onClick}>
        {this.props.text}
      </button>
    );
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expression: "0"
    }

    this.onKeyPressed = this.onKeyPressed.bind(this);

    this.onEvaluatePressed = this.onEvaluatePressed.bind(this);

    this.onDeletePressed = this.onDeletePressed.bind(this);

    this.onBackPressed =this.onBackPressed.bind(this);
  }

  onKeyPressed(text) {
    let old_expression = this.state.expression;
    let new_expression;
    if (old_expression=="0" && text>='0' && text<='9') {
      new_expression = text;
    }
    else if (isAnOperationCharacter(old_expression[old_expression.length-1]) && isAnOperationCharacter(text)) {
      new_expression = old_expression.slice(0, -1) + text;
    } else {
      new_expression = "" + old_expression + text;
    }
    this.setState((prev) => ({
      expression: new_expression
    }));
  }

  onEvaluatePressed() {
    console.log(this.state.expression);
    
    const result = eval(this.state.expression);
    this.setState({expression: result.toString()});
  }

  onDeletePressed() {
      this.setState({expression: "0"});
  }


  onBackPressed() {
    this.setState((prev)=>({
      expression: prev.expression.length <=1 ? "0" : prev.expression.slice(0, -1)
    }));
  }


  render() {

    const numberKeys = [];
    for (let i=0; i<10; i++) {
      numberKeys.push(
        <Button className={`btn btn-`+i} text={i} onKeyPressed={this.onKeyPressed} key={i}/>
      )
    }

    return(
      <div className="calculator">
        <DisplayWindow className="display-window" expression={this.state.expression}/>

        <Button className={`btn btn-7`} text={7} onKeyPressed={this.onKeyPressed} key={7}/>
        <Button className={`btn btn-8`} text={8} onKeyPressed={this.onKeyPressed} key={8}/>
        <Button className={`btn btn-9`} text={9} onKeyPressed={this.onKeyPressed} key={9}/>
        <Button className="btn btn-op" text="+" onKeyPressed={this.onKeyPressed}/>

        <Button className={`btn btn-4`} text={4} onKeyPressed={this.onKeyPressed} key={4}/>
        <Button className={`btn btn-5`} text={5} onKeyPressed={this.onKeyPressed} key={5}/>
        <Button className={`btn btn-6`} text={6} onKeyPressed={this.onKeyPressed} key={6}/>
        <Button className="btn btn-op" text="-" onKeyPressed={this.onKeyPressed}/>

        <Button className={`btn btn-1`} text={1} onKeyPressed={this.onKeyPressed} key={1}/>
        <Button className={`btn btn-2`} text={2} onKeyPressed={this.onKeyPressed} key={2}/>
        <Button className={`btn btn-3`} text={3} onKeyPressed={this.onKeyPressed} key={3}/>
        <Button className="btn btn-op" text="*" onKeyPressed={this.onKeyPressed}/>

        <Button className={`btn btn-0`} text={0} onKeyPressed={this.onKeyPressed} key={0}/>
        <Button className="btn btn-back" text="<" onKeyPressed={this.onBackPressed}/>
        <Button className="btn btn-ac" text="C" onKeyPressed={this.onDeletePressed}/>
        <Button className="btn btn-op" text="/" onKeyPressed={this.onKeyPressed}/>
        <button className="btn equals" onClick={this.onEvaluatePressed}>=</button>
      </div>
    )
  }
}

export default Calculator;
