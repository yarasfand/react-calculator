import { useState } from 'react';
import { useEffect } from 'react';

//FUNCTION OF KEYPAD And ALL Functions in it
export default function Keypadd()
{
    const [guess, setGuess] = useState(false);
    const [input, setInput] = useState("");
    const [result, setResult] = useState(0);

    function handleInput(value)
    {
        if(guess === true && !isNaN(value))
        {
            setInput("");
            setInput(value);
            setGuess(false);
            
        }
        else if(guess === true && isNaN(value))
        {
            setGuess(false);
            setInput(prevValue => prevValue + value);  
            return;
        }
        else if (value === '.' && input.includes('.')) 
        {
            return;
        }
        else if (value !== '0' || input.includes('.')) {
            setInput((prevValue) => prevValue + value);
        }
        else if (input === '') {
            setInput('0.');
        }
        else{
            setInput(prevValue => prevValue + value); 
            
        }
    }


    function calculatePreResult() {
        try {
            
          const result = eval(input);
          return result;

        } catch (error) 
        {
          return '';
        }
      }

    function handleResult(){

        try {
            setGuess(true);
            const result = eval(input);
            setInput(result.toString());
            setResult(result);
          
        
        } catch (error) 
          {  
            setGuess(true);
            return '';
          }
       
    }

   
    function clearAll()
    {
        setInput("");
        setResult(0);
    }

    function Del(){
        setInput((prevValue) => prevValue.slice(0, -1));
    }

    function handleKeyDown(event) {
        const { key } = event;
        if (key === 'Enter' || key === '=') {
          handleResult();
        } 
        else if (/^[0-9+\-*/.^]$/.test(key)) {
          handleInput(key);
        }
        else if(key === 'Backspace')
        {
            Del();
        }
      }
    
      useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      });

    return(
        <div className = "Keypad">
            
            
           <h2>CALCULATOR </h2>
            <div className = "Keypad-Inside">
           
           <div className = "data">
                <p>  {input} {<span>({calculatePreResult() })</span>} </p>
                <p className = "Res">{result}</p>
            </div>
            
            <table>
                <tr>
                    <td colspan = "2"><button onClick={ ()=> clearAll()}>AC</button></td>
                    <td><button onClick={ ()=> handleInput("/")}>/</button></td>
                    <td><button  onClick={ ()=> handleInput("*")}>*</button></td>
                </tr>

                <tr>
                    <td><button onClick={ ()=> handleInput("7")}>7</button></td>
                    <td><button onClick={ ()=> handleInput("8")}>8</button></td>
                    <td><button onClick={ ()=> handleInput("9")}>9</button></td>
                    <td><button onClick={ ()=> handleInput("-")}>-</button></td>
                </tr>

                <tr>
                    <td><button onClick={ ()=> handleInput("4")}>4</button></td>
                    <td><button onClick={ ()=> handleInput("5")}>5</button></td>
                    <td><button onClick={ ()=> handleInput("6")}>6</button></td>
                    <td><button onClick={ ()=> handleInput("+")}>+</button></td>
                </tr>
                
                <tr>
                    <td><button onClick={ ()=> handleInput("1")}>1</button></td>
                    <td><button onClick={ ()=> handleInput("2")}>2</button></td>
                    <td><button onClick={ ()=> handleInput("3")}>3</button></td>
                    <td rowspan = "2"><button className = "equals" onClick={ ()=> handleResult()}>=</button></td>
                </tr>

                <tr>
                    <td colspan = "2"><button onClick={ ()=> handleInput("0")}>0</button></td>
                    <td><button onClick={ ()=> handleInput(".")}>.</button></td>
                </tr>

                <tr>
                    <td colSpan={"4"}><button onClick={ ()=> Del()}>DEL</button></td>
                </tr>
            </table>

            </div>
        </div>
    );
     
    
}