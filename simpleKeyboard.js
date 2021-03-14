import React, { useRef, useState } from "react";
//import ReactDOM from "react-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

//import "./styles.css";
// https://hodgef.com/simple-keyboard/editor/?d=simple-keyboard/react-simple-keyboard-hooks-demo/tree/master

function SimpleKeyboard() {
  const [input, setInput] = useState("");
  const [text, setText] = useState("jelly babies ");
  const [layout, setLayout] = useState(text[0]);
  const [index, setIndex] = useState(1);
  const [capsOn, setCapsOn] = useState(false);
  const keyboard = useRef();
  
  const fill = (n,x)=>Array(n).fill(x);
  const fillJ = (n,x) => fill(n,x).join(" ");
  const singleLayout = (x) => [
    //fillJ(13,x) +" {bksp}",
    "{next} " + fillJ(10,x) + " {bksp}",
    "{lock} " + fillJ(9,x) + " {enter}",    //; '
    "{shift} " + fillJ(7,x) + " , . {shift}",  // /
    "{space}"    //.com @ 
  ]
  const keyboards = letters => 
    letters.split("").reduce((acc,letter) => {
      if (letter === " "){
        acc[" "] = singleLayout("{space}");
      } else {
        acc[letter.toLowerCase()] = singleLayout(letter.toLowerCase());
        acc[letter.toUpperCase()] = singleLayout(letter.toUpperCase());
      }
      return acc;
    },{})
  ;

  const layouts = {
    //default: singleLayout("j"), shift: singleLayout("J"),
    //j: singleLayout("j"), J: singleLayout("J"),
    ...keyboards('jelly babies'),
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{next} z w egg r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n .com , . / {shift}",
      "{space}"    // .com @ 
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{next} Z W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      "{space}"   // .com @ 
    ]
  };
  //console.log("layouts",layouts);
  const onChange = input => {
    setInput(input);
    console.log("Input changed", input);
  };
   const log = (...x) => console.log(...x);

  const handleShift = () => {
    if (/^[a-z]$/.test(layout)){
      //log("toupper");
      setLayout(layout.toUpperCase())
    } else if (/^[A-Z]$/.test(layout)){
      //log("tolower");
      setLayout(layout.toLowerCase())
    }
    //setLayout(layout === "default" ? "shift" : "default");
  };
  const caps = x => capsOn? x.toUpperCase():x.toLowerCase()
  const nextKeyboard = (inc = 1) => {
    setIndex(index+inc < 0 ? 0 : index+inc);
    setLayout(caps(getLetter()));
  }
  const getLetter = () => text[index % text.length];
  const onKeyPress = button => {
    console.log("Button pressed", button);
    switch (button){
      case "{lock}":
        setCapsOn(!capsOn)
      case "{shift}":
        handleShift();
        break;
      case "{bksp}":
        nextKeyboard(-1);
        break;
      case ",":
      case ".":
      case "{space}":
        if (layout === " "){nextKeyboard(1)}
        break;
      default:
        nextKeyboard(1);
    }
    //if (button === "{lock}"){setCapsOn(!capsOn)}
    //if (button === "{next}"){nextKeyboard()}
    //if (button === "{shift}" || button === "{lock}") handleShift();
    //if (!/\{/.test(button) || button ==="{space}"){}
  };

  const onChangeInput = event => {
    const input = event.target.value;
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
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        layout={layouts}
        
        onChange={onChange}
        onKeyPress={onKeyPress}
        
      />
    </div>
  );
}   // baseClass= "jellyBabyKeyboard"  disableButtonHold={true}

export default SimpleKeyboard

//const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);
