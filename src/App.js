
import { useState, useRef } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { Chat } from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const cookies = new Cookies();
function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null)
  if (!isAuth) return (
    <div>
      <Auth setIsAuth={setIsAuth} />
    </div>
  );

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }

  return (
    <>
      {room ? (<Chat room={room} />)
        : (<div className="room">
          <label>Nom de la room</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>Entrer</button>
        </div>)}
      <div className="signout">
        <button onClick={signUserOut}>Se deconnecter</button>
      </div>
    </>
  )
}

export default App;
