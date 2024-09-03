import { auth, db } from '../firebase-config'
import { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { format, render, cancel, register } from 'timeago.js';
import '../styles/Chat.css';
export const Chat = (props) => {
    const { room } = props
    const [newMessages, setNewMessages] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt", "asc"))
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id })
            });
            setMessages(messages)
        });
        return () => unsuscribe();
    }, [])
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (newMessages === "") return;
        await addDoc(messagesRef, {
            text: newMessages,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });

        setNewMessages("")

    }
    return <div className="chat-app">
        <div><h1>Bienvenue sur le channel : {room}</h1></div>
        <div className="messages">
            {messages.map((message) => (

                <div className="message" key={message.id}>
                    {message.text}<br />
                    <div className="user">{message.user} <span>{format(message.createdAt.toDate())}</span></div>
                </div>

            )
            )}
        </div>
        <form onSubmit={handleSubmitForm} className="nnew-message-form">
            <input
                type="text"
                className="new-message-input"
                placeholder="taper votre message"
                onChange={(e) => setNewMessages(e.target.value)}
                value={newMessages}
            />
            <button type="submit" cllassName="send-button" >Envoyer</button>
        </form>
    </div >
}