import React, { useRef, useState } from "react";
//import ReactDOM from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
const rita = require('rita');

//import "./styles.css";
// https://hodgef.com/simple-keyboard/editor/?d=simple-keyboard/react-simple-keyboard-hooks-demo/tree/master

function RhymingKeyboard() {
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();

  const layouts = {
    //default: singleLayout("j"), shift: singleLayout("J"),
    //j: singleLayout("j"), J: singleLayout("J"),
    //...keyboards('jelly babies'),
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{next} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      "{space}"    // .com @ 
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{next} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{space}"   // .com @ 
    ]
  };  

  let getLast =  (arr = null, n = null) => {
    if (arr == null) return void 0;
    if (n === null) return arr[arr.length - 1];
    return arr.slice(Math.max(arr.length - n, 0));  
  };

  const onChange = input => {
    if (/[^ ] $/.test(input)){
      const lastWord = getLast(input.trim().split(" "))
      console.log("* last word:", lastWord);

    }
    const newInput = input
    setInput(newInput );
    console.log("Input changed", newInput );
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = event => {
    const input = event.target.value;
    console.log("onChangeInput",input);
    setInput(input);
    keyboard.current.setInput(input);
  };
  return (
    <div>
      <input
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
        size="100"
      />
      <Keyboard
        keyboardRef={r => (keyboard.current = r )}
        layoutName="default"
        layout={layouts}
        baseClass= "rhymingKeyboard"
        onChange={onChange}
        onKeyPress={onKeyPress}
        disableButtonHold={true}
      />
    </div>
  );
}   // keyboardRef={r => (keyboard.current = r)}   layout={layouts}

export default RhymingKeyboard

//const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);
