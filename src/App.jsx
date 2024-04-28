import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [allowednum, setAllowednum] = useState(false)
  const [allowedchar, setAllowedchar] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef();

  const passwordGenrator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(allowedchar){str+="!@#$%^&*()?><"} 
    if(allowednum){str+="0123456789"} 
    for(let i=0;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
     setPassword(pass)
  },[allowednum,allowedchar,length,setPassword])

  const copyInclickBoard = ()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 50)
    window.navigator.clipboard.writeText(password)
  }

   useEffect(()=>{
    passwordGenrator()
   },[allowednum,allowedchar,length,passwordGenrator])
  return (
    <>
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>Password Genretor
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text" value={password} className=' w-800 m-4 py-3 px-3 outline-none' placeholder='password' readOnly ref={passwordRef} />
      <button onClick={copyInclickBoard} className='outline-none text-white m-4 px-3 py-0.5 shrink-0 bg-blue-500'>copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input onChange={(e)=>setLength(e.target.value) } type="range" className='m-1 curse-pointer' min={8} max={50} value={length} />
        <label >length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input  type="checkbox" defaultChecked={allowedchar} className='m-1 my-4 curse-pointer' id='charInput' onChange={()=>{setAllowedchar((pre)=>!pre)}} value={allowedchar} />
        <label>character</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input  type="checkbox" defaultChecked={allowednum} className='m-1 my-4 curse-pointer' id='numInput' onChange={()=>{setAllowednum((pre)=>!pre)}} value={allowednum} />
        <label>Number</label>
      </div>
     </div>
   </div>
    </>
  )
}

export default App
