import Die from './Components/Die';
import './App.css';
import { useEffect, useState } from 'react'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {


  const [dice, setDice] = useState(AllowNewDice())
  const [win, setWin] = useState(false)

  const [count , setCount] = useState(0)


  useEffect(() => {
    const allHold = dice.every(item => item.isHeld )
    const firatValue = dice[0].value
    const AllSaameValue = dice.every(item => item.value === firatValue)
    if (allHold && AllSaameValue ) {
      setWin(true)
      
    }
  },[dice])
  function generateNewNumber () {
    return (
      {
        value: Math.ceil(Math.random() * 6),
        isHeld: false ,
        id : nanoid()
      }
    )
  }

  function AllowNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewNumber ())
    }

    return newDice
    // return newDice.map(item => <Die value ={item}/>)

  }


  const diceElement = dice.map(item => <Die 
    key = {item.id} 
    value={item.value}
    isHeld ={item.isHeld}
    Hold = {() => HoldDie(item.id)}
    />)

  function RooDice() {
    // setDice(AllowNewDice())
    setDice(oldDice => oldDice.map(item => {
      return item.isHeld ? 
      item 
      :generateNewNumber ()
    }))
  }


  function HoldDie (id) {
    setDice(oldDice => oldDice.map(item => {
      return item.id === id ? {...item , isHeld : !item.isHeld} : item
    }
    ))
  }



  
  
  function NewGame() {
    setWin(false)
    setDice(AllowNewDice())
    
    
  }
  return (
    // {
      //    win ? <Confetti /> : ""
      // }
      <div className="App">
      {win && <Confetti />}
      <div className='Game'>
<h1>Muhammad Game</h1>
<h3>Roll Time {count} </h3>
<p>Click to make all the number the same to end the game</p>
        <div className='Dice-Container'>
          {diceElement}
        </div>

  <button className='rollButton' onClick={ () => !win ? RooDice : NewGame  }>{!win ? "Roll" : "New Game"}</button>
        
        <h2>{win ? "You Win The Game" : "..."}</h2>
      </div>
    </div>
  );
}

export default App;
