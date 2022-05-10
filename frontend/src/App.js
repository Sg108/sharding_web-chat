import { TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from "react"
import { v4 as uuid } from 'uuid';
import io from "socket.io-client"
import './App.css';
const  socket = io.connect("http://localhost:5600")
function App() {
  const [ state, setState ] = useState({ message: "", name: "" })
	const [ chat, setChat ] = useState([])
	const [change,setChange]=useState(true)
	const small_id=useRef()
  useEffect(() => {

    small_id.current = uuid().slice(0,8).toString()
  console.log(chat)
  socket.on("message", ({ name, message ,fid}) => {

      
	   
	 setChat(chat=>[ ...chat, { name, message,fid } ])
			})
    
	return () => {
      console.log('end')
	
     }
		},[])
// const click=()=>{
// 		console.log("a")
// document.dispatchEvent(
// 	new KeyboardEvent("keydown", {
//        ctrlkey:true,
// 	   key: "b",
       
        
//     }),
// 	new KeyboardEvent("keyup", {
// 		ctrlkey:false,
// 		key: "b",
		
		 
// 	 })

// );
	//	}
const onName=(e)=>{
	const input=document.querySelector(".nam")
	console.log(input.value)
	const btn=document.querySelector('.btn');
	btn.style.display="none"
	setState({...state,name:input.value})
	setChange(!change)
	
	
	e.preventDefault()


}
  const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { name, message } = state
		const fid=small_id.current;
		socket.emit("message", { name, message ,fid})
		e.preventDefault()
		setState({ message: "", name })
	}
  const Chat = () => {
	console.log(chat)
		return chat.map(({ name, message ,fid}, index) => (
			<div key={index}>
				{small_id.current===fid?(
					<h3>
					{name}: <span>{message}</span>
				</h3>
				):(<h3 id="left">
					{name}: <span>{message}</span>
				</h3>)}
				
			</div>
		))
	}
  return (
    <div className="card">
	
     <form onSubmit={onMessageSubmit}>
				<h2>Message here</h2>
				{change?(<div className="name-field">
					<input type="text" name="name"  className="nam" label="Name" />
					<button className="btn" onClick={(e) => onName(e)}>Choose Name</button>
					
				</div>):(
					<h3>Hi,{state.name}</h3>
				)
				}
				<div className="msg">
				<div>
					<TextField
					   
						name="message"
						className='nam'
						multiline
                         maxRows={5}
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
					/>
				</div>
				<div>
				<button>Send Message</button>
				</div>
				</div>
			</form>
			<div className="render-chat">
				<h1>Your Chat</h1>
				{Chat()}
			</div>
    </div>
  );
}

export default App;
