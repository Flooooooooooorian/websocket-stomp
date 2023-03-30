import React, {useEffect, useState} from 'react';
import './App.css';
import {Client, frameCallbackType, IFrame, IMessage, Message} from '@stomp/stompjs';

function App() {

    const [logs, setLogs] = useState<string[]>([])
    const [client, setClient] = useState<Client | undefined>()
    const [msg, setMsg] = useState('')
    const [sender, setSender] = useState('')
    const [reciever, setReciever] = useState('')

    const addLog = (msg: string) => {
        setLogs(prevState => [...prevState, msg])
    }

    const connect = () => {
        addLog("connecting")
        const stompClient = new Client()
        stompClient.configure({
            brokerURL: 'ws://localhost:8080/ws',
            onConnect: onAny,
            onDisconnect: onAny,
            onUnhandledMessage: onAny,
            onStompError: onAny,
            onUnhandledReceipt: onAny
        })

        stompClient.activate()
        setClient(stompClient)
    };

    const onAny: frameCallbackType = (frame: IFrame) => {
        console.log(frame)
        addLog(frame.command)
    }

    const onMessage = (message: IMessage) => {
        console.log(message)
        addLog(message.body)
    }

    const subscribe = () => {
        client?.subscribe("/chat/" + sender, onMessage)
    }

    const sendMessage = () => {
        const body = {
            senderId: sender,
            recipientId: reciever,
            content: msg
        }
        client?.publish({
            destination: '/chat/' + reciever,
            body: JSON.stringify(body),
            skipContentLengthHeader: true,
        })
    }

    return (
        <div className="App">

            {logs.map((log, index) => (<p key={index}>{log}</p>))}
            <button onClick={() => {
                connect()
            }}>Connect
            </button>
            <button onClick={() => {
                client?.deactivate()
                setLogs([])
            }}>Stop
            </button>
            <input value={sender} onChange={(e) => {
                setSender(e.target.value)
            }}/>
            <button onClick={subscribe}>Subscribe</button>
            <input value={reciever} onChange={(e) => {
                setReciever(e.target.value)
            }}/>

            <input value={msg} onChange={(e) => {
                setMsg(e.target.value)
            }}/>
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;
