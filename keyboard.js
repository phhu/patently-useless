import React, { useState, useEffect }  from "react"
//import { VirtualKeyboard } from 'react-native-screen-keyboard';
import KeyboardedInput from 'react-touch-screen-keyboard';
import 'react-touch-screen-keyboard/lib/Keyboard.css'; // if you just want css

// see https://github.com/xTrinch/react-touch-screen-keyboard
function Keyboard(){
  const [value, setValue] = useState('');
  const [type, setType] = useState('');
  const [kName, setName] = useState('');
  
  const change = (ev) => {
    setValue(ev)
    console.log("keyboard change",ev)
  }
  const CustomMapping = [
    ['q', 'w', 'egg', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '@'],
    ['z', 'x', 'c', 'v', 'bananarama', 'n', 'm', '.com']
  ];
  // onChange={}
  // defaultKeyboard={CustomMapping}
  return <KeyboardedInput
    enabled
    type={type}
    value={value}
    name={kName}
    onChange={change}
    inputClassName="keyboardInput"
    defaultKeyboard={CustomMapping}
    
  />
}

export default Keyboard
