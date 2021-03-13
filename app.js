import React, { useState, useEffect }  from "react"


const App = () => {
  
  const [text,setText] = useState('');


  const keyPress = (ev) => {
    console.log("keypress",ev.key,text);
    if (
      /[aeiou]/i.test(ev.key)  
      || (/ $/.test(text) && ev.key ===" ")
    ){
      ev.preventDefault();
    } else {
      
    }
      //return false;
  }
  /*const onKeyDown = ev => {
    console.log("keydown", ev.key);
  }*/

  // onKeyDown={onKeyDown}
  return (
    <div>
      <textarea cols="80" rows="8"
       onKeyPress={keyPress}
       onChange={ev => setText(ev.target.value)}
      ></textarea>
    </div>
  );
};

export default App;