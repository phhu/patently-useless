import React, { useState, useEffect }  from "react"
//import { VirtualKeyboard } from 'react-native-screen-keyboard';
//import KeyboardedInput from 'react-touch-screen-keyboard';
import Keyboard from "./keyboard" 
import SimpleKeyboard from "./simpleKeyboard"
import RhymingKeyboard from "./rhymingKeyboard"
const rita = require('rita');
// https://rednoise.org/rita/reference/RiTa/rhymes/index.html
// see https://www.ling.upenn.edu/courses/Fall_2003/ling001/penn_treebank_pos.html
// rita.rhymes("cats", { maxLength: 4, numSyllables: 1,pos:"nns" });

const jbText = `Jelly Babies are known, at least since advertisements by Riches Confectionery Company of 22 Duke Street, London Bridge in 1885, along with a variety of other baby sweets, including Tiny Totties and Slopers Babies. But the pricing of these, at one farthing each suggests that they were very much larger than the modern Jelly Baby.The sweets were invented in 1864 by an Austrian immigrant working at Fryers of Lancashire and were originally marketed as Unclaimed Babies.`;

global.rita = rita
const App = () => {
  
  const [text,setText] = useState('');
  const [filter,setFilter] = useState('Egg');
  const [keystrokes, setKeystrokes] = useState('');
  const buttonClicked = ()=>{
    setText(keystrokes);
  }

  const filters = {
    'Vowels': {fn: (ev) => {
      if (
        /[aeiou]/i.test(ev.key)  
        || (/ $/.test(text) && ev.key ===" ")
      ){
        ev.preventDefault();
      }
    }},
    'xxx': {
      fn: (ev) => {
        if (/^[a-z]$/.test(ev.key)){setText(text+"x"); ev.preventDefault();}
        if (/^[A-Z]$/.test(ev.key)){setText(text+"X"); ev.preventDefault();}
      }
    },
    'Egg': {
      fn: (ev) => {
        if (
          /^[e]$/i.test(ev.key)  
        ){
          setText(text+"egg");
          ev.preventDefault();
        }
      }
    },
    'Blank': {
      fn: (ev) => {
        ev.preventDefault();
      }
    },
  };

  const keyPress = (ev) => {
    console.log("keypress",ev.key,text,filter);
    setKeystrokes(keystrokes + ev.key);
    filters[filter].fn(ev);
    //return false;
  }
  /*const onKeyDown = ev => {
    console.log("keydown", ev.key);
  }*/
  // onKeyDown={onKeyDown}
  
  return (
    <div>
      {/*
      <textarea cols="80" rows="8"
       onKeyPress={keyPress}
       onChange={ev => setText(ev.target.value)}
       value={text}
      ></textarea>
      <br />
      <select value={filter} onChange={ev => setFilter(ev.target.value)}>
        <option>Blank</option>
        <option>Vowels</option>
        <option>Egg</option>
        <option>xxx</option>
      </select>    
      */}
   


      
      <SimpleKeyboard baseClass="jellyBabyKeyboard" initialText="jelly babies "/>
      <SimpleKeyboard baseClass="blahKeyboard" initialText={jbText} />
      <RhymingKeyboard /> 
      
    </div>
  );
};    // <Keyboard />         <button onClick={buttonClicked}>switch</button>

export default App;