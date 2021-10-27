import { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import './App.css';
import Card from './components/card/Card';
import Navbar from './components/navbar/Navbar';
import { posts } from './data';

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  },[])

  useEffect(() => {
    socket?.emit("newUser", user)
  },[socket,user])



  return (
    <div className="container">
      {
        user ? 
        <>
          <Navbar socket={socket}/>
          {
            posts.map( (item, i) => (
              <Card key={i} post={item} socket={socket} user={user}/>
            ))
          }
          <span className="username">{user}</span>
        </>
        :
        <div className="login">
          <input type="text" name="username" id="" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          <button onClick={() => setUser(username)}>Log In</button>
        </div>

      }
    </div>
  );
}

export default App;
