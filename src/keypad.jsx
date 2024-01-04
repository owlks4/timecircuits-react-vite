import './style/keypad.css';
import React from 'react';
import {keypadPress} from "./main.jsx";

class Keypad extends React.Component {
    constructor(props){ 
        super(props) 
        this.state = {} 
    }

    isVisuallyDown(i){
       return this.props.keysVisuallyDown[i] ? "down" : "";
    }

    render (){        

        return (
            <div className="keypad">
                <span className="keypad-dymo">SET DESTINATION</span>
                <div className="keys">
                    <span onClick={()=>{keypadPress("7")}} className= {"key "+this.isVisuallyDown(7)}>7</span>
                    <span onClick={()=>{keypadPress("8")}} className= {"key "+this.isVisuallyDown(8)}>8</span>
                    <span onClick={()=>{keypadPress("9")}} className= {"key "+this.isVisuallyDown(9)}>9</span>
                    <br></br>
                    <span onClick={()=>{keypadPress("4")}} className= {"key "+this.isVisuallyDown(4)}>4</span>
                    <span onClick={()=>{keypadPress("5")}} className= {"key "+this.isVisuallyDown(5)}>5</span>
                    <span onClick={()=>{keypadPress("6")}} className= {"key "+this.isVisuallyDown(6)}>6</span>
                    <br></br>
                    <span onClick={()=>{keypadPress("1")}} className= {"key "+this.isVisuallyDown(1)}>1</span>
                    <span onClick={()=>{keypadPress("2")}} className= {"key "+this.isVisuallyDown(2)}>2</span>
                    <span onClick={()=>{keypadPress("3")}} className= {"key "+this.isVisuallyDown(3)}>3</span>
                    <br></br>                   
                    <span onClick={()=>{keypadPress("0")}} className= {"key "+this.isVisuallyDown(0)}>O</span>
                    <span onClick={()=>{keypadPress("←")}} className= {"key yellow-key "+this.isVisuallyDown(10)}>←</span>
                    <span onClick={()=>{keypadPress("✓")}} className= {"key green-key "+this.isVisuallyDown(11)}>✓</span>
                </div>
            </div>
          );
    }
}
export default Keypad;
