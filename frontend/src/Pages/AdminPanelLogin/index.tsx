import React, { useEffect, useState } from 'react';
import api from '../../Services/api';
import { useHistory } from 'react-router-dom';
import './styles.css'

export default function AdminPanelLogin(): JSX.Element {
    const navigation = useHistory();

    const [Username, SetUsername] = useState("");
    const [Password, SetPassword] = useState("");

    useEffect(() => {
        const login = localStorage.getItem("LoginInfo");
        if (login) {
            const ParsedData = JSON.parse(login);
            console.log(ParsedData);
            navigation.push("adminpanel");
        }
    }, [])

    function LoginHandler() {
        if (Username.trim() == "" || Password.trim() == "") return;
        console.log(Username, Password);
        api({
            method: "GET",
            url: "AdminLogin",
            headers: {
                username: Username,
                password: Password
            }
        }).then(response => {
            console.log(response);
            if (response.data.login) {
                localStorage.setItem("LoginInfo", JSON.stringify({
                    LoginStatus: true,
                    username: Username,
                    password: Password
                }));
                navigation.push("adminpanel");
            }
        })
    }

    return (
        <div className="admin-login-container">
            <div className="admin-form-login">

                <h1>Admin Login</h1>

                <div className="input-style" style={{ display: "grid" }}>
                    <span>Usuário</span>
                    <input type="text" value={Username} onChange={e => SetUsername(e.target.value)} />
                </div>

                <div className="input-style" style={{ display: "grid" }}>
                    <span>Senha</span>
                    <input type="password" value={Password} onChange={e => SetPassword(e.target.value)} />
                </div>

                <button onClick={LoginHandler}>Login</button>

            </div>
        </div>
    )
}