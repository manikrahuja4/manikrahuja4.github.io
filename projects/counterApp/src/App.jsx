import { useState } from "react";

export default function App() {
 
  let [count, setCount] = useState(0)
  let [DarkTheme, setDarkTheme] = useState(false)

  function add(){
    setCount(count+1)
  }
  function sub(){
    setCount(count-1)
  }
  function darkTheme(){
    setDarkTheme(!DarkTheme)
  }

  return (
<div className={`w-screen h-screen flex items-center justify-center transition-all ${DarkTheme? "bg-slate-900" : "bg-gray-100"}`}>
  <div className={`flex items-center justify-center flex-col p-10 rounded-lg shadow-lg transition-all space-y-6 
  ${DarkTheme ? "bg-gray-800 text-white, shadow-blue-900" : "bg-white text-gray-800"}`}>

    <button
  onClick={darkTheme}
  className={`px-5 py-2 rounded-full font-semibold transition-all
    ${DarkTheme ? 'bg-white text-black border border-black hover:bg-black hover:text-white' 
                : 'bg-black text-white border border-white hover:bg-white hover:text-black'}
  `}
>
  {DarkTheme ? "Toggle Light" : "Toggle Dark"}
</button>

    <h1 className={`text-4xl transition-all font-bold ${DarkTheme?"text-white":"text-gray-800"}`}>Counter App</h1>
    
    <span className="text-5xl font-semibold text-blue-600">{count}</span>
    
    <div className="flex space-x-4">
      <button 
        onClick={add}
        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded transition"
      >
        +
      </button>
      <button 
        onClick={sub}
        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition"
      >
        -
      </button>
    </div>
    
  </div>
</div>

  )

}
