import { useCallback, useState, useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(()=> {
    let pass=""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyz";
    if(numAllowed) str+= "1234567890"
    if(charAllowed) str+= "~!@#$%^&*()_?/-"

    for(let i=1; i<= length; i++){
        let char = Math.floor(Math.random()*str.length + 1)
        pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed, setPassword]) 

  useEffect(() => {
    passwordGenerator()
  }, [length, charAllowed,
  numAllowed, passwordGenerator])

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select(); 
    window.navigator.clipboard.writeText(password)
  }, [password]) 

  return (
    <>
      <h1>Password Generator</h1>
      <div class="password-input">
          <input 
              type="text"
              value = {password}
              placeholder = "Password"
              ref = {passwordRef}
              readOnly
          />
          <button
          onClick = {copyToClipboard}
          >Copy</button>
        </div>
      <div class="container">
        <label for="range" class="password-length">Character Length: <span>{length}</span></label>
        <input 
            type="range"
            id="range"
            name="range"
            class="range"
            min = {6}
            max = {100}
            value = {length} 
            onChange = {(e) => {setLength(e.target.value)}}      
       />
        
        <div class="checkbox">
          
          <input type="checkbox" name="char" id="char" 
          defaultChecked = {charAllowed}
          onChange = {() => {setCharAllowed((prev) => !prev)}}
          ></input>
          <label for="char">Characters Allowed</label>
        </div>
        
        <div class="checkbox">
          
          <input type="checkbox" name="num" id="num"
          onChange = {() => {setNumAllowed((prev) => !prev)}}
          defaultChecked = {numAllowed}
          ></input>
          <label for="num">Numbers Allowed</label>
       </div> 
        
      </div>
    </>
  )
}

export default App
