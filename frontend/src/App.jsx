import { useEffect, useMemo, useState } from 'react';
import {io} from 'socket.io-client'

function App({username}) {
  const [msgs,setmsgs] = useState([])
  const socket  = useMemo(()=>io("http://localhost:3000/"),[]);
  const [text,settext] = useState("")

  const [id ,setid] = useState("")
  socket.on('senddet', (data) => {
    setid(data)
  });


  const handlesubmit = (e)=>{
    e.preventDefault();
    socket.emit('message', {name: username ,message : text,id :id ,type: 'message'});
    settext("");
    setmsgs((prevMsgs) => [...prevMsgs, {name: username ,message : text , id :id ,type: 'message'}]);
  }
  
  useEffect(()=>{
    socket.on('recived-message', (msg) => {
      setmsgs((prevMsgs) => [...prevMsgs, msg]); 
    });
    socket.emit('join',{name: username ,message : "",id:id,type:"notification"})

    socket.on('joinedmsg',(data)=>{
      setmsgs((prevMsgs) => [...prevMsgs,data]); 
    })
    

  },[])
  useEffect(()=>{
    console.log(msgs);
  },[msgs])
  

  return (
    <div id="main" className='w-screen h-screen bg-[rgba(0,0,0,0.8)] relative flex items-center justify-center'>
      <div id="container" className='w-[40%] overflow-y-scroll h-[70%]   p-10 gap-5 rounded-xl flex flex-col items-center justify-start bg-blue-300'>
        {/* <div className="user w-[90%] bg-green-500 h-[10%] rounded-xl flex items-center justify-center text-white text-3xl">Name is connected to the server</div> */}
        {msgs.map((q,i)=>q.type == "message" ? (<div id="messagebox" key={i} className={`{min-w-[20%] min-h-[6%] break-words mx-[10px] px-[10px] py-[5px] ${q.id == id ? "bg-green-500 self-start" : "bg-blue-500 self-end"} rounded-xl text-center max-w-[50%] text-white}`}><span className='font-extrabold font-mono text-white'>{q.name} :</span> {q.message}</div>) : (<div id="messagebox" key={i} className={`{min-w-[20%] min-h-[6%] bg-gray-300  mx-[10px] px-[10px] py-[5px] rounded-xl text-center max-w-[50%] text-white}`}>{q.name} Joined The Chat</div>))}
        <div id="msgfield" className='absolute bottom-[5%] z-30 w-[40%] h-[7%] my-4 flex items-center justify-evenly'>
          <input type="text" value={text} onChange={(e)=>settext(e.target.value) & e.preventDefault()} id="msg" className='w-[80%] h-[80%] px-3 rounded-xl border-0 outline-none' placeholder='Enter your message...'/>
          <button onClick={handlesubmit} className='w-[10%] h-[80%] rounded-xl bg-green-500 text-white text-xl'>Send</button>
        </div>
      </div>
    </div>
  )
}

export default App
