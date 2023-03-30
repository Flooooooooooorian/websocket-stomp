import React, {useEffect, useState} from "react";
import {Client, IMessage} from "@stomp/stompjs";
import {ChatMessage} from "./model";

export default function Chat(props: {user: string}) {

    const [client, setClient] = useState<Client>(init())
    const [logs, setLogs] = useState<string[]>(["Chat:"])
    const [receiver, setReceiver] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        client.activate()
    }, [])

    const addLog = (msg: string) => {
        setLogs(prevState => [...prevState, msg])
    }

    function init() {
        const stompClient = new Client()
        stompClient.configure({
            brokerURL: 'ws://localhost:8080/ws',
            onConnect: onConnect,
        })

        return stompClient
    }

    function onConnect() {
        client.subscribe("/user/queue", onMessage)
    }

    function onMessage(message: IMessage) {
        const chatMessage = JSON.parse(message.body) as ChatMessage
        addLog(chatMessage.senderId + ": " + chatMessage.content)
    }

    const sendMessage = () => {
        const body = {
            senderId: props.user,
            recipientId: receiver,
            content: msg
        }
        client.publish({
            destination: '/user/' + receiver + "/message",
            body: JSON.stringify(body),
            skipContentLengthHeader: true,
        })
    }

    return (
        <div>
            {logs.map((log, index) => (<p key={index}>{log}</p>))}

            <input value={receiver} placeholder='Reciever' onChange={(e) => {
                setReceiver(e.target.value)
            }}/>

            <input value={msg} placeholder='Message' onChange={(e) => {
                setMsg(e.target.value)
            }}/>
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}
