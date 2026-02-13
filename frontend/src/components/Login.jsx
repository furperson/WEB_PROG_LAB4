import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error } = useSelector(state => state.auth);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ username, password }))
            .unwrap()
            .then(() => navigate('/main'));



    };

    const handleRegister = async () => {
        try {
            await axios.post('/api/auth/register', { username, password });
            alert("Зареган. входи!");
        } catch (err) {
            alert("оооооошибка регистрации: " + (err.response?.data || "User exists"));
        }
    };

    return (
        <div>
            <div className="header">
            <h2>Сыщиков Никита Сергеевич, P3231 , Вариант 4409 , WEBLAB4</h2>
            </div>
            <form onSubmit={handleLogin}>
                <div style={{marginBottom: 10}}>
                    <input
                        type="text" placeholder="Login"
                        value={username} onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div style={{marginBottom: 10}}>
                    <input
                        type="password" placeholder="Password"
                        value={password} onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Войти</button>
                <button type="button" onClick={handleRegister} style={{marginLeft: 10}}>Регистрация</button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
};

export default Login;