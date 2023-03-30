import React, {useState} from "react";
import axios from "axios";

export default function Login(props: {login: (user:string)=> void}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = () => {
        axios.get("/api/users/me", {auth: {username, password}})
            .then((response) => {
                props.login(response.data)
            })
    }

    return (
        <div>
            <input value={username} placeholder='username' onChange={(e) => {
                setUsername(e.target.value)
            }}/>
            <input value={password} placeholder='password' onChange={(e) => {
                setPassword(e.target.value)
            }}/>
            <button onClick={login}>login</button>
        </div>
    )
}
